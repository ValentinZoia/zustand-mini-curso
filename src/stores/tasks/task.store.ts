import { create,StateCreator } from "zustand";
import {v4 as uuid} from 'uuid'
import { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";

interface TaskState {

    draggingTaskId?: string;

    tasks: Record<string, Task>;

    getTaskByStatus: (status: TaskStatus) => Task[];

    getAllTasks: () => Task[];

    addTask: (title: string, status: TaskStatus) => void;

    setDraggingTaskId: (taskId:string) => void;

    removeDraggingTaskId: () => void;
    
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;

    onTaskDrop: (status: TaskStatus) => void;
    
}


const storeApi: StateCreator<TaskState,[["zustand/devtools", never]]>= (set,get) => ({
    draggingTaskId: undefined,
    tasks: {
        'ABC-1': {
            id: 'ABC-1',
            title: 'Tarea 1',
            status: 'pending',
        },
        'ABC-2': {
            id: 'ABC-2',
            title: 'Tarea 2',
            status: 'in-progress',
        },
        'ABC-3': {
            id: 'ABC-3',
            title: 'Tarea 3',
            status: 'pending',
        },
    },

    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        
        return Object.values(tasks).filter(task => task.status === status);
        
    },
    getAllTasks: () => Object.values(get().tasks),

    addTask: (title: string, status: TaskStatus) => {
        const newTask = {id:uuid(), title, status}
        
        set((state)=>({
            tasks: {
                ...state.tasks,
                [newTask.id]: newTask
            }
            }))
    },

    setDraggingTaskId: (taskId: string) =>{
        set({draggingTaskId: taskId})
    },

    removeDraggingTaskId:()=>{
        set({draggingTaskId: undefined})
    },

    changeTaskStatus:(taskId: string, status: TaskStatus)=>{
        const task = get().tasks[taskId];
        task.status = status;

        set((state)=>({
            tasks: {
                ...state.tasks,
                [taskId]: task
            }
        }))

    },

    onTaskDrop:(status: TaskStatus)=>{
        const taskId = get().draggingTaskId;

        if(!taskId) return;

        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    },



});

export const useTaskStore = create<TaskState>()(
    devtools(persist(storeApi,{
        name:"task-storage",
    }))
    
)
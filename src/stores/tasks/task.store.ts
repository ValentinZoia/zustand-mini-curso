import { create,StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskState {

    draggingTaskId?: string;

    tasks: Record<string, Task>,

    getTaskByStatus: (status: TaskStatus) => Task[],

    getAllTasks: () => Task[],

    setDraggingTaskId: (taskId:string) => void,

    removeDraggingTaskId: () => void
    
    
}


const storeApi: StateCreator<TaskState>= (set,get) => ({
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

    setDraggingTaskId: (taskId: string) =>{
        set({draggingTaskId: taskId})
    },

    removeDraggingTaskId:()=>{
        set({draggingTaskId: undefined})
    }

});

export const useTaskStore = create<TaskState>()(
    devtools(storeApi)
    
)


import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {
   const Tasks = useTaskStore(state => state.getTaskByStatus);
   const tasks = useTaskStore(state => state.tasks);

   const TasksPending = Tasks('pending');
   const TasksInProgress = Tasks('in-progress');
   const TasksDone = Tasks('done');
  
  
  

 
  
  


 
  
  
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />
      
     

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='pending' status='pending' tasks={TasksPending} />
          
          <JiraTasks title='in-progress' status='in-progress' tasks={TasksInProgress} />
          
          <JiraTasks title='done' status='done'  tasks={TasksDone}/>

      </div>

      



    </>
  );
};
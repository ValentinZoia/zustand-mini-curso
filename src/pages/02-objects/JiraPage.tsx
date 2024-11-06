

import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {
   const Tasks = useTaskStore(state => state.getTaskByStatus);
  
 
 
  
  


 
  
  
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />
      
     

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' value='pending' tasks={Tasks('pending')} />
          
          <JiraTasks title='Avanzando' value='in-progress' tasks={Tasks('in-progress')} />
          
          <JiraTasks title='Terminadas' value='done'  tasks={Tasks('done')}/>

      </div>

      



    </>
  );
};
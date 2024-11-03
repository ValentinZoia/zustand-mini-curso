import { createJSONStorage, StateStorage } from "zustand/middleware";

  //Custom Storage guardar en Session Storage
  const storageAPI: StateStorage={
    getItem: function (name: string): string | null | Promise<string | null> {
        
        const data = sessionStorage.getItem(name);
       

        return data
    },
    setItem: function (name: string, value: string): void  {
        sessionStorage.setItem(name, value);

        
    },
    removeItem: function (name: string): void  {
        sessionStorage.removeItem(name);
        
    }
}

export const customSessionStorage = createJSONStorage(()=>storageAPI)
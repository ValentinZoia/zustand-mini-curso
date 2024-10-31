import { create, StateCreator } from "zustand";
import { persist, } from "zustand/middleware";
import { customSessionStorage } from "../storages/session-storage.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

//StateCreator Interface
const storeAPI: StateCreator<PersonState & Actions> =(set) => ({
    firstName: "",
    lastName: "",

    setFirstName: (value: string) => set({ firstName: value }),
    setLastName: (value: string) => set({ lastName: value }),
  });




export const usePersonStore = create<PersonState & Actions>()(
  persist(
    storeAPI,
    { name: "person-storage",
    //custom Storage
     storage:customSessionStorage,   
     }
  )
);

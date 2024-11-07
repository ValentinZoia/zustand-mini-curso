import React, { useState } from "react";
import { useTaskStore } from "../stores";
import Swal from "sweetalert2";
import { TaskStatus } from "../interfaces";

export const useTasks = ({ status }: { status: TaskStatus }) => {
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState<boolean>(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva Tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,

      customClass: {
        confirmButton: "bg-blue-500 hover:bg-blue-600",
        cancelButton: "bg-slate-400 hover:bg-slate-500",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Ingrese el nombre de la tarea";
        }
      },
    });

    

    if (!isConfirmed) return;

    const newTitle = value as string;

    addTask(newTitle, status);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setOnDragOver(false);

    onTaskDrop(status);
  };

  return {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask,
    isDragging,
    onDragOver,
  };
};

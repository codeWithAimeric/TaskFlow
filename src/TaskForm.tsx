import React, { useTransition } from 'react';
import { Task } from "./types";
import useTaskStore from './store';

export const TaskForm = () => {
    const addTask = useTaskStore((state) => state.addTask);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = e.target[0].value;
        if (!text.trim()) return;

        startTransition(() => {
            const newTask: Task = {
                id: new Date().toISOString(),
                text,
                completed: false
            };
            addTask(newTask);
            e.target.reset();
        });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Ajouter une tâche..."
                        className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isPending}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isPending}
                    >
                        {isPending ? 'Ajout en cours...' : 'Ajouter'}
                    </button>
                </div>
            </form>
        </div>
    );
}
import React, { useEffect, useState, useTransition } from 'react';
import { Task, TaskFormProps } from "../types/types";
import useTaskStore from '../store/taskStore';
import useNotificationStore from '../store/notificationStore';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const TaskForm: React.FC<TaskFormProps> = ({ editingTaskId, initialText, initialPriority, onUpdateComplete }) => {
    const addTask = useTaskStore((state) => state.addTask);
    const [isPending, startTransition] = useTransition();
    const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const addNotification = useNotificationStore((state) => state.addNotification);
    const updateTask = useTaskStore((state) => state.updateTask);
    const [text, setText] = useState(initialText);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const text = e.target[0].value;
        if (!text.trim()) {
            addNotification('Le texte ne peut pas être vide', 'error');
            return;
        }

        startTransition(() => {
            if (editingTaskId) {
                updateTask(editingTaskId, text);
                onUpdateComplete();
                addNotification('Tâche mise à jour', 'success');
                return;
            } else {
                const newTask: Task = {
                    id: new Date().toISOString(),
                    text,
                    isFavorite: false,
                    completed: false,
                    priority
                };
                addTask(newTask);
                addNotification('Tâche ajoutée avec succès', 'success');
            }
            setText('');
            setPriority('medium');
            e.target.reset();
        });
    }

    useEffect(() => {
        setText(initialText);
        setPriority(initialPriority);
    }, [initialText, initialPriority]);

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <div className="mb-4">
                    <Input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ajouter une tâche..."
                        className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isPending}
                    />
                </div>
                <div className="mb-4">
                    <Select value={priority} onValueChange={(value) => setPriority(value as 'high' | 'medium' | 'low')}>
                        <SelectTrigger className="w-full border border-gray-300 p-2 rounded-md">
                            <SelectValue placeholder="Priorité" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="high">Haute Priorité</SelectItem>
                            <SelectItem value="medium">Priorité Moyenne</SelectItem>
                            <SelectItem value="low">Basse Priorité</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-between">
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isPending}
                    >
                        {isPending ? 'Ajout en cours...' : (editingTaskId ? 'Mettre à jour' : 'Ajouter')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
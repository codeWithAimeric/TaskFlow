import { useState } from "react";
import useTaskStore from "../store/taskStore";
import useNotificationStore from "../store/notificationStore";
import { TaskForm } from "./TaskForm";
import { Button } from "./ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export const TaskList = () => {
    const tasks = useTaskStore(state => state.tasks);
    const toggleTask = useTaskStore(state => state.toggleTask);
    const removeTask = useTaskStore((state) => state.removeTask);
    const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
    const addNotification = useNotificationStore((state) => state.addNotification);
    const toggleFavorite = useTaskStore((state) => state.toggleFavorite);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTaskText, setEditingTaskText] = useState<string>('');
    const [editingTaskPiority, setEditingTaskPiority] = useState<'high' | 'medium' | 'low'>('medium');

    const sortedTasks = tasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const filteredTasks = sortedTasks.filter(task => filter === 'all' || task.priority === filter);

    const handleToggle = (id: string) => {
        toggleTask(id);
        addNotification('Tâche mise à jour', 'success');
    };

    const handleRemove = (id: string) => {
        removeTask(id);
        addNotification('Tâche supprimée', 'success');
    };

    const handleFavorite = (id: string) => {
        toggleFavorite(id);
        addNotification('Tâche ajoutée aux favoris', 'success');
    };

    const handleUpdate = (id: string, text: string, priority: 'high' | 'medium' | 'low') => {
        setEditingTaskId(id);
        setEditingTaskText(text);
        setEditingTaskPiority(priority);
    }

    const handleUpdateComplete = () => {
        setEditingTaskId(null);
        setEditingTaskText('');
        setEditingTaskPiority('medium');
    }

    const favoriteTasks = showFavorites ? filteredTasks.filter(task => task.isFavorite) : filteredTasks;

    return (
        <div>
            <TaskForm
                editingTaskId={editingTaskId}
                initialText={editingTaskText}
                initialPriority={editingTaskPiority}
                onUpdateComplete={handleUpdateComplete}
            />
            {/* Filtre par priorité */}
            <div className="mb-4">
                <div className="flex flex-col justify-center items-center space-y-4">

                    <label className="text-center">Filtrer par priorité :</label>
                    <Select value={filter} onValueChange={(value) => setFilter(value as 'all' | 'high' | 'medium' | 'low')}>
                        <SelectTrigger className="w-[180px] ml-2 border border-gray-300 p-2 rounded-md center">
                            <SelectValue placeholder="Filtrer par priorité" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Toutes</SelectItem>
                            <SelectItem value="high">Haute Priorité</SelectItem>
                            <SelectItem value="medium">Priorité Moyenne</SelectItem>
                            <SelectItem value="low">Basse Priorité</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={() => setShowFavorites(!showFavorites)}
                        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        {showFavorites ? "Voir toutes les tâches" : "Voir les favoris"}
                    </Button>
                </div>
            </div>

            {/* Affichage des tâches triées et filtrées */}
            <div className="space-y-4">
                {favoriteTasks.length === 0 ? (
                    <p className="text-center text-gray-500">Aucune tâche pour cette priorité</p>
                ) : (
                    favoriteTasks.map(task => (
                        <div
                            key={task.id}
                            className={`p-4 flex justify-between items-center rounded-md shadow-md ${task.priority === 'high' ? 'bg-red-100' :
                                task.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                                }`}
                        >
                            <span
                                onClick={() => handleToggle(task.id)}
                                className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                            >
                                {task.text}
                            </span>
                            <Button
                                onClick={() => handleFavorite(task.id)}
                                className={`ml-4 ${task.isFavorite ? 'text-yellow-500' : 'text-gray-400'
                                    }`}
                                title={task.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                            >
                                ★
                            </Button>
                            <Button
                                onClick={() => handleRemove(task.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            >
                                Supprimer
                            </Button>
                            <Button
                                onClick={() => handleUpdate(task.id, task.text, task.priority)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                            >
                                Modifier
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

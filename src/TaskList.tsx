import { useState } from "react";
import useTaskStore from "./store";


export const TaskList = () => {
    const tasks = useTaskStore(state => state.tasks);
    const toggleTask = useTaskStore(state => state.toggleTask);
    const removeTask = useTaskStore((state) => state.removeTask);
    const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

    const sortedTasks = tasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const filteredTasks = sortedTasks.filter(task => filter === 'all' || task.priority === filter);

    const handleToggle = (id: string) => {
        toggleTask(id);
    };

    const handleRemove = (id: string) => {
        removeTask(id);
    };

    return (
        <div>
            {/* Filtre par priorité */}
            <div className="mb-4">
                <label>Filtrer par priorité :</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'high' | 'medium' | 'low')}
                    className="ml-2 border border-gray-300 p-2 rounded-md"
                >
                    <option value="all">Toutes</option>
                    <option value="high">Haute Priorité</option>
                    <option value="medium">Priorité Moyenne</option>
                    <option value="low">Basse Priorité</option>
                </select>
            </div>

            {/* Affichage des tâches triées et filtrées */}
            <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-500">Aucune tâche pour cette priorité</p>
                ) : (
                    filteredTasks.map(task => (
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
                            <button
                                onClick={() => handleRemove(task.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

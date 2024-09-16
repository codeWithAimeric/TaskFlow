import useTaskStore from "./store";


export const TaskList = () => {
    const tasks = useTaskStore(state => state.tasks); 
    const toggleTask = useTaskStore(state => state.toggleTask);
    const removeTask = useTaskStore((state) => state.removeTask);

    const handleToggle = (id: string) => {
        toggleTask(id); 
    };

    const handleRemove = (id: string) => {
        removeTask(id);
    };

    return (
        <div className="space-y-4">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">Aucune tâche pour le moment</p>
            ) : (
                tasks.map(task => (
                    <div
                        key={task.id}
                        className={`p-4 flex justify-between items-center rounded-md shadow-md ${task.completed ? 'bg-green-100' : 'bg-white'
                            }`}
                    >
                        <span
                            onClick={() => handleToggle(task.id)}
                            className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                                }`}
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
    );
};

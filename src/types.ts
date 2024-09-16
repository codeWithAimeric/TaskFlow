export interface Task {
    id: string,
    text: string,
    completed: boolean
}

export interface TaskStore {
    tasks: Task[],
    addTask: (task: Task) => void;
    removeTask: (id: string) => void;
    toggleTask: (id: string) => void;
}
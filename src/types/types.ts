export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  isFavorite: boolean;
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface NotificationStore {
  notifications: Notification[];
  addNotification: (
    message: string,
    type: "success" | "error" | "info"
  ) => void;
  removeNotification: (id: string) => void;
}

export interface TaskFormProps {
  editingTaskId: string | null;
  initialText: string; 
  initialPriority: 'high' | 'medium' | 'low';
  onUpdateComplete: () => void; 
}
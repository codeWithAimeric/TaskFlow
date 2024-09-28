import { create } from "zustand";

const useNotificationStore = create((set) => ({
    notifications: [],
    addNotification: (message: string, type: string) => {
        const id = Date.now().toString();
        set((state) => ({
            notifications: [...state.notifications, { id, message, type }],
        }));

        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id),
            }));
        }, 5000);
    },
    removeNotification: (id: string) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
}));

export default useNotificationStore;
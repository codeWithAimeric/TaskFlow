import { useTransition, animated } from "react-spring";
import useNotificationStore from "../store/notificationStore"


export const Notifications = () => {
    const notifications = useNotificationStore((state) => state.notifications);
    const removeNotification = useNotificationStore((state) => state.removeNotification);

    const transitions = useTransition(notifications, {
        from: { opacity: 0, transform: 'translateX(100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(100%)' },
    });

    return (
        <div className="fixed top-5 right-5 space-y-2">
            {transitions((style, item) => (
                <animated.div style={style} className={`p-3 rounded-md shadow-md ${getClassByType(item.type)}`}>
                    <div className="flex justify-between items-center">
                        <span>{item.message}</span>
                        <button
                            onClick={() => removeNotification(item.id)}
                            className="ml-4 text-red-500"
                        >
                            &times;
                        </button>
                    </div>
                </animated.div>
            ))}
        </div>
    );
}

const getClassByType = (type: 'success' | 'error' | 'info') => {
    switch (type) {
        case 'success':
            return 'bg-green-100 text-green-800';
        case 'error':
            return 'bg-red-100 text-red-800';
        case 'info':
            return 'bg-blue-100 text-blue-800';
        default:
            return '';
    }
};
import './styles/App.css'
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import useTaskStore from './store/taskStore';
import { Notifications } from './components/Notification';


const App = () => {
  const tasks = useTaskStore(state => state.tasks);
  return (
    <div className="text-center text-blue-500">
      <Notifications />
      <h1 className="text-3xl font-bold underline">
        Task manager
      </h1>
      <TaskForm />
      <TaskList tasks={tasks} />
    </div>
  )
}

export default App

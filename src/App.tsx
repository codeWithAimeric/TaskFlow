import './styles/App.css'
import { TaskList } from './components/TaskList';
import useTaskStore from './store/taskStore';
import { Notifications } from './components/Notification';
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { UserForm } from './components/UserForm';
import useUserStore from './store/userStore';


const App = () => {
  // const tasks = useTaskStore(state => state.tasks);
  // return (
  //   <div className="text-center text-blue-500">
  //     <Notifications />
  //     <h1 className="text-3xl font-bold underline">
  //       Task manager
  //     </h1>
  //     <TaskList tasks={tasks} />
  //   </div>
  // )
  const tasks = useTaskStore(state => state.tasks);
  const [session, setSession] = useState(null);
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    // const fetchCurrentUser = async () => {
    //   const user = await fetchUser();
    //   setUser(user);
    // };
    // fetchCurrentUser(); 
    // ---------------Don't work yet--------------------

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      <UserForm />
    )
  }
  else {
    return (
      <div className="text-center text-blue-500">
        <Notifications />
        <h1 className="text-3xl font-bold underline">
          Task manager
        </h1>
        <TaskList tasks={tasks} />
      </div>
    )
  }
}

export default App

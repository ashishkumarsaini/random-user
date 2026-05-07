import { useEffect, useState } from 'react'
import { getUsers } from './services/users'
import { UserProfile } from './components/user-profile';
import { UserCardsContainer } from './components/user-cards-container';
import { Header } from './components/header';

function App() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await getUsers();

      if (response?.data?.data) {
        setUsers(response.data.data);

        setSelectedUserId(response.data.data[0]?.id)
      } else {
        setUsers(null);
      }

      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return <div className='flex min-h-screen items-center justify-center'>
      <h1>Loading...</h1>
    </div>
  }

  if (!users || users?.length === 0) {
    return <div className='flex min-h-screen items-center justify-center'>
      <h1>No users found!</h1>
    </div>
  }

  const selectedUser = users.find((user) => user.id === selectedUserId)


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header />
        <UserProfile selectedUser={selectedUser} />
        <UserCardsContainer users={users} selectedUser={selectedUser} setSelectedUserId={setSelectedUserId} />
      </div>
    </main>
  )
}

export default App

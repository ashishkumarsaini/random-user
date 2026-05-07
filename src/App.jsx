import { useEffect, useState } from 'react'
import { formatDate } from './utils/date'
import { getUsers } from './services/users'


const fullName = (user) =>
  `${user.name.title} ${user.name.first} ${user.name.last}`

function InfoItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-medium text-slate-800 sm:text-base">
        {value}
      </dd>
    </div>
  )
}

function UserCard({ user, isActive, onClick }) {
  const activeClasses = isActive
    ? 'border-teal-500 ring-4 ring-teal-100'
    : 'border-slate-200'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`col-span-4 group flex min-h-32 w-full items-center gap-4 rounded-lg border cursor-pointer bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md ${activeClasses}`}
    >
      <img
        src={user.picture.medium}
        alt={fullName(user)}
        className="size-16 shrink-0 rounded-full border-4 border-slate-100 object-cover"
      />
      <span className="min-w-0">
        <span className="block truncate text-base font-semibold text-slate-950">
          {fullName(user)}
        </span>
        <span className="mt-1 block truncate text-sm text-slate-500">
          @{user.login.username}
        </span>
        <span className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {user.nat} / {user.gender}
        </span>
      </span>
    </button>
  )
}

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
        <header className="rounded-lg border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
                Random user profiles
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-500">
                Browse clean profile cards built from the paginated API response
                shape.
              </p>
            </div>
          </div>
        </header>

        <section className="">
          <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
              <div className="bg-teal-700 p-6 text-white">
                <img
                  src={selectedUser.picture?.large}
                  alt={fullName(selectedUser)}
                  className="mx-auto size-40 rounded-full border-8 border-white/20 object-cover shadow-xl lg:mx-0"
                />
                <div className="mt-6 text-center lg:text-left">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-100">
                    Featured profile
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-normal">
                    {fullName(selectedUser)}
                  </h2>
                  <p className="mt-2 text-teal-50">
                    @{selectedUser.login.username}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                    {selectedUser.nat}
                  </span>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold capitalize text-indigo-700">
                    {selectedUser.gender}
                  </span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                    {selectedUser.dob.age} years old
                  </span>
                </div>

                <dl className="mt-7 grid gap-5 sm:grid-cols-2">
                  <InfoItem label="Email" value={selectedUser.email} />
                  <InfoItem label="Phone" value={selectedUser.phone} />
                  <InfoItem label="Cell" value={selectedUser.cell} />
                  <InfoItem
                    label="Birthday"
                    value={formatDate(selectedUser.dob.date)}
                  />
                  <InfoItem
                    label="Registered"
                    value={formatDate(selectedUser.registered.date)}
                  />
                  <InfoItem
                    label="Timezone"
                    value={`${selectedUser.location.timezone.offset} ${selectedUser.location.timezone.description}`}
                  />
                </dl>

                <div className="mt-7 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    Location
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-900">
                    {selectedUser.location.street.number}{' '}
                    {selectedUser.location.street.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedUser.location.city}, {selectedUser.location.state},{' '}
                    {selectedUser.location.country} -{' '}
                    {selectedUser.location.postcode}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <section className="mt-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Page profiles
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select any person to preview.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                {users.length}
              </span>
            </div>

            <div className="mt-4 grid gap-3 grid-cols-12">
              {users.filter((user) => user.id !== selectedUser.id).map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isActive={user.id === selectedUser.id}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                />
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

export default App

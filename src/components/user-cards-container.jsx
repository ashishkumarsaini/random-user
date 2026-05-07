import { UserCard } from "./user-card";

export const UserCardsContainer = ({ users, selectedUser, setSelectedUserId }) => {
  return (
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
          <div key={user.id} className="col-span-12 md:col-span-6 lg:col-span-4">
            <UserCard
              user={user}
              isActive={user.id === selectedUser.id}
              onClick={() => {
                setSelectedUserId(user.id);
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
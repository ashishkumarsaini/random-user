import { formatFullName } from "../utils/user"

export const UserCard = ({ user, isActive, onClick }) => {
  const activeClasses = isActive
    ? 'border-teal-500 ring-4 ring-teal-100'
    : 'border-slate-200'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-32 w-full items-center gap-4 rounded-lg border cursor-pointer bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md ${activeClasses}`}
    >
      <img
        src={user.picture.medium}
        alt={formatFullName(user)}
        className="size-16 shrink-0 rounded-full border-4 border-slate-100 object-cover"
      />
      <span className="min-w-0">
        <span className="block truncate text-base font-semibold text-slate-950">
          {formatFullName(user)}
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
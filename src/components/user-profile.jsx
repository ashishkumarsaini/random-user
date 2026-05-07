import { formatFullName } from "../utils/user";
import { formatDate } from "../utils/date";

function InfoItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 wrap-break-word text-sm font-medium text-slate-800 sm:text-base">
        {value}
      </dd>
    </div>
  )
}


export const UserProfile = ({ selectedUser }) => {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="bg-teal-700 p-6 text-white">
          <img
            src={selectedUser.picture?.large}
            alt={formatFullName(selectedUser)}
            className="mx-auto size-40 rounded-full border-8 border-white/20 object-cover shadow-xl lg:mx-0"
          />
          <div className="mt-6 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-100">
              Featured profile
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal">
              {formatFullName(selectedUser)}
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
  )
}
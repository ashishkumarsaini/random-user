export const Header = () => {
  return (
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
  )
}
interface PaginationParams {
  onNextPage: () => {}
  onPreviousPage: () => {}
  hasNextPage: boolean
  hasPreviousPage: boolean
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Pagination(params: PaginationParams) {

  return (
    <div className="flex flex-1 items-center justify-center">
      <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
        <Navigator isPrevious={true} disabled={!params.hasPreviousPage} onClick={params.onPreviousPage} />
        <div className="w-5"></div>
        <Navigator isPrevious={false} disabled={!params.hasNextPage} onClick={params.onNextPage} />
      </nav>
    </div>
  )
}

interface NavigatorParams {
  disabled: boolean
  onClick: () => {}
  isPrevious: boolean
}

function Navigator(params: NavigatorParams) {
  return (
    <a
      href={params.disabled ? '' : '#'}
      onClick={(e) => {
        e.preventDefault()

        if (params.disabled) {
          return
        }

        params.onClick()
      }}
      className={classNames(
        "relative inline-flex items-center rounded-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0",
        params.disabled ? 'cursor-not-allowed' : 'hover:bg-gray-50 '
      )}
    >
      {params.isPrevious ?
        (<p>Previous</p>)
        :
        (<p>Next</p>)
      }
    </a>
  )
}
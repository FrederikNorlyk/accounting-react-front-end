interface SubmitButtonParams {
    title: string
}

export default function SubmitButton(params: SubmitButtonParams) {
    return (
        <button
            type="submit"
            className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
            {params.title}
        </button>
    )
}
export class MultiRecordResult<T extends DatabaseRecord> {

    private previousPage = false
    private nextPage = false
    private currentPage = 1
    private records: T[] = []
    private httpStatus: number
    private error: string | null = null

    private constructor(httpStatus: number) {
        this.httpStatus = httpStatus
    }

    public static asErrorResult<T extends DatabaseRecord>(httpStatus: number, error: string): MultiRecordResult<T> {
        const result = new MultiRecordResult<T>(httpStatus)
        result.error = error
        return result
    }

    public static asSuccessResult<T extends DatabaseRecord>(httpStatus: number, records: T[], currentPage: number, hasPreviousPage: boolean, hasNextPage: boolean) {
        const result = new MultiRecordResult<T>(httpStatus)
        result.records = records
        result.currentPage = currentPage
        result.previousPage = hasPreviousPage
        result.nextPage = hasNextPage
        return result
    }

    public getRecords() {
        return this.records
    }

    public getHttpStatus() {
        return this.httpStatus
    }

    public getError() {
        return this.error
    }

    public getCurrentPage() {
        return this.currentPage
    }

    public hasPreviousPage() {
        return this.previousPage
    }

    public hasNextPage() {
        return this.nextPage
    }
}
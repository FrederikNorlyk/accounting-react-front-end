export class SingleRecordResult<T extends DatabaseRecord> {

    private record: T | null = null
    private httpStatus: number
    private error: string | null = null

    private constructor(httpStatus: number) {
        this.httpStatus = httpStatus
    }

    public static asErrorResult<T extends DatabaseRecord>(httpStatus: number, error: string): SingleRecordResult<T> {
        const result = new SingleRecordResult<T>(httpStatus)
        result.error = error
        return result
    }

    public static asSuccessResult<T extends DatabaseRecord>(httpStatus: number, record: T) {
        const result = new SingleRecordResult<T>(httpStatus)
        result.record = record
        return result
    }

    public getRecord() {
        return this.record
    }

    public getHttpStatus() {
        return this.httpStatus
    }

    public getError() {
        return this.error
    }
}
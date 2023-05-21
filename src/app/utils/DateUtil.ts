export default class DateUtil {
    public static dateToInputFormat(date: Date): string {
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset * 60 * 1000))
        return date.toISOString().split('T')[0]
    }
}
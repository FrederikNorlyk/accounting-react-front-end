/**
 * Factory for building database records.
 */
abstract class DatabaseRecordFactory<T extends DatabaseRecord> {

    /**
     * Returns an empty database record.
     * 
     * @returns empty record
     */
    protected emptyRecord() : T {
        return {
            id: 0
        } as T
    }
}
import DatabaseRecordFactory from "./DatabaseRecordFactory";

/**
 * Factory for creating {@link Merchant} records.
 */
export default class MerchantFactory extends DatabaseRecordFactory<Merchant> {
    
    /**
     * Builds and empty project.
     * 
     * @returns empty project
     */
    public buildEmptyMerchant(): Merchant {
        var record = this.emptyRecord();

        record.name = ""

        return record
    }
}
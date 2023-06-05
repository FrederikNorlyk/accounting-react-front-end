import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

export default class ProjectClient extends DatabaseRecordClient<Project> {
    
    parse(record: any): Project {
        record.totalAmount = record.total_amount ?? 0
        delete record.total_amount

        record.fromDate = record.from_date ? new Date(record.from_date) : null
        delete record.from_date

        record.toDate = record.to_date ? new Date(record.to_date) : null
        delete record.to_date
        
        return record
    }

    getEndpoint(): string {
        return "projects/"
    }
}
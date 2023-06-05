import DatabaseRecordClient from "@/clients/DatabaseRecordClient";

export default class ProjectClient extends DatabaseRecordClient<Project> {
    
    parse(record: any): Project {
        record.totalAmount = record.total_amount ?? 0
        delete record.total_amount
        
        return record
    }

    getEndpoint(): string {
        return "projects/"
    }
}
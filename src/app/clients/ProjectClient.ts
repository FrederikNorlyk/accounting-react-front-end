import APIClient from "@/clients/APIClient";

export default class ProjectClient extends APIClient<Project> {
    
    convertTypes(record: Project): Project {
        return record
    }

    getEndpoint(): string {
        return "projects/"
    }
}
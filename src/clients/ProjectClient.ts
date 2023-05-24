import APIClient from "@/clients/APIClient";

export default class ProjectClient extends APIClient<Project> {
    
    parse(record: any): Project {
        return record as Project
    }

    getEndpoint(): string {
        return "projects/"
    }
}
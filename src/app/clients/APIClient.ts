import { getSession } from "next-auth/react";

/**
 * Abstract base class for all clients that communicate with the backend API.
 */
export default abstract class APIClient<T extends DatabaseRecord> {

    private domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

    /**
     * Defines the endpoint used when querying the API.
     */
    abstract getEndpoint(): string

    /**
     * Converts the types of the given record's fields to their specifications.
     * 
     * @param record 
     */
    abstract convertTypes(record: T): T;

    /**
     * Gets the user's access token.
     * 
     * @returns the user's access token
     */
    protected async getAccessToken(): Promise<string> {
        const session = await getSession()

        if (!session) {
            console.error("Could not get session")
            return ""
        }

        return session.user.token
    }

    /**
     * Fetches a list of records.
     * 
     * @returns a list of records
     */
    public async fetch(): Promise<T[]> {
        const token = await this.getAccessToken()

        const url = this.domain + this.getEndpoint()

        const response = await fetch(url, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })

        if (!response.ok) {
            console.error("Response not OK")
            return []
        }

        const data = await response.json()

        if (!data) {
            console.error("Data was NULL")
            return []
        }

        if (data.detail) {
            console.error("data.detail: " + data.detail);
            return []
        }

        if (!data.results) {
            console.error("No results");
            return []
        }

        var records = [] as T[];
        for (let index = 0; index < data.results.length; index++) {
            const record = data.results[index];
            records.push(this.convertTypes(record))
        }
        return records
    }

    /**
     * Gets a single record.
     * 
     * @param id id of the record to get
     * @returns the record or NULL
     */
    public async get(id: number): Promise<T | null> {
        const token = await this.getAccessToken()

        const url = this.domain + this.getEndpoint() + id + "/"

        const response = await fetch(url, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })

        if (!response.ok) {
            console.error("Response not OK")
            return null
        }

        const data = await response.json()

        if (!data) {
            console.error("Data was NULL")
            return null
        }

        return this.convertTypes(data)
    }

    /**
     * Adds a record using HTTP POST.
     * 
     * @param record the record to add
     * @returns the created record
     */
    public async post(record: T): Promise<T | null> {
        return this.submit(record, "POST");
    }

    /**
    * Updates a record using HTTP PUT.
    * 
    * @param record the record to update
    * @returns the updated record
    */
    public async put(record: T): Promise<T | null> {
        return this.submit(record, "POST");
    }

    private async submit(record: T, method: string): Promise<T | null> {
        const token = await this.getAccessToken()

        const url = this.domain + this.getEndpoint()

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(record)
        })

        if (!response.ok) {
            console.error("Response not OK")
            return null
        }

        const data = await response.json()

        if (!data) {
            console.error("Data was NULL")
            return null
        }

        return data
    }
}
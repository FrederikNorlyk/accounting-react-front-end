import { getSession } from "next-auth/react";

/**
 * Abstract base class for all clients that communicate with the backend API.
 */
export default abstract class APIClient<T> {

    private domain = "http://localhost:8000/"

    /**
     * Defines the endpoint used when querying the API.
     */
    abstract getEndpoint(): string

    /**
     * Gets the user's access token.
     * 
     * @returns the user's access token
     */
    protected async getAccessToken() : Promise<string> {
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
    public async fetch() : Promise<T[]> {
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

        return data.results
    }

    /**
     * Gets a single record.
     * 
     * @param id id of the record to get
     * @returns the record
     */
    public async get(id: number) : Promise<T|null> {
        const token = await this.getAccessToken()

        const url = this.domain + this.getEndpoint() + id

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

        return data
    }
}
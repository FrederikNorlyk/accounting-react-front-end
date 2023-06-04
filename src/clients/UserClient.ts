
/**
 * Client for registering new users.
 */
export class UserClient {
    
    private domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

    /**
     * Register a new user.
     * 
     * @param username a unique username
     * @param password plain text password
     * @returns the response
     */
    public async register(username: String, password: String): Promise<Response> {
        const url = this.domain + "users/"

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        
        return response
    }
}
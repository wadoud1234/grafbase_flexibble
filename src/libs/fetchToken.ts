import { serverUrl } from "./graphql/init";

export default async function fetchToken() {
    try {

        const response = await fetch(`${serverUrl}/api/auth/token`)

        return response.json()

    } catch (error) {
        throw error;
    }
}
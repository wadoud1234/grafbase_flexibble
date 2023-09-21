import { serverUrl } from "./graphql/init";

export default async function UploadImage(imagePath: string) {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ path: imagePath }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.json()
    } catch (error) {
        throw error;
    }
}


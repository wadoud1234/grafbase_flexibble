import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

export const apiUrl =
    isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL as string : "http://localhost:4000/graphql";

export const apiKey =
    isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY as string : "letmein"

export const serverUrl =
    isProduction ? process.env.NEXT_PUBLIC_SERVER_URL as string : "http://localhost:3000"

export const client = new GraphQLClient(apiUrl);

export default async function makeGraphqlRequest(query: string, variables = {}) {

    try {
        const response = await client.request(query, variables)
        return response;
    } catch (error) {
        console.error(error);
    }
}


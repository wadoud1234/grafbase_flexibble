import makeGraphqlRequest, { apiKey, client } from "../init"

export const getUserQuery = `
    query GetUser($email:String!){
        user(by:{email:$email}){
            id
            name
            email
            avatarUrl
            description
            githubUrl
            linkedinUrl
        }
    }

`

export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey)
    const variables = { email }
    return makeGraphqlRequest(getUserQuery, variables)
}

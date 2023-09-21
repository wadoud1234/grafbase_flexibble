import makeGraphqlRequest, { apiKey, client } from "../init"

const createUserMutation = `
    mutation CreateUser($input:UserCreateInput!){
        userCreate(input:$input){
            user{
                id
                name
                email
                avatarUrl
                description
                githubUrl
                linkedinUrl
            }
        }
    }
`

export const createUser = ({
    name, email, avatarUrl
}: {
    name: string, email: string, avatarUrl: string
}) => {
    client.setHeader("x-api-key", apiKey)
    const variables = {
        input: {
            name, email, avatarUrl
        }
    }

    return makeGraphqlRequest(createUserMutation, variables)
}
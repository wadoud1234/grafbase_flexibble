import makeGraphqlRequest, { apiKey, client } from "../init";

const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

const GetProjectDetails = async (id: string) => {
    client.setHeader("x-api-key", apiKey)
    const variables = { id }
    return makeGraphqlRequest(getProjectByIdQuery, variables)
}

export default GetProjectDetails;
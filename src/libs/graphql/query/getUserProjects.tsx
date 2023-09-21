import makeGraphqlRequest from "../init";

const GetUserProjectsQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;

const GetUserProjects = async (id: string, last?: number) => {
  return makeGraphqlRequest(GetUserProjectsQuery, { id, last })
}
export default GetUserProjects;
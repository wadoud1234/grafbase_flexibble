import makeGraphqlRequest, { apiKey, client } from "../init";

const DeleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

const DeleteProject = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`)

  return makeGraphqlRequest(DeleteProjectMutation, { id })
}

export default DeleteProject;
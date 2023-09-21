import { ProjectForm } from "@/common.types";
import makeGraphqlRequest, { client } from "../init";
import UploadImage from "@/libs/uploadImage";

const UpdateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

const EditProject = async (form: ProjectForm, projectId: string, token: string) => {
    function isBase64DataUrl(value: string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    }

    let updatedForm = { ...form }
    const isUploadingNewImage = isBase64DataUrl(form.image)

    if (isUploadingNewImage) {
        const imageUrl = await UploadImage(form.image)

        if (imageUrl && imageUrl.url) {
            updatedForm = {
                ...form, image: imageUrl.url
            }
        }
    }

    client.setHeader("Authorization", `Bearer ${token}`)

    const variables = {
        id: projectId,
        input: { ...updatedForm }
    }

    return makeGraphqlRequest(UpdateProjectMutation, variables)
}

export default EditProject;
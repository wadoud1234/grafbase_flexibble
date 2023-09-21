import { ProjectForm } from "@/common.types";
import makeGraphqlRequest, { client } from "../init";
import UploadImage from "@/libs/uploadImage";

const CreateProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
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

const CreateNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await UploadImage(form.image);

    if (imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`);

        const variables = {
            input: {
                ...form,
                imageUrl: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        };

        return makeGraphqlRequest(CreateProjectMutation, variables);
    }
};

export default CreateNewProject;

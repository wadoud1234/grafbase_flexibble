import Modal from "@/components/Modal"
import ProjectForm from "@/components/ProjectForm"
import getCurrentUser from "../../../../actions/getCurrentUser"
import { redirect } from "next/navigation"
import GetProjectDetails from "@/libs/graphql/query/fetchProject"
import { ProjectInterface } from "@/common.types"

type EditProjectProps = {
    params: { id: string }
}

const EditProject = async ({ params: { id } }: EditProjectProps) => {
    const session = await getCurrentUser()
    if (!session.user) redirect("/")

    const result = await GetProjectDetails(id) as { project?: ProjectInterface }

    return (
        <Modal>
            <h3 className="modal-head-text">Edit a project</h3>
            <ProjectForm
                type="edit"
                session={session}
                project={result?.project}
            />
        </Modal>
    )
}
export default EditProject
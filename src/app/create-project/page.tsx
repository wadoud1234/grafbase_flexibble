import Modal from "@/components/Modal"
import ProjectForm from "@/components/ProjectForm"
import getCurrentUser from "../../../actions/getCurrentUser"
import { redirect } from "next/navigation"
import { getUser } from "@/libs/graphql/query"

const CreateProject = async () => {
    const session = await getCurrentUser()
    if (!session.user || !session.user.email) redirect("/")
    const user = await getUser(session.user.email)

    return (
        <Modal>
            <h3 className="modal-head-text">Create a new project</h3>
            <ProjectForm type="create" user={user} />
        </Modal>
    )
}
export default CreateProject

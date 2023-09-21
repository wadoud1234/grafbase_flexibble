import { UserProfile } from "@/common.types"
import ProfilePage from "@/components/ProfilePage"
import GetUserProjects from "@/libs/graphql/query/getUserProjects"


type ProfileProps = {
    params: { id: string }
}

const UserProfile = async ({ params: { id } }: ProfileProps) => {
    const result = await GetUserProjects(id, 100) as { user: UserProfile }

    if (!result.user) {
        return (
            <p>Failed to fetch user data</p>
        )
    }

    return (
        <ProfilePage user={result?.user} />
    )
}
export default UserProfile
import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { categoryFilters } from "@/constants";
import FetchAllProjects from "@/libs/graphql/query/fetchAllProjects";
import getCurrentUser from "../../actions/getCurrentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/session";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";

type ProjectSearch = {
    projectSearch: {
        edges: { node: ProjectInterface }[],
        pageInfo: {
            hasPreviousPage: boolean,
            hasNextPage: boolean,
            startCursor: string,
            endCursor: string
        }
    }
}

type HomeProps = {
    searchParams: { category?: string | null, endcursor?: string | null }
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: HomeProps) => {
    const session = await getCurrentUser()
    console.log("session Homepage ==> ",{session});
    const data = await FetchAllProjects(category, endcursor) as ProjectSearch
    console.log("datta ==> ", data);

    const projectsToDisplay = data?.projectSearch?.edges || []

    const pagination = data?.projectSearch?.pageInfo
    console.log("pagination==>", pagination);

    if (projectsToDisplay.length <= 0) {
        return (
            <section className="flexStart flex-col paddings">
                <Categories />

                <p className="no-result-text text-center">No project found, go create one !</p>
            </section>
        )
    }
    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />
            <section className="projects-grid">
                {projectsToDisplay.map(
                    ({ node }: { node: ProjectInterface }) => (
                        <ProjectCard
                            key={node?.id}
                            id={node?.id}
                            image={node?.image}
                            title={node?.title}
                            name={node?.createdBy?.name}
                            avatarUrl={node?.createdBy?.avatarUrl}
                            userId={node?.createdBy?.id}
                        />
                    ))}
            </section>
            <LoadMore
                startCursor={pagination?.startCursor}
                endCursor={pagination?.endCursor}
                hasPreviousPage={pagination?.hasPreviousPage}
                hasNextPage={pagination?.hasNextPage}
            />
        </section>
    )
}

export default Home;

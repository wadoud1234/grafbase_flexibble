"use client";

import fetchToken from "@/libs/fetchToken";
import DeleteProject from "@/libs/graphql/mutations/deleteProject";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProjectActionsProps = {
    projectId: string
}

const ProjectActions = ({ projectId }: ProjectActionsProps) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    const handleDeleteProject = async () => {
        setIsDeleting(true);
        const { token } = await fetchToken()

        try {
            await DeleteProject(projectId, token)
            router.push("/")
        } catch (error) {
            console.log(error);
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <>
            <Link
                href={`/edit-project/${projectId}`}
                className="flexCenter edit-action_btn">
                <Image
                    src="/pencile.svg"
                    alt="edit"
                    width={15}
                    height={15}
                />
            </Link>
            <button
                type="button"
                className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
                onClick={handleDeleteProject}
            >
                <Image
                    src="/trash.svg"
                    alt="delete"
                    width={15}
                    height={15}
                />
            </button>
        </>
    )
}
export default ProjectActions
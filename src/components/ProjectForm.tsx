"use client";

import { ProjectInterface, SessionInterface } from "@/common.types"
import Image from "next/image";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import Button from "./Button";
import CreateNewProject from "@/libs/graphql/mutations/createProject";
import fetchToken from "@/libs/fetchToken";
import { useRouter } from "next/navigation";
import EditProject from "@/libs/graphql/mutations/editProject";

type ProjectFormProps = {
    type: "create" | "edit"
    user: any,
    project?: ProjectInterface
}

const ProjectForm = ({ type, user, project }: ProjectFormProps) => {
    const router = useRouter()
    console.log({user,id:user?.id});
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        title: project?.title || "",
        image: project?.image || "",
        description: project?.description || "",
        githubUrl: project?.githubUrl || "",
        liveSiteUrl: project?.liveSiteUrl || "",
        category: project?.category || ""
    })

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const { token } = await fetchToken()
        console.log({ token });

        try {
            if (type === "create") {
                console.log({ form, userId: user?.id, token });
                await CreateNewProject(form, user?.id, token).then(res => console.log("create project response ==> ", res))
                router.push(`/`)
            }
            if (type === "edit") {
                await EditProject(form, project?.id as string, token)
                router.push(`/project/${project?.id}`)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false)
        }
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0]

        if (!file) return;
        if (!file.type.includes("image")) return alert("Please upload an image file !")

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange("image", result)
        }
    }
    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({
            ...prevState,
            [fieldName]: value
        }))
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form"
        >
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && (<p>Choose a poster for your project</p>)}
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === "create"}
                    className="form_image-input"
                    onChange={handleImageChange}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20"
                        alt="project poster"
                        fill
                    />
                )}
            </div>
            <FormField
                title="Title"
                state={form.title}
                placeholder="Flexibble."
                setState={(value) => handleStateChange("title", value)}
            />
            <FormField
                title="Description"
                state={form.description}
                placeholder="Showcase and discover remarkable developer projects."
                setState={(value) => handleStateChange("description", value)}
            />
            <FormField
                type="url"
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://project.website.com"
                setState={(value) => handleStateChange("liveSiteUrl", value)}
            />
            <FormField
                type="url"
                title="Github URL"
                state={form.githubUrl}
                placeholder="https://github.com/project"
                setState={(value) => handleStateChange("githubUrl", value)}
            />

            {/* TODO */}
            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange("category", value)}
            />

            <div className="flexStart w-full">
                <Button
                    title={isSubmitting ?
                        `${type === "create" ? "Creating" : "Editing"}`
                        :
                        `${type === "create" ? "Create" : "Edit"}`
                    }
                    type="submit"
                    leftIcon={isSubmitting ? "" : "/plus.svg"}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>
    )
}
export default ProjectForm

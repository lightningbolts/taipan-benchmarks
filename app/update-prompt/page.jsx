"use client";
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import {useSession} from "next-auth/react";

const EditPrompt = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (promptId) getPromptDetails()
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        if (!promptId) return alert("Prompt ID not found")

        try {
            // Fetch the current user's ID from the session or JWT
            const currentUserId = session?.user.id

            // Fetch the prompt from the database
            const promptResponse = await fetch(`/api/prompt/${promptId}`)
            const promptData = await promptResponse.json()

            console.log(promptData.creator, currentUserId)

            // Check if the current user is the creator of the prompt
            if (promptData.creator._id !== currentUserId.toString()) {
                return alert("You are not authorized to edit this prompt")
            }

            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            })

            if (response.ok) {
                router.push("/")
            }
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt

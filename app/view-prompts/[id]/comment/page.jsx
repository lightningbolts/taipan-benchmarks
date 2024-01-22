"use client";
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreateComment = ({ params }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })
    const createComment = async (e) => {

        e.preventDefault();
        setSubmitting(true)
        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                    commentReference: params?.id,
                }),
            })

            if (response.ok) {
                router.push("/view-prompts")
            }
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Create"
            postType="comment"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createComment}
        />
    )
}

export default CreateComment

"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PromptPage from "@components/PromptPage";

const ViewPrompt = ({ params }) => {
    const searchParams = useSearchParams();
    // const userName = searchParams.get("name");
    const key = searchParams.get("key");
    // console.log(key)
    const [promptData, setPromptData] = useState([]);
    const { data: session } = useSession();
    // console.log(params)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/view-prompts/${params?.id}`);
            const data = await response.json();
            console.log(data)
            setPromptData(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id, session?.user.id]);
    console.log(promptData)
    return (
        <PromptPage
            promptData={promptData}
        />
    );
}
export default ViewPrompt;
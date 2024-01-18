"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PromptPage from "@components/PromptPage";

const ViewPrompt = ({ params }) => {
    const searchParams = useSearchParams();
    const [promptData, setPromptData] = useState(null);
    const { data: session } = useSession();
    const fetchPosts = async () => {
        const response = await fetch(`/api/view-prompts/${params?.id}`, {cache: "no-store"});
        const data = await response.json();
        setPromptData(data);
    };
    useEffect( () => {
        if (params?.id) {
            (async () => {
                await fetchPosts();
            })()
        }
    }, [params.id]);
    return promptData && (
        <PromptPage
            promptData={promptData}
        />
    );
}
export default ViewPrompt;
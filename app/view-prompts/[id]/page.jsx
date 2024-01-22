"use client"
import {useEffect, useState} from "react"
import {useSession} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import PromptSlot from "@components/PromptSlot";

const PromptSlotList = ({data}) => {
    return (
        <div className="mt-20">
            {data.map((prompt) => (
                <div
                    className="mt-5">
                    <PromptSlot
                        promptData={prompt}
                    />
                </div>
            ))}
        </div>
    );
}
const ViewPrompt = ({params}) => {
    const searchParams = useSearchParams();
    const [promptData, setPromptData] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const {data: session} = useSession();
    const fetchComments = async () => {
        const response = await fetch(`/api/view-prompts/comment/${params?.id}`, {cache: "no-store"});
        let data = await response.json();
        console.log(data);
        setCommentData(data);
    };
    const fetchPrompt = async () => {
        const response = await fetch(`/api/view-prompts/${params?.id}`, {cache: "no-store"});
        let data = await response.json();
        setPromptData(data);
    }
    useEffect(() => {
        if (params?.id) {
            (async () => {
                await fetchPrompt();
                await fetchComments();
            })()
        }
    }, [params.id]);
    return promptData && commentData && (
        <div>
            <PromptSlot
                promptData={promptData}
            />
            <PromptSlotList
                data={commentData}
            />
        </div>
    );
}
export default ViewPrompt;
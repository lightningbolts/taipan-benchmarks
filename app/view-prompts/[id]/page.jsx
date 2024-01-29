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
                    {prompt.comments && (
                        <div className="ml-5">
                            {prompt.comments.map((comment) => (
                                <div
                                    className="mt-5">
                                    <PromptSlot
                                        promptData={comment}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
const ViewPrompt = ({params}) => {
    useSearchParams();
    const [promptData, setPromptData] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const fetchComments = async () => {
        const response = await fetch(`/api/view-prompts/comment/${params?.id}`, {cache: "no-store"});
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {
            let comment = data[i];
            let response = await fetch(`/api/view-prompts/comment/${comment._id}`, {cache: "no-store"});
            // Add level attribute to comment
            data[i].level = 1;
            // Add comment data to comment
            data[i].comments = await response.json();
            for (let j = 0; j < data[i].comments.length; j++) {
                let subComment = data[i].comments[j];
                data[i].comments[j].level = 2;
            }
        }
        console.log(data);
        setCommentData(data);
    };
    const fetchPrompt = async () => {
        const response = await fetch(`/api/view-prompts/${params?.id}`, {cache: "no-store"});
        let data = await response.json();
        data.level = 0;
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
            <div className="mt-5"></div>
        </div>
    );
}
export default ViewPrompt;
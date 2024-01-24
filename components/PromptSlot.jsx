"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import PromptCard from "@components/PromptCard";
import Image from "@node_modules/next/image";
import {usePathname, useRouter} from "next/navigation";
import {set} from "mongoose";

const PromptSlot = ({ promptData }) => {
    const { data: session } = useSession();
    console.log(promptData)
    const [copied, setCopied] = useState("");
    const pathName = usePathname();
    const router = useRouter();
    const [pos, setPos] = useState(null);


    const handleEdit = (promptData) => {
        router.push(`/update-prompt?id=${promptData._id}`)
    }

    const handleProfileClick = () => {
        console.log(promptData);

        if (promptData.creator._id === session?.user.id) return router.push("/profile");

        router.push(`/profile/${promptData.creator._id}?name=${promptData.creator.username}`);
    };

    const handleCopy = () => {
        setCopied(promptData.prompt);
        navigator.clipboard.writeText(promptData.prompt);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleDelete = async (promptData) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${promptData._id.toString()}`, {
                    method: "DELETE",
                })

                setPos(promptData)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const handleComment = (promptData) => {
        router.push(`/view-prompts/${promptData._id}/comment`)
    }

    const handleTagClick = (tag) => {
        router.push(`/tag/${tag}`)
    }

    return (
        <div
            className="100vh flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[800px] w-full h-fit">
            <div className='flex justify-between items-start gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                    onClick={handleProfileClick}
                >
                    <Image
                        src={promptData.creator.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {promptData.creator.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {promptData.creator.email}
                        </p>
                    </div>
                </div>

                <div className='copy_btn' onClick={handleCopy}>
                    <Image
                        src={
                            copied === promptData.prompt
                                ? "/assets/icons/tick.svg"
                                : "/assets/icons/copy.svg"
                        }
                        alt={copied === promptData.prompt ? "tick_icon" : "copy_icon"}
                        width={12}
                        height={12}
                    />
                </div>
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{promptData.prompt}</p>
            <p
                className='font-inter text-sm blue_gradient cursor-pointer'
                // onClick={() => handleTagClick && handleTagClick(promptData.tag)}
            >
                #{promptData.tag}
            </p>

            <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                <p className='font-inter text-sm text-gray-500'>
                    Created at: {new Date(promptData.createdAt).toLocaleString()}
                </p>
                <p className='font-inter text-sm text-gray-500'>
                    Last edited: {new Date(promptData.updatedAt).toLocaleString()}
                </p>
                <div className='flex-1'></div>
                {/* This is to push the buttons to the right */}
                {session?.user.id === promptData.creator._id && (
                    <>
                        <p
                            className='font-inter text-sm green_gradient cursor-pointer'
                            onClick={() => handleEdit && handleEdit(promptData)}
                        >
                            Edit
                        </p>
                        <p
                            className='font-inter text-sm orange_gradient cursor-pointer'
                            onClick={() => handleDelete && handleDelete(promptData)}
                        >
                            Delete
                        </p>
                    </>
                )}
                {session?.user.id && (
                    <p
                        className='font-inter text-sm blue_gradient cursor-pointer'
                        onClick={() => handleComment && handleComment(promptData)}
                    >
                        Comment
                    </p>
                )}
            </div>
        </div>
    )
}

export default PromptSlot;
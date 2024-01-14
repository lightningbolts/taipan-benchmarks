"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";

const PromptPage = ({ promptData }) => {
    const { data: session } = useSession();
    console.log(promptData)

    return (
        <div className="prompt_page">
            <div className="prompt_page_container">
                <div className="prompt_page_header">
                    <h1 className="prompt_page_title">{promptData.prompt}</h1>
                    <div className="prompt_page_tags">
                        {promptData.tag}
                    </div>
                </div>
                <div className="prompt_page_content">
                    <div className="prompt_page_user">
                        <div className="prompt_page_user_image">
                            <img src={promptData.creator.image} alt="" />
                        </div>
                        <div className="prompt_page_user_info">
                            <h3 className="prompt_page_user_name">{promptData.creator.username}</h3>
                            <p className="prompt_page_user_email">{promptData.creator.email}</p>
                        </div>
                    </div>
                    <div className="prompt_page_copy">
                        <button className="prompt_page_copy_btn">Copy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromptPage;
"use client";

import { useState, useEffect } from "react";
import Download from "@components/Download";

const DownloadFeed = () => {
    const [downloads, setDownloads] = useState([])
    const [loading, setLoading] = useState(true)
    return (
        <section className="feed">
            <div className="feed_container">
                <Download
                    os="Windows"
                    os_logo="windows"
                />
                <Download os="Mac" os_logo="apple" />
                <Download os="Linux" os_logo="linux" />
            </div>
        </section>
    )
}

export default DownloadFeed
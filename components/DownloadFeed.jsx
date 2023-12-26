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
                    file_name="prime_windows.exe"
                    os_logo="windows"
                />
                <Download
                    os="Mac (Arm)"
                    file_name="prime_macos_arm"
                    os_logo="apple"
                />
                <Download
                    os="Mac (Intel)"
                    file_name="prime_macos_intel"
                    os_logo="apple"
                />
                <Download
                    os="Linux"
                    file_name="prime_linux"
                    os_logo="linux"
                />
            </div>
        </section>
    )
}

export default DownloadFeed
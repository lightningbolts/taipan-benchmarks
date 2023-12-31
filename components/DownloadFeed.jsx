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
                    os="Windows 10 or 11"
                    file_name="primepoint_windows.exe"
                    os_logo="windows"
                />
                <Download
                    os="MacOS (Arm)"
                    file_name="primepoint_macos_arm"
                    os_logo="apple"
                />
                <Download
                    os="MacOS (Intel)"
                    file_name="primepoint_macos_intel"
                    os_logo="apple"
                />
                <Download
                    os="Linux (Debian)"
                    file_name="primepoint_linux_debian"
                    os_logo="ubuntu"
                />
                <Download
                    os="Linux (Arch)"
                    file_name="primepoint_linux_arch"
                    os_logo="archlinux"
                />
                <p className="desc text-center">
                    If you are running Linux or MacOS, you will need to make the file executable. To do that, run the command in the terminal:
                    <br />
                    <br />
                    <code>
                        chmod +x prime_[file_name]
                    </code>
                    <br />
                    <br />
                    where <code>[file_name]</code> is the name of the file you downloaded.
                </p>
            </div>
        </section>
    )
}

export default DownloadFeed
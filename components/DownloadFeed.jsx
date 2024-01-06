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
                    file_name="array_windows.zip"
                    os_logo="windows"
                />
                <Download
                    os="MacOS (Arm)"
                    file_name="array_macos_arm.zip"
                    os_logo="apple"
                />
                <Download
                    os="MacOS (Intel)"
                    file_name="array_macos_intel.zip"
                    os_logo="apple"
                />
                <Download
                    os="Linux (Debian)"
                    file_name="array_linux_debian.zip"
                    os_logo="ubuntu"
                />
                <Download
                    os="Linux (Arch)"
                    file_name="array_linux_arch.zip"
                    os_logo="archlinux"
                />
                <p className="desc text-center">
                    System requirements: 4GB RAM
                </p>
                <p className="desc text-center">
                    Processor requirements: AMD, Intel, or Apple Silicon
                </p>
            </div>
        </section>
    )
}

export default DownloadFeed
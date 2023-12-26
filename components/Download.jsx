"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";

const Download = ({ os, file_name, os_logo }) => {
    const router = useRouter()
    const pathname = usePathname()

    const saveFile = () => {
        fetch(`/api/download/${file_name}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file_name;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
    }

    return (
        <a
            onClick={saveFile}
            className="w-full black_btn mt-5 text-center">
            Download {os}
        </a>
    )
}

export default Download
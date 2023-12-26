"use client"
import React from 'react'
import Link from 'next/link'

const Download = ({ os, os_logo }) => {
    const onClick = () => {
        console.log("Download", os)
    }
    return (
        <button
            onClick={onClick}
            className="w-full black_btn mt-5 text-center">
            Downloads {os}
        </button>
    )
}

export default Download
"use client"
import DownloadFeed from "@components/DownloadFeed"

const Downloads = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center blue_gradient">
                Download right here.
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">Right now.</span>
            </h1>
            <DownloadFeed />
        </section>
    )
}

export default Downloads
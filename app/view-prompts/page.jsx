import Feed from "@components/Feed";
import Footer from "@components/Footer";

const PromptFeed = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">Taipan Benchmarks
                <br className="max-md:hidden" />
                <span href="/create-prompt" className="blue_gradient text-center"> Share your post.</span>
                <br className="max-md:hidden" />
                <span href="/view-prompts" className="orange_gradient text-center"> Discover.</span>
            </h1>
            <p className="desc text-center">
                Taipan Benchmarks is a collection of benchmarks that are easy to use and understand.
            </p>
            <Feed />
            <Footer />

        </section>
    )
}

export default PromptFeed;
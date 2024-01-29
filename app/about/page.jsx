import Footer from "@components/Footer";

const About = () => {
    return (
        <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">About Taipan Benchmarks</h1>
        <p className="desc text-left">
            Taipan Benchmarks is a collection of benchmarks that are easy to use and understand. We provide a simple interface to run benchmarks and compare results. We also provide a simple API to submit benchmarks from your own machine.
        </p>
        <Footer />
        </section>
    )
}
export default About
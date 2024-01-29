import Footer from "@components/Footer";

const HelpCenter = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">Help Center</h1>
            <p className="desc text-left">
                Contact us at <a href="mailto:taipanbenchmarks@gmail.com">taipanbenchmarks@gmail.com</a>.
            </p>
            <Footer />
        </section>
    )
}

export default HelpCenter
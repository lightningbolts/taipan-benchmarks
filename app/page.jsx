import Feed from "@components/Feed"
import BenchmarkFeed from "@components/BenchmarkFeed"
import { useSession } from "next-auth/react"
import MainText from "@components/MainText"
import Footer from "@components/Footer";

const Home = () => {
  // Check if user is logged in

  return (
    <section className="w-full flex-center flex-col">
      <MainText />
      <p className="desc text-center">
        Taipan Benchmarks is a collection of benchmarks that are easy to use and understand.
      </p>
      {/* <Feed /> */}
      <BenchmarkFeed />
        <Footer />

    </section>
  )
}

export default Home
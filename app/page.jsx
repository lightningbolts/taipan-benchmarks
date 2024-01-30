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
        Taipan Benchmarks is a collection of benchmarks that are easy to use and understand. Source code is available on
          <a href="https://github.com/lightningbolts/taipan-benchmarks" className="text-blue-500 hover-brighten"> Github</a>.
      </p>
      {/* <Feed /> */}
      <BenchmarkFeed />
        <Footer />

    </section>
  )
}

export default Home
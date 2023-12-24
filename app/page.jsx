import Feed from "@components/Feed"
import BenchmarkFeed from "@components/BenchmarkFeed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Taipan Benchmarks
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Discover all sorts of easy to use benchmarks.</span>
      </h1>
      <p className="desc text-center">
        Taipan Benchmarks is a collection of benchmarks that are easy to use and understand.
      </p>
      {/* <Feed /> */}
      <BenchmarkFeed />

    </section>
  )
}

export default Home
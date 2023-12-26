"use client"
import Feed from "@components/Feed"
import BenchmarkFeed from "@components/BenchmarkFeed"
import { useSession } from "next-auth/react"

const Home = () => {
  // Check if user is logged in
  const { data: session } = useSession();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Taipan Benchmarks
        {/* If user is not logged in */}
        {!session && (
          <>
            <br className="max-md:hidden" />
            <span className="blue_gradient text-center"> Sign in right now.</span>
          </>
        )}
        {/* If user is logged in */}
        {session && (
          <>
            <br className="max-md:hidden" />
            <span className="blue_gradient text-center"> Start benching.</span>
          </>
        )}
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Discover.</span>
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
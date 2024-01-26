"use client";

import { useState, useEffect } from "react";
import BenchmarkList from "@components/BenchmarkList";
import Footer from "@components/Footer";

const Leaderboard = () => {

    return (
        <section className="w-full flex-center flex-col">
            <h1 className='head_text text-center blue_gradient'>
                Leaderboard Results
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'>
                    {' '}
                    Right now.
                </span>
            </h1>
            <p className="desc text-center">
                Taipan Benchmarks is a collection of benchmarks that are easy to use and understand.
            </p>
            {/* <Feed /> */}
            <BenchmarkList />
            <div className="mt-5 flex-center"></div>
            <Footer />
        </section>
    )
}

export default Leaderboard
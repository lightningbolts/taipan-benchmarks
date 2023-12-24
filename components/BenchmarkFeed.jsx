"use client";

import { useState, useEffect } from "react";

import BenchmarkCard from "./BenchmarkCard";
const BenchmarkCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <BenchmarkCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [allBenchmarks, setAllBenchmarks] = useState([]);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch("/api/cpu-benchmarks", { chache: "no-store" });
        const data = await response.json();

        setAllBenchmarks(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allBenchmarks.filter(
            (item) =>
                regex.test(item.cpu_model) ||
                regex.test(item.os_info) ||
                regex.test(item.time)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for operating system or cpu model'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {/* All Prompts */}
            {searchText ? (
                <BenchmarkCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <BenchmarkCardList data={allBenchmarks} handleTagClick={handleTagClick} />
            )}
        </section>
    );
};

export default Feed;
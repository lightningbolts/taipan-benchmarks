"use client";

import { useState, useEffect } from "react";
import BenchmarkRow from "./BenchmarkRow";
const BenchmarkRowList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16'>
            {data.map((post) => (
                <BenchmarkRow
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
    const [sortedBenchmarks, setSortedBenchmarks] = useState([]);
    const [sortBy, setSortBy] = useState(null);

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
                regex.test(item.time) ||
                regex.test(item.hostname)
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

    const sortBenchmarks = (sortBy) => {
        let sortedScores;
        if (sortBy === "single_core") {
            sortedScores = allBenchmarks.sort((a, b) => {
                return b.single_core_score - a.single_core_score;
            });
        } else if (sortBy === "multi_core") {
            sortedScores = allBenchmarks.sort((a, b) => {
                return b.multi_core_score - a.multi_core_score;
            });
        }
        setSortedBenchmarks(sortedScores);
        setSortBy(sortBy);
    };

    useEffect(() => {
        if (sortBy) {
            sortBenchmarks(sortBy);
        }
    }, [sortBy]);

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
            <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '100%' }}>
                    <button onClick={() => sortBenchmarks("single_core")} className="black_btn" style={{ marginRight: '5px' }}>
                        {sortBy === "single_core" ? <strong>Top Single Core Results</strong> : "Top Single Core Results"}
                    </button>
                    <button onClick={() => sortBenchmarks("multi_core")} className="black_btn" style={{ marginLeft: '5px' }}>
                        {sortBy === "multi_core" ? <strong>Top Multi Core Results</strong> : "Top Multi Core Results"}
                    </button>
                </div>
            </div>

            {/* All Prompts */}
            {searchText ? (
                <BenchmarkRowList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <BenchmarkRowList
                    data={sortedBenchmarks.length > 0 ? sortedBenchmarks : allBenchmarks}
                    handleTagClick={handleTagClick}
                />
            )}
        </section>
    );
};

export default Feed;
"use client";
import React from "react";
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { set } from "mongoose";

const Nav = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="Taipan Benchmarks Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text hover-brighten">Taipan Benchmarks</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
            <div className="flex gap-3 md:gap-5">
                <button type="button" className="">
                    <Link href="/downloads" className="hover-brighten">Download</Link>
                </button>
                <button type="button" className="dropdown hover-brighten">
                    <Link href="/downloads">View</Link>
                    <div className="dropdown-content">
                        {/* Dropdown menu items go here */}
                        <Link href="/cpu-benchmarks">Results</Link>
                        <Link href="/leaderboard">Leaderboard</Link>
                        <Link href="/view-prompts">Posts</Link>
                    </div>
                </button>
                <button type="button" className="hover-brighten">
                    <Link href="/create-prompt">Create Post</Link>
                </button>
                <button type="button" onClick={signOut} className="hover-brighten">
                    Sign Out
                </button>
                <Link href="/profile" className="flex gap-2 flex-center">
                    <Image
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"
                    />
                </Link>
            </div>
        ) : (
            <>
                {providers &&
                    Object.values(providers).map((provider) => (
                        <div className="flex gap-3 md:gap-5">
                            <button type="button" className="">
                                <Link href="/downloads">Download</Link>
              </button>
              <button type="button" className="">
                  <Link href="/cpu-benchmarks">Results</Link>
              </button>
              <button type="button" className="">
                  <Link href="/leaderboard">Leaderboard</Link>
              </button>
              <button type="button" className="">
                <Link href="/view-prompts">Posts</Link>
            </button>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown_mobile">
                <Link
                  href="/profile"
                  className="dropdown_item"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/downloads"
                  className="dropdown_item"
                  onClick={() => setToggleDropdown(false)}
                >
                  Downloads
                </Link>
                <Link
                  href="/cpu-benchmarks"
                  className="dropdown_item"
                  onClick={() => setToggleDropdown(false)}
                >
                  Results
                </Link>
                <Link
                  href="/leaderboard"
                  className="dropdown_item"
                  onClick={() => setToggleDropdown(false)}
                >
                  Leaderboard
                </Link>
                <Link
                  href="/view-prompts"
                  className="dropdown_item"
                  onClick={() => setToggleDropdown(false)}
                >
                  Posts
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_item"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full outline_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav

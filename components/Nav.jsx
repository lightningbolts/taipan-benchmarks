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
        <p className="logo_text">Taipan Benchmarks</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/downloads" className="black_btn">
              Download
            </Link>
            <Link href="/cpu-benchmarks" className="black_btn">
              View Results
            </Link>
            <Link href="/view-prompts" className="black_btn">
              View Posts
            </Link>
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
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
                  <Link href="/downloads" className="black_btn">
                    Download
                  </Link>
                  <Link href="/cpu-benchmarks" className="black_btn">
                    View Results
                  </Link>
                  <Link href="/view-prompts" className="black_btn">
                    View Posts
                  </Link>
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
              <div className="dropdown">
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
                  View Results
                </Link>
                <Link
                  href="/view-prompts"
                  className="dropdown_item"
                  onClick={() => setToggleDropdown(false)}
                >
                  View Posts
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

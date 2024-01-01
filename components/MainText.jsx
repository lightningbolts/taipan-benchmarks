"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link';

const MainText = () => {
    const { data: session } = useSession();
    return (
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
                    <Link href="/downloads" className="blue_gradient text-center"> Start benching.</Link>
                </>
            )}
            <>
                <br className="max-md:hidden" />
                <Link href="/cpu-benchmarks" className="orange_gradient text-center"> Discover.</Link>
            </>
        </h1>
    )
}

export default MainText
"use client"
import { useSession } from 'next-auth/react'

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
                    <span href="/downloads" className="blue_gradient text-center"> Start benching.</span>
                </>
            )}
            <>
                <br className="max-md:hidden" />
                <span href="/view-prompts" className="orange_gradient text-center"> Discover.</span>
            </>
        </h1>
    )
}

export default MainText
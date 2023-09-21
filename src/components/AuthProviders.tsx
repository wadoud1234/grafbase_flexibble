"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "./Button";

type Provider = {
    id: string,
    name: string
    type: string
    signinUrl: string
    callbackUrl: string
    signinUrlParam?: Record<string, string> | null
}

type Providers = Record<string, Provider>

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null)

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders()


            setProviders(response);
        }
        fetchProviders()
    }, [])

    if (providers) {
        return (
            <div>
                {
                    Object.values(providers).map(
                        (provider: Provider, i) => (
                            <Button
                                key={i}
                                title="Sign In"
                                handleClick={() => signIn()}
                            />)
                    )
                }
            </div >
        )
    }
    return (
        <div>AuthProviders</div>
    )
}
export default AuthProviders
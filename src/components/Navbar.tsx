import { NavLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import AuthProviders from "./AuthProviders"

const Navbar = () => {
    // TODO
    const session = {}
    return (
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart ">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="Flexibble"
                        width={115}
                        height={43}
                    />
                </Link>
                <ul className="hidden xl:flex text-small gap-7">
                    {NavLinks.map((link) => (
                        <Link
                            href={link.href}
                            key={link.key}
                        >{link.text}</Link>
                    ))}
                </ul>
            </div>

            <div className="gap-4 flexCenter">
                {session ? (
                    <>
                        <p>UserPhoto</p>
                        <Link href="/create-project">Share work</Link>

                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    )
}
export default Navbar
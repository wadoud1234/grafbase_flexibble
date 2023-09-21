import { NavLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import AuthProviders from "./AuthProviders"
import getCurrentUser from "../../actions/getCurrentUser"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/session"
import { signOut } from "next-auth/react"
import ProfileMenu from "./ProfileMenu"

const Navbar = async () => {
    // TODO
    const session = await getCurrentUser()

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

            <div className="gap-4 flexCenter bg-sky-600">
                {session?.user ? (
                    <>
                        {/* {session.user.image && (
                            <Link href={`/profile/${session.user.id}`}>
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name}
                                    height={40}
                                    width={40}
                                    className="rounded-full"
                                />
                            </Link>
                        )} */}
                        <ProfileMenu session={session} />
                        <Link href="/create-project">Share work</Link>
                        {/* <button type="button" className="text-sm" onClick={signOut}>Sign Out</button> */}
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    )
}
export default Navbar
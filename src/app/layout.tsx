import Navbar from "@/components/Navbar"
import "./globals.css"
import Footer from "@/components/Footer"
import getCurrentUser from "../../actions/getCurrentUser"
import { getServerSession } from "next-auth"
import { ClerkProvider } from "@clerk/nextjs"
import AuthProviders from "@/components/AuthProviders"
export const metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remarcable developer projects',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

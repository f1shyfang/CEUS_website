import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../index.css'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CEUS - Chemical Engineering Undergraduate Society',
  description: 'The Chemical Engineering Undergraduate Society at UNSW',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

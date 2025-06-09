import './globals.css'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center pt-20 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

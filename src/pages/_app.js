import Logo from "@/components/Logo"
import "@/styles/globals.css"
import Link from "next/link"

const App = ({ Component, pageProps }) => (
  <main className="flex flex-col">
    <header className="flex justify-left bg-slate-500 border-b gap-4border-b-slate-200">
      <div className="max-w-md p-4 flex items-center gap-5 text-white">
        <Logo />
        <Link href="/">Community Maps</Link>
        <Link href="/locations">add a new monument</Link>
        <Link href="/evrything">read everything</Link>
      </div>
    </header>
    <section className="flex justify-center">
      <div className=" w-full p-4">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App

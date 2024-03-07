import "@/styles/globals.css"
import Link from "next/link"

const App = ({ Component, pageProps }) => (
  <main className="flex flex-col">
    <header className="flex justify-left bg-slate-100 border-b gap-4border-b-slate-200">
      <div className="max-w-md p-4 flex items-center gap-5">
        <Link href="/">Test</Link>
        <Link href="/locations">add a new monument</Link>
      </div>
    </header>
    <section className="flex justify-center">
      <div className="max-w-md w-full p-4">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App

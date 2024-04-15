import axios from "axios"
import Link from "next/link"

export const getServerSideProps = async () => {
  const { data: count } = await axios(
    `http://localhost:3000/api/locations/count`,
  )

  return {
    props: { count },
  }
}
const HomePage = ({ count }) => (
  <>
    <nav className="flex justify-center flex-col w-full text-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold ">
          Welcome to this community site. The database is filled only by the
          community.{" "}
        </h1>
        <p>Currently there are {count} places on the site</p>
      </div>
      <div className="space-x-10">
        <Link
          href="/locations"
          className="bg-indigo-600 active:bg-indigo-700 text-white px-3 py-2 font-semibold"
        >
          add a new monument
        </Link>
        <Link
          href="/evrything"
          className="bg-indigo-600 active:bg-indigo-700 text-white px-3 py-2 font-semibold"
        >
          Go look some things !
        </Link>
      </div>
    </nav>
  </>
)

export default HomePage

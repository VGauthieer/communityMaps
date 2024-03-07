import axios from "axios"
import Link from "next/link"

export const getServerSideProps = async () => {
  const { data: count } = await axios(
    `http://localhost:3000/api/location/count`,
  )

  return {
    props: { count },
  }
}
const HomePage = ({ count }) => (
  <nav>
    <Link href="/locations">location</Link>
    <p>{count}</p>
  </nav>
)

export default HomePage

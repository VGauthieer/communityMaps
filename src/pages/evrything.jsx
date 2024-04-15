import axios from "axios"
import Link from "next/link"

export const getServerSideProps = async () => {
  const { data: location } = await axios("http://localhost:3000/api/locations")
    const { data: count } = await axios(
    `http://localhost:3000/api/locations/count`,
  )

  
  return {
    props: {
      location, count
    },
  }
}
const maxvalue = 20
const evrythingPage = (props) => {
  const { location, count } = props

  if (props.location.length > maxvalue) {
    props.location.length = maxvalue
  }

  if (count === 0) {
    return (

      <nav>
        <div>
          <h1>There nothing there ! go add sommething</h1>
        </div>
        <div>

          <Link
            href="/locations"
            className="bg-indigo-600 active:bg-indigo-700 text-white px-3 py-2 font-semibold"
          >
            add a new monument
          </Link>
        </div>
      </nav>
    )
  }


  return (
    <nav>
      <div>
        
      </div>
    <div>
    <ul className="p-8">
      {location.map((locations, index) => (
        <li key={index}>
          -{" "}
          <Link href={`/locations/${locations._id}`}>
            {locations.title} ({locations.description}, {locations.address}, {locations.type} )
          </Link>
        </li>
      )
      )
      }
        </ul>
    </div>
  
    </nav>
)
}
  
 



export default evrythingPage
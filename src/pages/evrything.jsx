import axios from "axios"
import Link from "next/link"

export const getServerSideProps = async () => {
  const { data: location } = await axios("http://localhost:3000/api/locations")

  return {
    props: {
      location,
    },
  }
}
const maxvalue = 20
const evrythingPage = (props) => {
  const { location } = props

  if (props.location.length > maxvalue) {
    props.location.length = maxvalue
  }


  return (
    <ul className="p-8">
      {location.map((locations, index) => (
        <li key={index}>
          -{" "}
          <Link href={`/evrything/${locations._id}/edit`}>
            {locations.title} ({locations.description}, {locations.address} )
          </Link>
        </li>
      )
      )
      }
    </ul>
  )
}
  
 



export default evrythingPage
import axios from "axios"

export const getServerSideProps = async ({ params: { locationId } }) => {
  const { data: location } = await axios(
    `http://localhost:3000/api/location/${locationId}`,
  )

  return {
    props: { location },
  }
}
const locationPage = ({ location }) => (
  <>
    <h1 className="text-2xl font-semibold">title: {location.title}</h1>
    <p>description: {location.description}</p>
    <p>Location: {location.address}</p>
  </>
)

export default locationPage
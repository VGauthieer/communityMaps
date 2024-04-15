import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"
import FormBootstrap from "react-bootstrap/Form"

export const getServerSideProps = async ({ params: { locationId } }) => {
  const { data: location } = await axios(
    `http://localhost:3000/api/locations/${locationId}`,
  )

  return {
    props: { location },
  }
}
const validationSchema = yup.object({
  title: yup.string().min(1).required(),
  address: yup.string().min(1).required(),
  description: yup.string().min(3).required(),
  type: yup.string().min(3).required(),
})
const LocationEditPage = ({ location }) => {
  const router = useRouter()
  const initialValues = location
  const handleSubmit = async ({ _id, title, description, address, type }) => {
    await axios.patch(`/api/locations/${_id}`, { title, description, address, type })

    router.push(`/locations/${_id}`)
  }
  const handledelete = () => async () => {
    await axios.delete(`/api/locations/${router.query.locationId}`)

    router.push("/locations")
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" placeholder="title" />
        <FormField name="address" placeholder="address" />
        <FormField name="description" placeholder="Description" />
        <FormField as={FormBootstrap.Select} name="type" aria-label="Open this select menu">
          <option value="Monument">Monument</option>
          <option value="House">House</option>
          <option value="Museum">Museum</option>
          <option value="City">City</option>
          <option value="Other">Other</option>
            
        </FormField>
        <Button type="submit">SAVE</Button>
        <Button type="button" onClick={handledelete()}>DELETE</Button>
      </Form>
    </Formik>
  )
}

export default LocationEditPage
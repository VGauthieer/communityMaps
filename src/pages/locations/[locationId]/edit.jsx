import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"

export const getServerSideProps = async ({ params: { locationId } }) => {
  const { data: location } = await axios(
    `http://localhost:3000/api/location/${locationId}`,
  )

  return {
    props: { location },
  }
}
const validationSchema = yup.object({
  title: yup.string().min(1).required(),
  address: yup.string().min(1).required(),
  description: yup.string().min(3).required(),
})
const LocationEditPage = ({ location }) => {
  const router = useRouter()
  const initialValues = location
  const handleSubmit = async ({ _id, title, description, address }) => {
    await axios.patch(`/api/location/${_id}`, { title, description, address })

    router.push(`/location/${_id}`)
  }
  const handledelete = () => async () => {
    await axios.delete(`/api/locations/${location._id}`)

    router.push("/location")
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
        <Button type="submit">SAVE</Button>
        <Button type="button" onClick={handledelete()}>DELETE</Button>
      </Form>
    </Formik>
  )
}

export default LocationEditPage
import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import axios from "axios"
import { Formik } from "formik"
import Link from "next/link"
import { useState } from "react"
import * as yup from "yup"
import FormBootstrap from "react-bootstrap/Form"

export const getServerSideProps = async () => {
  const { data: location } = await axios("http://localhost:3000/api/locations")

  return {
    props: {
      location,
    },
  }
}
const initialValues = {
  title: "",
  address: "",
  description: "a beautiful place",
  type: "",
}
const validationSchema = yup.object({
  title: yup.string().min(1).required(),
  address: yup.string().min(1).required(),
  description: yup.string().min(3).required(),
  type: yup.string().min(3).required(),
})
const LocationPage = (props) => {
  const { location: initialLocation } = props
  const [location, setlocation] = useState(initialLocation)
  const handleSubmit = async ({ description, title, address, type }, { resetForm }) => {
    const { data: newlocation } = await axios.post("/api/locations", {
      title,
      address,
      description,
      type,
    })
    setlocation([newlocation, ...location])
    resetForm()
  }

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField name="title" placeholder="title" />
          <FormField name="address" placeholder="address" />
          <FormField as={FormBootstrap.Select} name="type" aria-label="Open this select menu">
            <option value="Monument">Monument</option>
            <option value="House">House</option>
            <option value="Museum">Museum</option>
            <option value="City">City</option>
            <option value="Other">Other</option>
            
          </FormField>
          <FormField name="description" placeholder="Description" />
          <Button type="submit">ADD</Button>
        </Form>
      </Formik>
      <ul className="p-8">
        {location.map((locations, index) => (
          <li key={index}>
            -{" "}
            <Link href={`/locations/${locations._id}/edit`}>
              {locations.title} ({locations.description}, {locations.address}, {locations.type} )
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default LocationPage
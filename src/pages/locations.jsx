import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import axios from "axios"
import { Formik } from "formik"
import Link from "next/link"
import { useState } from "react"
import * as yup from "yup"

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
  description: "a house",
}
const validationSchema = yup.object({
  title: yup.string().min(1).required(),
  address: yup.string().min(1).required(),
  description: yup.string().min(3).required(),
})
const LocationPage = (props) => {
  const { location: initialLocation } = props
  const [location, setlocation] = useState(initialLocation)
  const handleSubmit = async ({ description, title, address }, { resetForm }) => {
    const { data: newlocation } = await axios.post("/api/locations", {
      title,
      address,
      description,
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
          <FormField name="description" placeholder="Description" />
          <Button type="submit">ADD</Button>
        </Form>
      </Formik>
      <ul className="p-8">
        {location.map((locations, index) => (
          <li key={index}>
            -{" "}
            <Link href={`/locations/${locations._id}/edit`}>
              {locations.title} ({location.description}, {locations.address} )
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default LocationPage
import { createRoute } from "@/api/createRoute"
import { LocationModel } from "@/database/models/locationModel"

const handler = createRoute(async (req, res) => {
  const { locationId } = req.query
  const location = await LocationModel.findById(locationId)

  if (!location) {
    res.status(404).send({ error: "not found" })

    return
  }

  // GET /locations/[locationId] -> read resource item
  if (req.method === "GET") {
    res.send(location)

    return
  }

  // PATCH /locations/[locationId] -> update resource item
  if (req.method === "PATCH") {
    const { title, description, address } = req.body

    if (description) {
      location.description = description
    }

    if (title) {
      location.category = title
    }

    if (address) {
      location.address = address
    }

    await location.save()

    res.send(location)

    return
  }

  // DELETE /locations/[locationId] -> delete resource item
  if (req.method === "DELETE") {
    await location.deleteOne()

    res.send(location)
  }
})

export default handler

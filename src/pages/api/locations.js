import { createRoute } from "@/api/createRoute"
import { LocationModel } from "@/database/models/locationModel"

const handler = createRoute(async (req, res) => {
  // GET /locations -> read resource collection
  if (req.method === "GET") {
    const { category } = req.query
    const locations = await LocationModel.find(category ? { category } : {})

    res.send(locations)

    return
  }

  // POST /todos -> create resource
  if (req.method === "POST") {
    const { title, description, address, type } = req.body
    const newLocation = new LocationModel({
      title,
      address,
      description,
      type,
    })

    await newLocation.save()

    res.send(newLocation)
  }
})

export default handler

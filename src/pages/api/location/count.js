import { createRoute } from "@/api/createRoute"
import { LocationModel } from "@/database/models/locationModel"

const handler = createRoute(async (req, res) => {
  if (req.method === "GET") {
    const countMonument = await LocationModel.countDocuments({})

    res.send(countMonument)
  }
})
export default handler

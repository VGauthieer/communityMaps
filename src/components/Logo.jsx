const { default: Image } = require("next/image")
const Logo = () => (
  <Image
    src="/Community_maps_logo.png"
    alt="logo"
    width={40}
    height={40}
    className="rounded-full"
  />
)

export default Logo
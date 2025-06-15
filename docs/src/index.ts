import { component, getInitialData, inflator } from "./essential"
import NavbarMobile from "./ui/semantic/Navbar/NavbarMobile"


window.__INITIAL_DATA__ ||= await getInitialData()


const inflated = inflator.inflateComponent(component)
const rootElement = document.getElementById("root")!
rootElement.replaceChildren(inflated)

NavbarMobile.useParent(rootElement)

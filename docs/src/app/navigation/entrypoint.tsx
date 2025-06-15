import { PathRouteMatch } from "@denshya/router"

import Footer from "@/ui/semantic/Footer/Footer"
import Topbar from "@/ui/semantic/Topbar/Topbar"

import globalNavigation from "./navigation"

import inflator from "../inflator"
import { PageModule } from "../router/page-module.types"


function NavigationEntrypoint() {
  const main = inflator.inflate(<main />)
  const header = inflator.inflate(<header id="header"><Topbar /></header>)


  let lastModule: PageModule
  function replaceContent(match: PathRouteMatch<PageModule> | null) {
    if (match == null) throw new TypeError("Can't find any module to navigate to. Make sure 404 page exist.")
    const module = match.route.resource

    if (lastModule === module) return
    lastModule = module

    main.replaceChildren(inflator.inflateComponent(module.default))

    header.childNodes.forEach((node, index) => index > 0 && node.remove())
    if (module.header) header.append(inflator.inflateComponent(module.header))
  }

  globalNavigation.match.subscribe(replaceContent)
  replaceContent(globalNavigation.match.current)

  return (
    <>
      {header}
      {main}
      <Footer />
    </>
  )
}

export default NavigationEntrypoint

import { StateBoolean } from "@denshya/reactive"

import Link from "@/app/navigation/Link"
import { inflator } from "@/essential"
import Button from "@/ui/kit/Button/Button"
import Icon from "@/ui/static/Icon/Icon"


namespace NavbarMobile {
  const expanded = new StateBoolean(false)

  export function Container(props: { links: { title: string, link: string }[] }) {
    return (
      <nav className="mobile-navbar" mounted={expanded}>
        <Link className="navbar__link" to="/">Home</Link>
        {props.links.map(item => (
          <Link className="navbar__link" to={item.link}>{item.title}</Link>
        ))}
        <hr />
        <Link className="navbar__link" to="/privacy">Privacy Policy</Link>
        <Link className="navbar__link" to="/terms">Terms & Conditions</Link>
        <Link className="navbar__link" to="/cookies">Cookie Policy</Link>
      </nav>
    )
  }

  export function ToggleButton() {
    return (
      <Button color="white" onClick={() => expanded.toggle()}><Icon name="book-read" /> Menu</Button>
    )
  }

  /**
   * Combination with other augmentations are not studied.
   */
  export function useParent(parent: HTMLElement) {
    parent.before(inflator.inflateComponent(NavbarMobile.Container, {
      links: [
        ...__INITIAL_DATA__.CMS.shared.headerLinks,
        ...__INITIAL_DATA__.CMS.shared.footerLinks,
      ]
    }))

    parent.style.borderRadius = "1em"
    parent.style.boxShadow = "-4px 0 12px -4px rgba(0,0,0,0.25)"
    parent.style.transition = "500ms ease transform"

    document.body.style.background = "#f8edff"

    const mobileNavbarCover = inflator.inflate(
      <div
        style={{ position: "absolute", inset: "0", cursor: "pointer", background: "rgba(255,255,255,0.1)" }}
        on={{ click: () => expanded.set(false) }}
      />
    )

    expanded.subscribe(expanded => {
      if (expanded) {
        parent.style.overflow = "hidden"
        parent.style.transform = "translate(15em, 2em)"
        parent.append(mobileNavbarCover)

        document.body.style.overflow = "hidden"
        document.body.parentElement!.style.overflow = "hidden"
      } else {
        parent.style.overflow = ""
        parent.style.transform = ""
        mobileNavbarCover.remove()

        document.body.style.overflow = ""
        document.body.parentElement!.style.overflow = ""
      }
    })
  }
}

export default NavbarMobile

import "./CookiesBanner.scss"

import LocalStorageItem from "@/entities/local-storage/LocalStorageItem"
import Button from "@/ui/kit/Button/Button"
import Icon from "@/ui/static/Icon/Icon"

import loadNonEssentials from "./non-essential"


function CookiesBanner() {
  if (LocalStorageItem.cookieConsent.current) loadNonEssentials()
  LocalStorageItem.cookieConsent.subscribe(x => x && loadNonEssentials())

  return (
    <div className="cookies-banner" classMods={{ hasConsent: LocalStorageItem.cookieConsent.is(x => x != null) }} data-nosnippet>
      <div className="cookies-banner__header">
        <Icon className="cookies-banner__icon" name="cookie" />
        <div className="cookies-banner__buttons">
          <Button onClick={() => LocalStorageItem.cookieConsent.set(false)}>Reject all</Button>
          <Button onClick={() => LocalStorageItem.cookieConsent.set(true)}>Accept all</Button>
        </div>
      </div>
      <p className="cookies-banner__text">
        We use cookies to improve the website and see a picture of our users.

        Essential cookies are always active. Other ones (analytics, ads, social media, personalization) are optional, but we gladly ask you to accept them.
      </p>
    </div>
  )
}

export default CookiesBanner

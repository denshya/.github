function loadGoogleAnalytics() {
  if (!import.meta.env.VITE_GA_MEASUREMENT_ID) return

  const script = document.createElement("script")
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + import.meta.env.VITE_GA_MEASUREMENT_ID
  script.async = true
  document.head.appendChild(script)
}

function loadNonEssentials() {
  gtagConsentAll()
  loadGoogleAnalytics()
}

export default loadNonEssentials


export function gtagConsentAll() {
  // @ts-expect-error new variable in `window`.
  const dataLayer: unknown[] = window.dataLayer ?? []
  // @ts-expect-error new variable in `window`.
  window.dataLayer = dataLayer

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-rest-params
  function gtag(..._args: unknown[]) { dataLayer.push(arguments) }
  gtag("consent", "update", {
    ad_user_data: "granted",
    ad_personalization: "granted",
    ad_storage: "granted",
    analytics_storage: "granted"
  })
}

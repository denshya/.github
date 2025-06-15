import "@/polyfills"
import "@/dev/error-overlay"

import AppRoot from "./app/AppRoot"
import inflator from "./app/inflator"
import getInitialData from "./initial-data"

export { inflator, AppRoot as component, getInitialData }

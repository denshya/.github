import { WebInflator } from "@denshya/proton"

import applyCustomAttributes from "./custom-attributes"

const inflator = new WebInflator
inflator.flags.debug = import.meta.env.DEV

applyCustomAttributes(inflator)

export default inflator


export function inflateRange(nTimes: number, factory: (index: number) => unknown): HTMLElement[] {
  const elements: HTMLElement[] = []
  for (let i = 0; i < nTimes; i++) {
    elements.push(inflator.inflate(factory(i)) as unknown as HTMLElement)
  }
  return elements as never
}

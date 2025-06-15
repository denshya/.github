import CMS from "./cms"

export default async function getInitialData() {
  return {
    CMS: await CMS.fetchData()
  }
}


declare global {
  // eslint-disable-next-line no-var
  var __INITIAL_DATA__: {
    CMS: CMS.Root
  }
}

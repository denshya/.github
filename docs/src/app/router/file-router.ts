import { PathRouter, PathRouterUtils } from "@denshya/router"

import { PageModule } from "./page-module.types"


const config = {
  root: "/src/pages",
  entry: "index"
}

const filePaths = import.meta.glob("@/pages/**/*.tsx", { eager: true })
const fileRouter = new PathRouter<PageModule>

for (const filePath in filePaths) {
  const pattern = PathRouterUtils.patternFromFilePath(filePath.replace(/.tsx$/m, ""), config)
  const resource = filePaths[filePath] as PageModule

  fileRouter.routes.push({ filePath, pattern, resource })
}


export default fileRouter

import router from "./router"
import { configProduct, configUsers, configBlog, configPermission } from "./configTable"

const config = {
  router,
  table: {
    configProduct,
    configUsers,
    configBlog,
    configPermission
  },
}

export default config

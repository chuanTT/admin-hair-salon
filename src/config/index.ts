import router from "./router"
import { configProduct, configUsers, configBlog } from "./configTable"

const config = {
  router,
  table: {
    configProduct,
    configUsers,
    configBlog
  },
}

export default config

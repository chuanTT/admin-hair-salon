import router from "./router"
import { configProduct, configUsers, configBlog, configPermission, configProductSildeShow } from "./configTable"
import { typeObject } from "@/types"

interface objFilter {
  searchValue?: typeObject
  is_deleted?: boolean
}

interface objOther extends objFilter {
  key: string
}

const config = {
  router,
  table: {
    configProduct,
    configUsers,
    configBlog,
    configPermission,
    configProductSildeShow
  },
  filter: {
    user: ({ searchValue, is_deleted }: objFilter) => {
      let obj = {}
      if (searchValue?.user && searchValue?.user !== -1) {
        obj = { ...obj, user_name: searchValue?.user }
      }
      if (searchValue?.full_name && searchValue?.submit) {
        obj = {
          ...obj,
          full_name: searchValue?.full_name
        }
      }

      if (is_deleted) {
        obj = {
          ...obj,
          is_deleted: 1
        }
      }

      return obj
    },

    other: ({ searchValue, is_deleted, key }: objOther) => {
      let obj = {}
      if (searchValue?.user_id && searchValue?.user_id !== -1) {
        obj = {
          ...obj,
          user_id: searchValue?.user_id
        }
      }

      if (searchValue?.[key] && searchValue?.submit) {
        obj = {
          ...obj,
          [key]: searchValue?.[key]
        }
      }

      if (is_deleted) {
        obj = {
          ...obj,
          is_deleted: 1
        }
      }

      return obj
    }
  }
}

export default config

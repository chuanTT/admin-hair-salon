import { getRoles, tableRole } from "@/api/rolesApi"
import { getUser, tableUser } from "@/api/usersApi"
import { configAll, funcKeyRole, funcUserKey } from "@/common/ConfigSelectOption"
import { useFetchingOptionApiProps } from "@/hooks/useFetchingOptionApi"

const configRoleApi: useFetchingOptionApiProps = {
  CallAPi: getRoles,
  nameTable: tableRole,
  customFucKey: funcKeyRole,
  customUrlOption: ({ query, limit, nameTable, page }) => {
    return query?.for(nameTable)?.limit(limit).page(page).sort("1")
  },
  isSearching: true
}

const configUserApi: useFetchingOptionApiProps = {
  nameTable: tableUser,
  CallAPi: getUser,
  isSearching: true,
  customFucKey: funcUserKey
}

const configDeletedApi: useFetchingOptionApiProps = {
  nameTable: "",
  customUrlOption: ({ query, page, limit, nameTable }) => {
    return query?.for(nameTable)?.page(page)?.limit(limit)?.params({
      is_deleted: 1
    })
  }
}

const configUserAllApi: useFetchingOptionApiProps = {
  ...configUserApi,
  isOptionAll: true,
  customOptionAll: ({ data }) => {
    return [configAll(), ...data]
  }
}

const configUserAllTrashApi: useFetchingOptionApiProps = {
  ...configDeletedApi,
  ...configUserAllApi
}

export { configRoleApi, configUserApi, configUserAllApi, configUserAllTrashApi }

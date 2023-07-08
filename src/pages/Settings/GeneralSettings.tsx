import Breadcrumb from "@/components/Breadcrumb"
import FormHandel from "@/components/FormHandel"
import { UpdateCompanyApi, UpdateIcon, UpdateLogo } from "@/api/otherApi"
import SendFormData from "@/components/FormHandel/SendFormData"
import { useProviderSettings } from "@/layout/ProviderSettings"
import UpdateLogoSetting from "@/partials/Settings/UpdateLogoSetting"
import UpdateIconSetting from "@/partials/Settings/UpdateIconSetting"
import UpdateCompany from "@/partials/Settings/UpdateCompany"

const GeneralSettings = () => {
  const { dataSettings, isFetched, invalidateQueriesQueryClient } = useProviderSettings()
  return (
    <Breadcrumb>
      <div className="space-y-4">
        <FormHandel
          callApi={UpdateCompanyApi}
          ClassForm="!rounded"
          sussFuc={() => {
            invalidateQueriesQueryClient && invalidateQueriesQueryClient()
          }}
        >
          {({ propForm, setResertForm, isPending }) => {
            return (
              <UpdateCompany
                company={dataSettings?.company}
                propForm={propForm}
                setResertForm={setResertForm}
                isPending={isPending}
                isFetchedSettings={isFetched}
              />
            )
          }}
        </FormHandel>

        <FormHandel
          callApi={UpdateLogo}
          ClassForm="!rounded"
          customValuesData={(value) => {
            const { logo, ...spread } = value
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let data: any = {
              settings: JSON.stringify(spread)
            }

            if (logo) {
              data = { ...data, logo }
              data = SendFormData(data)
            }

            return data
          }}
          sussFuc={() => {
            invalidateQueriesQueryClient && invalidateQueriesQueryClient()
          }}
        >
          {({ propForm, setResertForm, isPending }) => {
            return (
              <UpdateLogoSetting
                logo={dataSettings?.logo}
                propForm={propForm}
                setResertForm={setResertForm}
                isPending={isPending}
                isFetchedSettings={isFetched}
              />
            )
          }}
        </FormHandel>

        <FormHandel
          callApi={UpdateIcon}
          ClassForm="!rounded"
          customValuesData={(value) => {
            const { icon, ...spread } = value
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let data: any = {
              ...spread
            }

            if (icon) {
              data = { ...data, icon }
              data = SendFormData(data)
            }

            return data
          }}
          sussFuc={() => {
            invalidateQueriesQueryClient && invalidateQueriesQueryClient()
          }}
        >
          {({ propForm, setResertForm, isPending }) => {
            return (
              <UpdateIconSetting
                icon={dataSettings?.icon}
                propForm={propForm}
                setResertForm={setResertForm}
                isPending={isPending}
                isFetchedSettings={isFetched}
              />
            )
          }}
        </FormHandel>
      </div>
    </Breadcrumb>
  )
}

export default GeneralSettings

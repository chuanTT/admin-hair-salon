import Breadcrumb from "@/components/Breadcrumb"
import FormHandel from "@/components/FormHandel"
import useFetchingApi from "@/hooks/useFetchingApi"
import { UpdateLogo, getSettings } from "@/api/otherApi"
import SendFormData from "@/components/FormHandel/SendFormData"
import UpdateIconSetting from "@/partials/Settings/UpdateIconSetting"

const GeneralSettings = () => {
  const { data: dataSettings, isFetched } = useFetchingApi({
    nameTable: "s",
    CallAPi: getSettings
  })
  return (
    <Breadcrumb>
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
      >
        {({ propForm, setResertForm, isPending }) => {
          return (
            <UpdateIconSetting
              logo={dataSettings?.data?.logo}
              propForm={propForm}
              setResertForm={setResertForm}
              isPending={isPending}
              isFetchedSettings={isFetched}
            />
          )
        }}
      </FormHandel>
    </Breadcrumb>
  )
}

export default GeneralSettings

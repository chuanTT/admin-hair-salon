import _ from "lodash"
import { FC, memo, useEffect, useState } from "react"
import Thead from "./Thead"
import Tbody from "./Tbody"
import { TableProps, configProps } from "@/types"
import CustomScrollTable from "../CustomScrollTable"

const Table: FC<TableProps> = ({ configDetail, isFuc, isStt, selectCheck, data, configFuc, provider }) => {
  const [tbody, setTbody] = useState<configProps[] | []>([])

  useEffect(() => {
    if (configDetail) {
      const newArr = [...configDetail]

      const reduceArr: configProps[] | [] = _.reduce(
        newArr,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (t: any, c: any) => {
          if (Array.isArray(c)) c = _.filter(c, "key")
          return _.concat(t, c)
        },
        []
      )

      setTbody(reduceArr)
    }
  }, [configDetail])

  return (
    <CustomScrollTable
      isNoResult={!(data?.data && Array.isArray(data?.data) && data?.data?.length > 0)}
      isFetched={!!provider?.isFetched}
    >
      {(refTable) => {
        return (
          <>
            <table className="table-auto max-md:w-[1100px] md:w-[1200px] lg:w-[1300px] xl:w-full" ref={refTable}>
              <Thead config={configDetail} isFuc={isFuc} isStt={isStt} selectCheck={selectCheck} provider={provider} />
              {provider?.isFetched && (
                <Tbody
                  data={data}
                  render={tbody}
                  selectCheck={selectCheck}
                  isStt={isStt}
                  isFuc={isFuc}
                  configFuc={configFuc}
                  provider={provider}
                />
              )}
            </table>
          </>
        )
      }}
    </CustomScrollTable>
  )
}

export default memo(Table)

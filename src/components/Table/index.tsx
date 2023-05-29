"use client"

import { FC, memo } from "react"
import Thead from "./Thead"
// import { TableProps } from "../Types";
import Tbody from "./Tbody"
import { TableProps } from "@/types"
import CustomScrollTable from "../CustomScrollTable"

const Table: FC<TableProps> = ({ configDetail, isFuc, isStt, selectCheck, data, configFuc, provider }) => {
  return (
    <CustomScrollTable isNoResult={!(data?.data && Array.isArray(data?.data) && data?.data?.length > 0)}>
      {(refTable) => {
        return (
          <table className="table-auto max-md:w-[1100px] md:w-[1200px] lg:w-[1300px] xl:w-full" ref={refTable}>
            <Thead config={configDetail} isFuc={isFuc} isStt={isStt} selectCheck={selectCheck} provider={provider} />
            <Tbody
              data={data}
              config={configDetail}
              selectCheck={selectCheck}
              isStt={isStt}
              isFuc={isFuc}
              configFuc={configFuc}
              provider={provider}
            />
          </table>
        )
      }}
    </CustomScrollTable>
  )
}

export default memo(Table)

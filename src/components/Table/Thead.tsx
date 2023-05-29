import { FC, Fragment, memo } from "react"
import { TypeValue, configProps, selectCheckProps } from "@/types"
interface TheadProps {
  config?: configProps[][]
  isStt?: boolean
  isFuc?: boolean
  selectCheck?: selectCheckProps
  provider?: TypeValue
}

const Thead: FC<TheadProps> = ({ config, isStt, isFuc, selectCheck, provider }) => {
  return (
    <thead className="text-sm font-semibold text-slate-500 bg-slate-50 border-t border-b border-slate-200">
      {config?.map((thead, index) => {
        return (
          <tr className="[&>*]:border [&>*]:border-solid" key={index}>
            {thead?.map((item, i) => {
              const maxThead = thead.length - 1
              const classTh = "px-2 py-3 whitespace-nowrap border border-solid font-semibold text-left "

              return (
                <Fragment key={i}>
                  {i === 0 && index === 0 && selectCheck?.views && (
                    <th className="px-3 py-3 whitespace-nowrap w-px" rowSpan={maxThead}>
                      <div className="flex items-center">
                        <label className="inline-flex">
                          <input
                            className="form-check-input cursor-pointer"
                            type="checkbox"
                            id="defaultCheck1"
                            checked={provider?.listIDs ? provider?.listIDs?.length > 1 : false}
                            onChange={() => {
                              if (provider) {
                                const { data, handelDeleteAll } = provider
                                if(data?.data) {
                                  typeof handelDeleteAll === "function" && handelDeleteAll(data?.data)
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    </th>
                  )}

                  {!isStt && i === 0 && index === 0 && (
                    <th
                      rowSpan={maxThead}
                      className="font-semibold text-left px-3 py-3 whitespace-nowrap border border-solid w-px"
                    >
                      STT
                    </th>
                  )}
                  <th
                    colSpan={item?.col || 1}
                    rowSpan={item?.row || 1}
                    className={`${classTh} ${item?.classCustom || ""}`}
                    {...item?.innerPropsThead}
                  >
                    {item.head}
                  </th>
                  {!isFuc && maxThead === i && index === 0 && (
                    <th
                      rowSpan={maxThead}
                      className="font-semibold text-left px-2 py-3 whitespace-nowrap border border-solid"
                    >
                      Chức năng
                    </th>
                  )}
                </Fragment>
              )
            })}
          </tr>
        )
      })}
    </thead>
  )
}

export default memo(Thead)

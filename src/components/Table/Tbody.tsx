import { FC, Fragment, useEffect, useState, memo } from "react"
import * as _ from "lodash"

// import { configProps, selectCheckProps } from "../Types";
import { RenderValue, STT } from "@/common/functions"
import { LoadValueCustomProps, TbodyProps, configProps, typeElment, typeEvent } from "@/types"
import Button from "../Button"

const LoadValueCustom: FC<LoadValueCustomProps> = ({ data, type, element, current, innerProps }) => {
  if (type) {
    let classStatus = "text-red-600"
    let text = "Không hoạt động"

    if (data === 1 || data === "1" || data) {
      classStatus = "text-green-600"
      text = "Hoạt động"
    }

    return <p className={classStatus}>{text}</p>
  } else if (element && typeof element === "function") {
    const CustomElement: (props: typeElment) => JSX.Element = element
    return <CustomElement data={data} current={current} innerProps={innerProps} />
  } else {
    return <Fragment />
  }
}

const Tbody: FC<TbodyProps> = ({ data, config, selectCheck, isStt, isFuc, configFuc, provider }) => {
  const [tbody, setTbody] = useState<configProps[] | []>([])

  useEffect(() => {
    if (config) {
      const newArr = [...config]

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
  }, [config])

  return (
    <tbody className="text-sm divide-y divide-slate-200 bg-white">
      {Array.isArray(data?.data) &&
        data?.data?.map((items, index) => {
          return (
            <tr key={index} className="[&>*]:border [&>*]:border-solid">
              {tbody &&
                tbody?.length > 0 &&
                tbody.map((item: configProps, i: number) => {
                  const v = RenderValue({
                    key: item?.key,
                    data: items,
                    customValue: item?.customValue,
                    customListValue: item?.customListValue
                  })
                  const maxTbody = tbody.length - 1
                  const classBody = "px-2 py-3 whitespace-nowrap"
                  let idSelect = RenderValue({
                    key: selectCheck?.key || "id",
                    data: items
                  })
                  idSelect = idSelect != "-" ? idSelect : 0

                  return (
                    <Fragment key={i}>
                      {i === 0 && selectCheck?.views && (
                        <td className="px-3 py-3 whitespace-nowrap w-px">
                          <div className="flex items-center">
                            <label className="inline-flex">
                              <input
                                className="form-check-input cursor-pointer"
                                type="checkbox"
                                checked={provider?.listIDs ? provider?.listIDs?.includes(idSelect) : false}
                                onChange={() => {
                                  if (provider) {
                                    const { handelDelete } = provider
                                    if (handelDelete) {
                                      handelDelete(idSelect, true)
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </td>
                      )}
                      {!isStt && i === 0 && (
                        <td className="px-3 py-3 whitespace-nowrap text-center">{STT(data, index)}</td>
                      )}
                      <td key={i} className={`${classBody} ${item?.classBodyCus || ""}`} {...item?.innerPropsBody}>
                        {item?.isCus ? (
                          <LoadValueCustom
                            type={item?.status}
                            data={v}
                            element={item?.element}
                            current={items}
                            innerProps={item?.innerPropChild}
                          />
                        ) : (
                          v
                        )}
                      </td>

                      {!isFuc && i === maxTbody && (
                        <td className="px-2 py-3 whitespace-nowrap w-px">
                          <div className="space-x-3 flex justify-center">
                            {configFuc?.map((item: typeEvent, iFuc: number) => {
                              const { key, isViews, ...rest } = item
                              let id = RenderValue({
                                key: key || "id",
                                data: items
                              })
                              id = id != "-" ? id : 0
                              const checkTo = item?.to ? `${item?.to}/${id}` : ""

                              return (
                                <Fragment key={iFuc}>
                                  {isViews && (
                                    <Button
                                      {...rest}
                                      customIcon={{
                                        type: item?.type,
                                        views: item?.isViews
                                      }}
                                      id={`id-${index}-${i}-${iFuc}`}
                                      to={checkTo}
                                      onClick={(e) => {
                                        item?.onClick &&
                                          typeof item.onClick === "function" &&
                                          item.onClick({ id, e, provider })
                                      }}
                                    />
                                  )}
                                </Fragment>
                              )
                            })}
                          </div>
                        </td>
                      )}
                    </Fragment>
                  )
                })}
            </tr>
          )
        })}
    </tbody>
  )
}

export default memo(Tbody)

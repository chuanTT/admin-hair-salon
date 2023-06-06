import { FC, Fragment } from "react"
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

const Tbody: FC<TbodyProps> = ({ data, render, selectCheck, isStt, isFuc, configFuc, provider }) => {
  return (
    <tbody className="text-sm divide-y divide-slate-200 bg-white">
      {Array.isArray(data?.data) &&
        data?.data?.map((items, index) => {
          return (
            <tr key={index} className="[&>*]:border [&>*]:border-solid">
              {render &&
                render?.length > 0 &&
                render.map((item: configProps, i: number) => {
                  const v = RenderValue({
                    key: item?.key,
                    data: items,
                    customValue: item?.customValue,
                    customListValue: item?.customListValue
                  })
                  const maxTbody = render.length - 1
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
                              const { key, isViews, isCus, element, ...rest } = item
                              let id = RenderValue({
                                key: key || "id",
                                data: items
                              })
                              id = id != "-" ? id : 0
                              const checkTo = item?.to ? `${item?.to}/${id}` : ""
                              const Element = element
                              return (
                                <Fragment key={iFuc}>
                                  {isViews && (
                                    <>
                                      {!isCus && !Element && (
                                        <Button
                                          {...rest}
                                          customIcon={{
                                            type: item?.type,
                                            views: item?.isViews
                                          }}
                                          id={`id-${index}-${i}-${iFuc}`}
                                          to={checkTo}
                                          isToolTips
                                          onClick={(e) => {
                                            item?.onClick &&
                                              typeof item.onClick === "function" &&
                                              item.onClick({ id, e, provider, data: items })
                                          }}
                                        />
                                      )}

                                      {isCus && Element && (
                                        <Element
                                          {...rest}
                                          customIcon={{
                                            type: item?.type,
                                            views: item?.isViews
                                          }}
                                          id={`id-${index}-${i}-${iFuc}`}
                                          to={checkTo}
                                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                          onClick={(e: any) => {
                                            item?.onClick &&
                                              typeof item.onClick === "function" &&
                                              item.onClick({ id, e, provider })
                                          }}
                                          items={id}
                                        />
                                      )}
                                    </>
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

export default Tbody

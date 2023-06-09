import { NavLink, NavLinkProps } from "react-router-dom"
import { FC, ComponentType, Fragment, HTMLAttributes } from "react"
import { TbTrashFilled } from "react-icons/tb"
import { MdLockReset, MdModeEditOutline } from "react-icons/md"
import ToolTip, { ToolTipProps } from "../ToolTips"
import { defaultProps } from "@/types"
import { LoadingIcon } from "../Icon"
import { BsImages } from "react-icons/bs"
import { FaUndoAlt } from "react-icons/fa"

export enum iconTypeEvent {
  edit = "edit",
  delete = "delete",
  viewsImage = "views_images",
  restore = "restore",
  reset = "reset"
}

interface iconConfig {
  type?: iconTypeEvent
  icon?: () => JSX.Element
  w?: number
  h?: number
  views?: boolean
}

export interface ButtonProps extends ToolTipProps, defaultProps, HTMLAttributes<HTMLElement> {
  tag?:
    | keyof JSX.IntrinsicElements
    | ComponentType
    | React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>
  to?: string
  href?: string
  customClass?: string
  isToolTips?: boolean
  wIcon?: number
  hIcon?: number
  isPending?: boolean
  customIcon?: iconConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void
}

const LoadIcon = ({ customIcon }: { customIcon: iconConfig }) => {
  let Icon
  const { type } = customIcon

  switch (type) {
    case iconTypeEvent.edit:
      Icon = MdModeEditOutline
      break

    case iconTypeEvent.delete:
      Icon = TbTrashFilled
      break
    case iconTypeEvent.viewsImage:
      Icon = BsImages
      break
    case iconTypeEvent.restore:
      Icon = FaUndoAlt
      break
    case iconTypeEvent.reset:
      Icon = MdLockReset
      break
  }

  if (!Icon) {
    return <Fragment />
  }

  return <Icon />
}

const Button: FC<ButtonProps> = ({
  tag,
  to,
  href,
  customClass,
  onClick,
  id,
  content,
  position,
  isToolTips,
  children,
  isPending,
  customIcon,
  ...rest
}) => {
  let Comp = tag ?? "button"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any = {
    ...rest,
    onClick
  }

  if (to) {
    Comp = NavLink
    props = { ...props, to }
  } else if (href) {
    Comp = "a"
    props = { ...props, href }
  }

  if (id) {
    props = { ...props, id }
  }

  return (
    <Comp
      className={`rounded-full flex justify-center items-center ${
        isPending ? "opacity-50 cursor-default" : "cursor-pointer"
      } ${customClass ?? ""}`}
      disabled={isPending}
      {...props}
    >
      {isToolTips && <ToolTip id={id} content={content} position={position} />}
      {isPending && (
        <span className={`block ${children ? "mr-2" : ""} mr-2`}>
          <LoadingIcon isSpin={isPending} />
        </span>
      )}
      {customIcon?.views && <LoadIcon customIcon={customIcon} />}
      {children}
    </Comp>
  )
}

export default Button

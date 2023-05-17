import { FC } from "react"
import { Tooltip as ReacToolTip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"

export enum positionType {
  BOTTOM = "bottom",
  TOP = "top",
  RIGHT = "right",
  LEFT = "left"
}

export interface ToolTipProps {
  id?: string
  content?: string
  position?: positionType
}

const ToolTip: FC<ToolTipProps> = ({ id, content, position }) => {
  return <ReacToolTip anchorId={id} content={content} place={position ?? positionType.TOP} />
}

export default ToolTip

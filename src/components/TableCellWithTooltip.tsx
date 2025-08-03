import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { TableCell } from "./ui/table"

interface Props {
  text: React.ReactNode
  tooltip: string,
}

export const TableCellWithTooltip = ({ tooltip, text }: Props) => {
  return (
    <TableCell>
      <div className="flex items-center gap-1">
        {text}
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-pointer">
                <Info className="w-4 h-4 text-muted-foreground" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TableCell>
  )
}


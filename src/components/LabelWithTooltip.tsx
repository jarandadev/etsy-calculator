import { Info } from "lucide-react"
import { Label } from "./ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { TableHead } from "./ui/table"

interface Props {
  label: string
  tooltip?: string
}

export const LabelWithTooltip = ({ label, tooltip }: Props) => {
  return (
      <div className="flex items-center gap-1">
        <Label>{label}</Label>
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
  )
}


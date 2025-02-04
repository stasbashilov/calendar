import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";
import React from "react";

interface CustomTooltipProps extends TooltipProps {
  maxWidth?: string | number;
}

const CustomWidthTooltip: React.FC<CustomTooltipProps> = ({
  maxWidth = 500,
  ...props
}) => {
  return (
    <MuiTooltip
      {...props}
      slotProps={{
        tooltip: {
          sx: {
            maxWidth: maxWidth,
          },
        },
      }}
    />
  );
};

export default CustomWidthTooltip;

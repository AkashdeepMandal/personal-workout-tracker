import { List, styled } from "@mui/material";

export const SideBarNav = styled(List)({
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 12,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
  "& .MuiListSubheader-root": {
    lineHeight: 1.2,
  },
});

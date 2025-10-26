"use client";
import React from "react";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ButtonBase,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "../../lib/store";

export default function Navbar({ onMenu }: { onMenu: () => void }) {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchor);
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const token = useSelector((s: RootState) => s.auth.token);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#86937F",
        color: "#fff",
        borderRadius: 0,
        zIndex: (t) => t.zIndex.drawer + 1, // ensure above sidebar
      }}
    >
      <Toolbar sx={{ minHeight: 64, gap: 1 }}>
        <IconButton onClick={onMenu} edge="start" sx={{ color: "#fff" }}>
          <Image alt="menu" src="/menu.png" width={24} height={24} />
        </IconButton>

        {/* push everything else to the right */}
        <Box sx={{ flex: 1 }} />

        {/* right-side icons */}
        <IconButton sx={{ color: "#fff" }}>
          <Image alt="bug" src="/bug.png" width={28} height={28} />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <Image alt="bell" src="/bell.png" width={28} height={28} />
        </IconButton>
        <IconButton sx={{ color: "#fff" }}>
          <Image alt="settings" src="/gear.png" width={28} height={28} />
        </IconButton>

        {/* avatar (kept for look; does not open menu) */}
        <IconButton sx={{ ml: 1 }}>
          <Avatar src="/user.png" sx={{ width: 32, height: 32 }} />
        </IconButton>

        {token && (
          <>
            <ButtonBase
              onClick={(e) => setAnchor(e.currentTarget)}
              sx={{
                py: 0.5,
                borderRadius: 1,
                color: "inherit",
                display: "inline-flex",
                alignItems: "center",
                "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, letterSpacing: 0.2, mr: 0.25 }}
              >
                Admin Realseo Test
              </Typography>
              <KeyboardArrowDownIcon fontSize="small" />
            </ButtonBase>
            <Menu
              anchorEl={anchor}
              open={menuOpen}
              onClose={() => setAnchor(null)}
              PaperProps={{
                sx: {
                  minWidth: 0,
                  width: 120,
                  borderRadius: 1,
                  "& .MuiMenu-list": { p: 0.25 },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setAnchor(null);
                  dispatch(logout());
                  router.push("/login");
                }}
                sx={{
                  px: 1,
                  py: 0.5,
                  minHeight: 30,
                  fontSize: 14,
                  lineHeight: 1.3,
                  textAlign: "center",
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

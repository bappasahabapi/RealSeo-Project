"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import GroupIcon from "@mui/icons-material/Group";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { logout } from "../state/authSlice";
import { Box, useMediaQuery } from "@mui/material";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
  { href: "/account-managers", label: "Account Managers", icon: <GroupIcon fontSize="small" /> },
  { href: "/tasks", label: "Tasks", icon: <AssignmentIcon fontSize="small" /> },
  { href: "/sales-team", label: "Sales Team", icon: <PhoneIphoneIcon fontSize="small" /> },
  { href: "/vendors", label: "Vendors", icon: <GroupIcon fontSize="small" /> },
  { href: "/clients", label: "Clients", icon: <PeopleIcon fontSize="small" /> },
  { href: "/settings", label: "Settings", icon: <SettingsIcon fontSize="small" /> },
];

export default function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((s: RootState) => s.auth.token);

  // <=900px => behave as an overlay drawer that does not take layout space
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box
      className="sidebar"
      sx={{
        // desktop: regular fixed-width side rail
        // mobile: overlay (off-canvas) that slides in, takes no space when closed
        position: isMobile ? "fixed" : "relative",
        zIndex: isMobile ? 1200 : "auto",
        top: isMobile ? 64 : "auto",      // below the navbar
        bottom: isMobile ? 0 : "auto",
        left: 0,

        width: 240,
        transform: isMobile ? (open ? "translateX(0)" : "translateX(-260px)") : "none",
        transition: "transform .25s ease, padding .2s ease, border-color .2s ease",

        // when closed on mobile, ignore pointer events so it doesn’t block clicks
        pointerEvents: isMobile && !open ? "none" : "auto",
        boxShadow: isMobile && open ? 3 : 0,

        // base visual styles (match your existing)
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "12px 8px",
        borderRight: isMobile ? "0" : "1px solid #e5e7eb",
        overflow: "hidden",
      }}
    >
      <div className="logo">
        <img src="/logo.png" alt="logo" width="200" />
      </div>

      {items.map((i) => {
        const active = pathname.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href as any} className={active ? "active" : ""}>
            {i.icon}
            <span>{i.label}</span>
          </Link>
        );
      })}

      {/* {token && (
        <button
          className="btn"
          onClick={() => {
            dispatch(logout());
            router.push("/login");
          }}
        >
          Logout
        </button>
      )} */}
    </Box>
  );
}

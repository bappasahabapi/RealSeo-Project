"use client";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "../state/authSlice";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

export default function AppShell({
  children,
  title,
  crumb,
}: {
  children: React.ReactNode;
  title: string;
  crumb?: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) router.push("/login");
    else dispatch(setToken(t));
  }, [router, dispatch]);

  return (
    <div className="content">
      <Sidebar open={open} />
      <div className="main" style={{ minWidth: 0 }}>
        <Navbar onMenu={() => setOpen((v) => !v)} />
        <div className="page">
          <div className="breadcrumbs">
            Dashboard {crumb ? " > " + crumb : ""}
          </div>
          <br />
          {children}
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </div>
  );
}

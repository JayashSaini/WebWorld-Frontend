import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/slidebar";
import {
  IconArrowLeft,
  IconCertificate,
  IconNotebook,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import { cn } from "../lib/utils";
import weblogoicon from "../assets/weblogoicon.png";
import weblogo from "../assets/weblogo.svg";
import { useAuth } from "../context/auth.context";

function DashboardLayout() {
  const { logout } = useAuth();
  const links = [
    {
      label: "Courses",
      href: "/dashboard/courses",
      icon: <IconCertificate className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Blogs",
      href: "/dashboard/blogs",
      icon: <IconNotebook className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "My Blgos",
      href: "/dashboard/my-blogs",
      icon: <IconUserBolt className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <IconUserBolt className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 flex-shrink-0" />,
      onClick: async () => {
        await logout();
      },
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "w-full h-screen rounded-md flex flex-col md:flex-row   flex-1  overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Hello world",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="w-full h-screen overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center  py-1 relative z-20"
    >
      <img src={weblogo} alt="" className="w-[130px]" />
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center  py-1 relative z-20"
    >
      <img src={weblogoicon} alt="" className="w-[30px] h-[18px]" />
    </Link>
  );
};

export default DashboardLayout;

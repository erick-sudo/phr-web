import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { RxAccessibility } from "react-icons/rx";
import { CiStethoscope } from "react-icons/ci";
import ThemeSurface from "./ThemeSurface";
import { AuthContext } from "./context/AuthContext";
import {
  DashboardOutlined,
  LockClockOutlined,
  LogoutOutlined,
  PersonOffOutlined,
} from "@mui/icons-material";
import HoverFade from "./HoverFade";
import { useNavigate } from "react-router";

function TopNavigationBar({ setShowSideNav }) {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", icon: <DashboardOutlined />, title: "Dashboard" },
    { path: "/profile", icon: <PersonOffOutlined />, title: "Profile" },
    { path: "/logout", icon: <LogoutOutlined />, title: "Logout" },
    { path: "/patients", icon: <RxAccessibility />, title: "Patients" },
    { path: "/doctors", icon: <CiStethoscope />, title: "Doctors" },
    {
      path: "/appointments",
      icon: <LockClockOutlined />,
      title: "Appointments",
    },
  ];

  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <div className="flex items-center gap-2 min-w-[12rem]">
        {/* <div className="h-10 w-10 rounded-[40px] border border-emerald-500/50 flex items-center justify-center">
          <img className="" src={images.logo} alt="logo" />
        </div> */}
        <h4 className="font-bold text-emerald-900">
          PHR
          {/* Personal
          <br />
          Health
          <br />
          Record */}
        </h4>
      </div>
      <div className="flex">
        <ThemeSurface
          onClick={() => setShowSideNav((n) => !n)}
          className="py-3 px-3 flex justify-center items-center rounded-lg"
        >
          <FontAwesomeIcon className="" icon={faBars} />
        </ThemeSurface>
      </div>
      {/* <Search className="bg-emerald-700/5" /> */}
      <div className="flex grow justify-end items-center gap-4">
        {/* <ThemeSurface className="p-1 rounded-lg">
          <BellIcon height={30} />
        </ThemeSurface> */}
        <div className="flex gap-6 items-center justify-end">
          <div className="flex flex-col items-center group">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2022/07/12/09/11/woman-7316856_640.jpg"
              />
            </div>
            <h4 className="font-bold text-emerald-900">{userInfo?.name}</h4>
            <div className="relative">
              <div className="hidden group-hover:grid absolute w-64 right-0 grid-cols-2 gap-2 p-2 z-50 bg-gray-100 shadow-lg rounded">
                {navItems.map((item, idx) => (
                  <HoverFade
                    onClick={() =>
                      item.path === "/logout" ? logout() : navigate(item.path)
                    }
                    className="flex flex-col items-center bg-[#fff] shadow-md py-4"
                    key={idx}
                  >
                    <div>{item.icon}</div>
                    <div>{item.title}</div>
                  </HoverFade>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-6 px-6">
            <h4 className="font-bold text-emerald-900 border-1 border-emerald-700 bg-emerald-700/10 px-4 py-1 rounded-full">
              {userInfo?.email}
            </h4>
            <h4 className="font-bold text-emerald-900 border-1 border-emerald-700 bg-emerald-700/10 px-4 py-1 rounded-full">
              {userInfo?.role}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavigationBar;

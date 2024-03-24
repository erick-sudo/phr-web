import React, { useContext } from "react";
import { images } from "../assets/images/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import ThemeSurface from "./ThemeSurface";
import { AuthContext } from "./context/AuthContext";

function TopNavigationBar({ setShowSideNav }) {
  const { userInfo } = useContext(AuthContext);

  console.log(userInfo)

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
      <div className="flex grow items-center justify-end gap-4">
        <ThemeSurface className="p-1 rounded-lg">
          <BellIcon height={30} />
        </ThemeSurface>
        <ThemeSurface className="flex border p-2 pr-4 rounded-full gap-3 items-center bg-emerald-700/10">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://cdn.pixabay.com/photo/2022/07/12/09/11/woman-7316856_640.jpg"
            />
          </div>
          <div className="">
            <Cog6ToothIcon height={30} className="" />
          </div>
        </ThemeSurface>
      </div>
    </div>
  );
}

export default TopNavigationBar;

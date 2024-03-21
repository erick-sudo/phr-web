import React, { useState, useContext } from "react";
import HoverFade from "./HoverFade";
import { Accordion } from "react-bootstrap";
import { RxAccessibility } from "react-icons/rx";
import { CiStethoscope } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";
import { AuthContext } from "./context/AuthContext";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  RectangleStackIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

export function CustomToggle({ className, children, eventKey, host }) {
  const [on, setOn] = useState(false);
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setOn((n) => !n);
  });

  const Toggler = host;

  return (
    <>
      {typeof Toggler === "function" ? (
        <Toggler
          className={`${className} flex items-center`}
          type="button"
          onClick={decoratedOnClick}
        >
          {children}
          <div className="flex-grow justify-end px-2">
            {on ? (
              <ChevronDownIcon height={12} />
            ) : (
              <ChevronUpIcon height={12} />
            )}
          </div>
        </Toggler>
      ) : (
        <button
          className={`${className} flex items-center`}
          type="button"
          onClick={decoratedOnClick}
        >
          {children}
          <div className="flex-grow justify-end px-2">
            {on ? (
              <ChevronDownIcon height={12} />
            ) : (
              <ChevronUpIcon height={12} />
            )}
          </div>
        </button>
      )}
    </>
  );
}

export function CustomAccordion({
  toggleContent,
  toggleClassName,
  children,
  toggler,
}) {
  return (
    <Accordion flush>
      <CustomToggle eventKey="0" host={toggler} className={toggleClassName}>
        {toggleContent}
      </CustomToggle>
      <Accordion.Collapse eventKey="0">{children}</Accordion.Collapse>
    </Accordion>
  );
}

function SideNavigationBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <div className="grid gap-4 pl-2">
        <div className="border-b border-emerald-600/50 py-2">
          <HoverFade
            onClick={() => navigate("/")}
            className="px-4 py-2 flex items-center gap-3 rounded-md"
          >
            <RectangleStackIcon height={14} />
            <span>Dashboard</span>
          </HoverFade>
        </div>
        <CustomAccordion
          toggleClassName="px-4 py-2 flex items-center gap-3 rounded-md w-full"
          toggler={HoverFade}
          toggleContent={
            <>
              <UserCircleIcon height={14} />
              <span className="">Account</span>
            </>
          }
        >
          <div className="pl-8 border-b border-emerald-600/50 flex">
            <div className="px-2 border-l border-emerald-600/50"></div>
            <div>
              <NavLink
                className="flex items-center gap-2 py-2 hover:text-emerald-700 group"
                to=""
              >
                <span className="bg-black h-[2px] w-[5px] rounded-full group-hover:bg-emerald-700"></span>
                <span>Profile</span>
              </NavLink>
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 py-2 hover:text-emerald-700 group"
                to=""
              >
                <span className="bg-black h-[2px] w-[5px] rounded-full group-hover:bg-emerald-700"></span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </CustomAccordion>

        <div className="grid gap-2 border-b border-emerald-600/50 py-4">
          <HoverFade
            onClick={() => navigate("/patients")}
            className="flex items-center rounded-md py-2 px-4 gap-3"
          >
            <RxAccessibility />
            <span className="">Patients</span>
          </HoverFade>

          <HoverFade
            onClick={() => navigate("/doctors")}
            className="flex items-center rounded-md py-2 px-4 gap-3"
          >
            <CiStethoscope />
            <span className="">Doctors</span>
          </HoverFade>

          <HoverFade
            onClick={() => navigate("/appointments")}
            className="flex items-center rounded-md py-2 px-4 gap-3"
          >
            <IoIosTimer />
            <span className="">Appointments</span>
          </HoverFade>
        </div>
      </div>
    </div>
  );
}

export default SideNavigationBar;

import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineBank,
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineLogout,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      title: "Home",
      icon: <AiOutlineHome />,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <AiOutlineBank />,
      onClick: () => navigate("/transcations"),
      path: "/transcations",
    },
    {
      title: "Requests",
      icon: <BiHelpCircle />,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },

    {
      title: "Logout",
      icon: <AiOutlineLogout />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout",
    },
  ];
  const adminMenu = [
    {
      title: "Home",
      icon: <AiOutlineHome />,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Users",
      icon: <AiOutlineUsergroupAdd />,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <AiOutlineBank />,
      onClick: () => navigate("/transcations"),
      path: "/transcations",
    },
    {
      title: "Requests",
      icon: <BiHelpCircle />,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },

    {
      title: "Logout",
      icon: <AiOutlineLogout />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout",
    },
  ];
  const menuToRender = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="layout flex h-screen gap-4 p-4 w-full bg-[#6cc1bd5a]">
      <div className="sidebar bg-cus1 p-4 h-full rounded-sm flex items-center">
        <div className="menu flex flex-col gap-4 ">
          {menuToRender.map((item) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                className="menu-item cursor-pointer flex text-cus5 text-3xl p-5 hover:text-cus3"
                onClick={item.onClick}
              >
                {item.icon}
                {!collapsed && <h1 className="text-lg">{item.title}</h1>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body w-full">
        <div className="header bg-cus1 p-4 w-full rounded-sm flex justify-between items-center">
          <div
            className="flex text-cus4 cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            {!collapsed && <AiOutlineClose />}
            {collapsed && <AiOutlineMenu />}
          </div>
          <div>
            <h1 className="text-xl text-cus4">Fast Pay</h1>
          </div>
          <div>
            <h1 className="text-sm uppercase text-cus4 underline">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="content  pt-4">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const URL = "https://67092a6aaf1a3998baa09cc6.mockapi.io/users";
  const [usersInfo, setusersInfo] = useState([]);

  const getUsersInfo = () => {
    axios
      .get(`${URL}/${localStorage.getItem("userId")}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setusersInfo(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getUsersInfo();
  }, []);

  return (
    <div className="navbar bg-purple-900 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            
            {usersInfo.usertype == "user" ? (
              <>
                <li>
                  <Link to="/user-home">الرئيسية</Link>
                </li>

                <li>
                  <Link to="/user-profile">أفكاري</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/home">الرئيسية</Link>
                </li>

                <li>
                  <Link to="/students">الطلاب</Link>
                </li>
              </>
            )}
            <div className="divider py-0 my-0"></div>
            <div className="flex w-full justify-start items-center h-8 px-0">
              <div role="button" className="btn btn-ghost btn-circle">
                <div className="w-7 h-7 min-h-7 rounded-full bg-white flex justify-center items-center">
                  <img
                    alt="user icon"
                    className="w-[70%] h-[70%]"
                    src={`${
                      usersInfo.usertype == "user"
                        ? "https://cdn-icons-png.freepik.com/256/16568/16568321.png?uid=R162205891&ga=GA1.1.1807813655.1726087175"
                        : "https://cdn-icons-png.freepik.com/256/13648/13648582.png?uid=R162205891&ga=GA1.1.1807813655.1726087175"
                    }`}
                  />
                </div>
              </div>
              <p className="text-sm">{usersInfo.name}</p>
            </div>
            <li>
              <div className="flex justify-center items-center">
                <Link to="/signin" className="text-red-700">
                  تسجيل الخروج
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-14 h-12 flex justify-center items-center">
            <img
              className="h-full"
              src="https://cdn-icons-png.freepik.com/512/17043/17043983.png"
            />
          </div>
          <p className="font-bold text-white text-xl ml-5">فكرة</p>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {usersInfo.usertype == "user" ? (
                <>
                  <li>
                    <Link to="/user-home">الرئيسية</Link>
                  </li>

                  <li>
                    <Link to="/user-profile">أفكاري</Link>
                  </li> 
                </>
              ) : (
                <>
                  <li>
                    <Link to="/home">الرئيسية</Link>
                  </li>

                  <li>
                    <Link to="/students">الطلاب</Link>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>

      <div className="hidden lg:flex navbar-end ml-3 gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost px-4">
            <div className="w-9 h-9 min-h-9 rounded-full bg-gray-100 flex justify-center items-center">
              <img
                alt="user icon"
                className="w-[80%] h-[80%]"
                src={`${
                  usersInfo.usertype == "user"
                    ? "https://cdn-icons-png.freepik.com/256/16568/16568321.png?uid=R162205891&ga=GA1.1.1807813655.1726087175"
                    : "https://cdn-icons-png.freepik.com/256/13648/13648582.png?uid=R162205891&ga=GA1.1.1807813655.1726087175"
                }`}
              />
            </div>
            <p className="text-sm">{usersInfo.name}</p>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-36 p-2 shadow-white shadow-sm"
          >
            <li>
              <div className="flex justify-center items-center">
                <Link to="/signin" className="text-red-700">
                  تسجيل الخروج
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;

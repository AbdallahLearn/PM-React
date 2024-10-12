import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

import axios from "axios";

function Students() {
  const URL = "https://67092a6aaf1a3998baa09cc6.mockapi.io/users";
  const [searchValue, setSearchValue] = useState("");
  const [usersInfo, setusersInfo] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const getUsersInfo = () => {
    axios
      .get(URL)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setusersInfo(response.data.filter((user)=>user.usertype == "user"));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const searchedUser = usersInfo.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDeleteButton = (id) => {
    axios.delete(`${URL}/${id}`).then((response) => {
      console.log(response);
      getUsersInfo();
      document.getElementById("deleteModal").close();
      setUserDetails(null);
    });
  };
  
  useEffect(() => {
    getUsersInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center my-3 gap-5">
        <div className="flex justify-between items-center w-[60%] max-sm:flex-col max-sm:gap-4 max-sm:w-[95%]">
          <h1 className="font-bold text-3xl text-white">الطلاب المسجلين</h1>
          <div className="flex justify-end items-center gap-2 max-sm:w-[60%] max-sm:justify-center max-md:w-[40%] w-[45%]">
            <label className="input input-bordered flex items-center gap-2 rounded-full max-sm:w-[90%] w-[90%]">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                className="grow max-sm:w-[90%] w-[80%]"
                placeholder="البحث عن طالب"
              />
              {searchValue == "" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="#9ca3af"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </label>
            {searchValue !== "" && (
              <button
                onClick={() => setSearchValue("")}
                className="btn w-11 h-11 min-h-11 btn-circle bg-purple-900 border-none shadow-none hover:bg-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M280-80q-83 0-141.5-58.5T80-280q0-83 58.5-141.5T280-480q83 0 141.5 58.5T480-280q0 83-58.5 141.5T280-80Zm544-40L568-376q-12-13-25.5-26.5T516-428q38-24 61-64t23-88q0-75-52.5-127.5T420-760q-75 0-127.5 52.5T240-580q0 6 .5 11.5T242-557q-18 2-39.5 8T164-535q-2-11-3-22t-1-23q0-109 75.5-184.5T420-840q109 0 184.5 75.5T680-580q0 43-13.5 81.5T629-428l251 252-56 56Zm-615-61 71-71 70 71 29-28-71-71 71-71-28-28-71 71-71-71-28 28 71 71-71 71 28 28Z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto w-[60%] max-sm:w-[95%]">
          <table className="table bg-gray-700 rounded-xl text-white overflow-hidden">
            <tbody>
              {
                searchedUser.length > 0 ? (
                  searchedUser.map((user, index) => {
                    return (
                      <tr key={index} className="hover:bg-gray-600">
                        <td className="w-[90%]">
                          <div className="flex justify-start items-center gap-3">
                            <div className="w-8 h-8 min-h-8 rounded-full bg-white flex justify-center items-center">
                              <img
                                alt="user icon"
                                className="w-[70%] h-[70%]"
                                src="https://cdn-icons-png.freepik.com/256/16568/16568321.png?uid=R162205891&ga=GA1.1.1807813655.1726087175"
                              />
                            </div>
                            <div className="flex flex-col ">
                              <p>{user.name}</p>
                              <p className="text-[0.7rem] text-gray-300">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="w-[10%]">
                          <div className="dropdown dropdown-left">
                            <div className="btn w-10 h-10 min-h-10 btn-circle bg-transparent border-none shadow-none hover:bg-gray-400">
                            
                                <button
                                  onClick={() => {
                                    setUserDetails(user),
                                      document
                                        .getElementById("deleteModal")
                                        .showModal();
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#b91c1c"
                                  >
                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                  </svg>
                                </button>   
                                </div>                           
                          </div>
                          {userDetails && (
                            <dialog
                              id="deleteModal"
                              className="modal modal-bottom sm:modal-middle overflow-x-hidden z-50"
                            >
                              <div className="modal-box shadow-gray-400 shadow-sm">
                                <p className="py-4 text-center text-lg">
                                  هل أنت متأكد من حذف الطالب  {"  "}
                                  <span className="font-bold">{userDetails.name}</span>
                                  ؟
                                </p>
                                <div className="flex justify-center items-center pt-8 gap-3">
                                  <button
                                    onClick={() => handleDeleteButton(userDetails.id)}
                                    className="btn w-20 text-white bg-red-700 hover:bg-gray-400"
                                  >
                                    حذف
                                  </button>
                                  <button
                                    onClick={() =>
                                      document
                                        .getElementById("deleteModal")
                                        .close()
                                    }
                                    className="btn w-20 text-white bg-gray-600 hover:bg-gray-400"
                                  >
                                    إلغاء
                                  </button>
                                </div>
                              </div>
                              <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                              </form>
                            </dialog>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p className="text-center text-xl py-4">لايوجد طلاب لعرضهم</p>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Students;
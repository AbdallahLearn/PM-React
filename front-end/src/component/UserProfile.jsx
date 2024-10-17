import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function UserProfile() {
  const url = "http://localhost:4000/api/all-ideas";
  const userURL = "http://localhost:4000/api/users/user/";
  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [users, setUsers] = useState({});
  const [idea, setIdea] = useState("");
  const [displayIdea, setDisplayIdea] = useState("none");
  const [showModal, setShowModal] = useState(false);

  const getIdeas = () => {
    axios
      .get(userURL + id)
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
      navigate("/signin");
    }
    getIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitIdea = () => {
    if (users._id === id && idea.trim() !== "") {
      axios
        .post(
          url,
          { idea: idea },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          getIdeas();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const submitDel = () => {
    if (users._id === id && users.ideas) {
      axios
        .patch(`${url}/${users.ideas._id}`, {
          idea: " ", // Clear the idea if needed
          status: "rejected",
        })
        .then((response) => {
          console.log(response);
          getIdeas();
        })
        .catch((error) => {
          console.log(
            "Error deleting idea:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  let bgCard;
  let state;

  if (users.ideas?.status === "accepted") {
    bgCard = "rgba(21, 128, 61, 1)";
    state = "مقبولة";
  } else if (users.ideas?.status === "rejected") {
    bgCard = "rgba(156, 163, 175, 1)";
    state = "مرفوضة";
  } else if (users.ideas?.status === "edited") {
    bgCard = "rgba(0, 0, 255, 1)";
    state = "معدلة";
  } else {
    bgCard = "rgba(156, 163, 175, 1)";
    state = "معلقة";
  }

  let display =
    users.ideas?.idea && users.ideas.idea.trim() !== "" ? "block" : "none";
  let addUpdate =
    users.ideas?.idea && users.ideas.idea.trim() !== ""
      ? "تعديل الفكرة"
      : "إضافة فكرة جديدة +";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center">
        <div className="container mx-auto py-10">
          <div className="mb-10">
            <div className="flex justify-center lg:justify-start items-center">
              <h1
                onClick={() => setDisplayIdea("")}
                className="text-2xl rounded-lg bg-white text-black w-fit p-3 font-semibold cursor-pointer hover:bg-slate-200"
              >
                {addUpdate}
              </h1>
            </div>

            <div
              className="flex justify-center items-center w-screen h-screen absolute top-0 right-0 z-10"
              style={{ display: displayIdea }}
            >
              <div className="w-full md:w-3/4 lg:w-1/2 shadow-gray-400 shadow-sm bg-base-100 p-10 rounded-lg">
                <div>
                  <textarea
                    onChange={(e) => setIdea(e.target.value)}
                    value={idea}
                    className="p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gray-500 break-words resize-none text-xl text-white mb-3"
                    rows={2}
                    placeholder="اكتب الفكرة ..."
                  ></textarea>
                </div>
                <div className="card-actions flex justify-center items-center pt-8 gap-3">
                  <button
                    onClick={() => setDisplayIdea("none")}
                    className="btn text-xl text-white"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={submitIdea}
                    className="btn bg-green-700 text-xl text-white"
                  >
                    إرسال
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 grid-flow-row gap-10 justify-items-center content-center">
            <div className="w-full flex justify-center items-center md:w-3/4 lg:w-1/2">
              <div className="relative w-96">
                <div
                  className="card-body rounded-lg bg-gray-200 h-full text-black border-t-[2rem] "
                  style={{ borderTopColor: bgCard, display }}
                >
                  <p
                    className="absolute -top-12 left-2 text-[0.9rem] w-full p-3 text-left overflow-auto text-xl font-semibold my-10"
                    // style={{ backgroundColor: bgCard }}
                  >
                    {state}
                  </p>
                  <h2 className="card-title text-2xl">{users.name}</h2>

                  <p
                    className="w-full p-3 text-center text-2xl font-bold mt-10"
                    style={{
                      // backgroundColor: bgCard,
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {users.ideas?.idea}
                  </p>

                  <div
                    className="card-actions flex justify-center items-center"
                    // style={{ backgroundColor: bgCard }}
                  >
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-24 btn mt-14 border-none bg-red-700 text-lg text-white"
                    >
                      حذف
                    </button>

                    {showModal && (
                      <dialog
                        className="modal modal-bottom sm:modal-middle z-50"
                        open
                      >
                        <div className="modal-box">
                          <p className="py-4 text-center text-white text-lg">
                            هل أنت متأكد أنك تريد حذف هذه الفكرة؟
                          </p>
                          <div className="flex justify-center items-center p-10 gap-3">
                            <button
                              onClick={submitDel}
                              className="btn w-20 text-white bg-red-700 hover:bg-gray-400"
                            >
                              حذف
                            </button>
                            <button
                              onClick={() => setShowModal(false)}
                              className="btn w-20 text-white bg-gray-600 hover:bg-gray-400"
                            >
                              إلغاء
                            </button>
                          </div>
                        </div>
                      </dialog>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

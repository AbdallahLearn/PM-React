import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
export default function UserHome() {
  // URl From The Api //
  const url = "https://pm-react.onrender.com/api/all-ideas";
  //=== URl From The Api ===//

  // LocalStorge //
  const id = localStorage.getItem("userId");
  //=== LocalStorge ===//

  // Navigate //
  const navigate = useNavigate();
  //=== Navigate ===//

  // Use State //
  const [users, setUsers] = useState([]);
  const [idea, setIdea] = useState("");
  // const [ideas, setIdeas] = useState([]);
  const [displayIdea, setDisplayIdea] = useState("none");
  //=== Use State ===//

  // Get Ideas //
  const getIdeas = () => {
    axios
      .get(url)
      .then((response) => {
        // handle success
        setUsers(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  //=== Get Ideas ===//

  // Use Effect //
  useEffect(() => {
    // Check If User Is Logged In //
    if (localStorage.getItem("userId") === null) {
      navigate("/signin"); // LogIn
    }
    //== Check If User Is Logged In ==//

    // =================================================================================================================================== //
    // =================================================================================================================================== //

    // Get Ideas //
    getIdeas();
    //== Get Ideas ==//
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //=== Use Effect ===//

  // Submit Idea //
  let addUpdate;
  const submitIdea = () => {
    const token = localStorage.getItem("token"); // Ensure you retrieve the token
    const userIdeas = users.filter((item) => item.user && item.user._id === id); // Filter user ideas

    // Check if the user has ideas and if the new idea is not empty
    if (userIdeas.length > 0 && idea.trim() !== "") {
      console.log("Submitting idea:", idea);
      axios
        .post(url, { idea }, { headers: { Authorization: token } })
        .then((response) => {
          console.log("Response:", response);
          getIdeas(); // Refresh the list after submission
          setIdea(""); // Clear the input field after submission
          setDisplayIdea("none"); // Close the idea submission modal
        })
        .catch((error) => {
          console.error("Error submitting idea:", error);
        });
    } else {
      console.log("Invalid user or empty idea");
    }
  };

  //=== Submit Idea ===//

  // Add Or Update //
  // const userIdeas = users.filter((item) => item.user && item.user._id === id);

  // userIdeas.forEach((item) => {
  //   if (!item.idea || item.idea.trim() === "") {
  //     addUpdate = "إضافة فكرة جديدة +";
  //   } else {
  //     addUpdate = "تعديل الفكرة";
  //   }
  // });
  const userIdeas = users.filter((item) => item.user && item.user._id === id);
console.log('userIdeas', userIdeas);

addUpdate = "إضافة فكرة جديدة +"; // Default value

if (userIdeas.length > 0) {
  // Check if any user's idea is non-empty
  const hasValidIdea = userIdeas.some(item => item.idea && item.idea.trim() !== "");
  
  if (hasValidIdea) {
    addUpdate = "تعديل الفكرة";
  }
}
  //=== Add Or Update ===//
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Cards Of Users */}
      <div className="flex-grow flex flex-col items-center">
        <div className="container mx-auto py-10">
          {/* Add Idea */}
          <div className="mb-10">
            <div className="flex justify-center lg:justify-start items-center">
              <h1
                onClick={() => {
                  setDisplayIdea("");
                }}
                className="text-2xl rounded-lg bg-white text-black w-fit p-3 font-semibold cursor-pointer hover:bg-slate-200"
              >
                {addUpdate}
              </h1>
            </div>
            <div
              className="flex justify-center items-center w-screen h-screen absolute top-0 right-0  z-10"
              style={{ display: displayIdea }}
            >
              <div className="w-full md:w-3/4 lg:w-1/2 shadow-gray-400 bg-base-100 shadow-sm p-10 rounded-lg">
                <div>
                  <textarea
                    onChange={(e) => {
                      setIdea(e.target.value);
                    }}
                    value={idea}
                    className="p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gray-500 break-words resize-none text-xl text-white mb-3"
                    rows={2}
                    placeholder="اكتب الفكرة ..."
                  ></textarea>
                </div>
                <div className="card-actions flex justify-center items-center pt-8 gap-3">
                  <button
                    onClick={() => {
                      setDisplayIdea("none");
                    }}
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
          <h1 className="font-bold text-3xl max-lg:w-full w-[95%] max-md:w-full max-sm:w-[95%] text-white mb-5">
            الأفكار المقبولة
          </h1>
          <div className="flex flex-col-reverse gap-5 justify-center items-center">
            {users
              .filter((item) => item.status === "accepted" && item.idea != " ")
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="max-lg:w-full w-[95%] max-md:w-full max-sm:w-[95%]"
                  >
                    <div className="rounded-lg p-3 flex flex-col text-black bg-gray-200 border-r-[1.5rem] border-r-green-500 justify-between items-center md:flex-row ">
                      <p className="p-2 text-right text-2xl overflow-auto font-semibold">
                        {item.idea}
                      </p>

                      <p className="p-2 text-center font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="35px"
                          viewBox="0 -960 960 960"
                          width="35px"
                          fill="green"
                        >
                          <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                        </svg>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          {/*== Show Ideas ==*/}
        </div>
      </div>
      {/* Cards Of Users */}

      <Footer />
    </div>
  );
}

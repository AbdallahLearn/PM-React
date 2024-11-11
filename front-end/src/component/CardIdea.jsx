import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { Link } from "react-router-dom";

function CardIdea() {
  const { id } = useParams();
  const numericId = Number(id);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [currentIdea, setCurrentIdea] = useState("");
  const url = `https://pm-react.onrender.com/api/all-ideas`;
  const navigate = useNavigate(); // Create navigate function

  const getAllIdeas = () => {
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log("data", data);
        setItems(data);
        // const foundItem = data.find(item => item.id === numericId);
        // if (foundItem) {
        //     setCurrentIdea(foundItem.idea);
        //     setEditingId(foundItem.id);
        // }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getAllIdeas();
  }, []);

  const handleDelete = (id) => {
    axios
      .patch(`${url}/${id}`, {
        idea: " ",
        status: "rejected",
      })
      .then((response) => {
        if (response.status === 200) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item._id === id ? { ...item, idea: "", status: "rejected" } : item
            )
          );
          setShowModal(false);
          getAllIdeas();
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  const handleAccept = (id) => {
    const itemToUpdate = items.find((item) => item._id === id); // Find the specific item by ID

    if (!itemToUpdate) {
      console.error("Item not found");
      return;
    }
    axios
      .patch(`${url}/${id}`, {
        idea: itemToUpdate.idea,
        status: "accepted",
      })
      .then((response) => {
        if (response.status === 200) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === id ? { ...item, status: "accepted" } : item
            )
          );
          getAllIdeas();
        } else {
          throw new Error("Failed to accept item");
        }
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  const handleSave = (id) => {
    axios
      .patch(`${url}/${id}`, {
        idea: currentIdea,
        status: "edited",
      })
      .then((response) => {
        if (response.status === 200) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === id
                ? { ...item, idea: currentIdea, status: "edited" }
                : item
            )
          );
          setEditingId(null);
          setCurrentIdea("");
          setShowSuccessModal(true);
          getAllIdeas();
        } else {
          throw new Error("Failed to save item");
        }
      })
      .catch((error) => console.error("Error updating item:", error));
  };

  const handleEdit = (id, idea) => {
    setEditingId(id);
    setCurrentIdea(idea);
  };

  // const handleNavigate = (id) => {
  //   navigate(`/user-idea/${id}`); // Navigate to the new path
  // };

  return (
    <>
      {items
        .filter((item) => item.idea && item.idea.trim() !== "")
        .map((item) => {
          // Check if the user exists
          if (!item.user) return null; // Skip rendering if there's no user

          return (
            <div
              style={{ cursor: "pointer" }}
              key={item._id}
              className={`relative card w-80 shadow-xl h-96 text-black bg-gray-200 ${
                item.status === "accepted"
                  ? "border-t-[2rem] border-t-green-500 "
                  : item.status === "edited"
                  ? "border-t-[2rem] border-t-blue-700"
                  : "border-t-[2rem] border-t-gray-400 "
              } max-md:w-80 max-lg:w-60 max-sm:w-80 m-auto`}
            >
              <p className="absolute -top-6 left-4 font-semibold text-[0.9rem]">
                {item.status == "accepted"
                  ? "مقبولة"
                  : item.status == "edited"
                  ? "معدلة"
                  : item.status == "pending"
                  ? "معلقة"
                  : "مرفوضة"}
              </p>
              <div className="card-body">
                <h2 className="card-title font-bold text-2xl">
                  {item.user.name}{" "}
                  {/* Directly access user name since we checked for existence */}
                </h2>
                {editingId === item._id ? (
                  <textarea
                    className="textarea textarea-bordered h-36 w-full mt-2 bg-gray-300 border-black resize-none"
                    value={currentIdea}
                    onChange={(e) => setCurrentIdea(e.target.value)}
                  />
                ) : (
                  <div
                    className=" overflow-auto h-40"
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    <p>الفكرة: {item.idea}</p>
                  </div>
                )}

                <div className="card-actions justify-evenly pt-10">
                  {editingId === item._id ? (
                    <button
                      className="btn bg-white text-black hover:bg-white hover:text-blue-700"
                      onClick={() => handleSave(item._id)}
                    >
                      حفظ
                    </button>
                  ) : (
                    <button
                      className="btn w-12 h-12 min-h-12 btn-circle bg-transparent hover:border-2 shadow-none hover:bg-white"
                      onClick={() => handleAccept(item._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="green"
                      >
                        <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                      </svg>
                    </button>
                  )}

                  <button
                    className="btn w-12 h-12 min-h-12 btn-circle bg-transparent hover:border-2 shadow-none hover:bg-white"
                    onClick={() => {
                      setItemToDelete(item._id);
                      setShowModal(true);
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
                  <button
                    className="btn w-12 h-12 min-h-12 btn-circle bg-transparent hover:border-2 shadow-none hover:bg-white"
                    onClick={() => handleEdit(item._id, item.idea)}
                  >
                    <svg
                      fill="#db6307"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                    </svg>
                  </button>
                  {/* <button
                    className="btn w-12 h-12 min-h-12 btn-circle bg-transparent hover:border-2 shadow-none hover:bg-white"
                    // onClick={() => handleNavigate(item._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#"
                    >
                      <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                    </svg>
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}

      {showModal && (
        <dialog
          className="modal modal-bottom sm:modal-middle overflow-x-hidden z-50"
          open
        >
          <div className="modal-box">
            <p className="py-4 text-center text-lg">
              هل أنت متأكد أنك تريد حذف هذه الفكرة؟
            </p>
            <div className="flex justify-center items-center pt-8 gap-3">
              <button
                onClick={() => {
                  handleDelete(itemToDelete);
                  setItemToDelete(null); // Clear itemToDelete after deletion
                }}
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

      {showSuccessModal && (
        <dialog
          className="modal modal-bottom sm:modal-middle overflow-x-hidden z-50"
          open
        >
          <div className="modal-box">
            <p className="py-4 text-center text-lg">تم الحفظ بنجاح!</p>
            <div className="flex justify-center items-center pt-8 gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="btn w-20 text-white bg-green-700 hover:bg-gray-400"
              >
                موافق
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default CardIdea;

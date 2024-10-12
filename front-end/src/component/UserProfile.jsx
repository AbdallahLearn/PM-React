import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function UserProfile() {

    // URl From The Api //
    const url = "https://67092a6aaf1a3998baa09cc6.mockapi.io/users/";
    //=== URl From The Api ===//

    // LocalStorge //
    const id    = localStorage.getItem("userId");
    //=== LocalStorge ===//

    // Navigate //
    const navigate = useNavigate();
    //=== Navigate ===//

    // Use State //
    const [users, setUsers] = useState([]);
    const [idea, setIdea]   = useState("");
    // const [ideas, setIdeas] = useState([]);
    const [displayIdea, setDisplayIdea] = useState("none");
    //=== Use State ===//

    // Get Ideas //
    const getIdeas = () => {
        axios.get(url + id)
        .then((response) => {
        // handle success
        console.log(response.data);
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
        };
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
    const submitIdea = () => {
        if (users.id == id) {          
            if (idea.trim() != "" && users.idea != idea) {
            axios.put(url + users.id, 
                {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    password: users.password,
                    state: users.idea,
                    usertype: users.usertype,
                    idea: idea
                }
            )
            .then(function (response) {
                console.log(response);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
            }
        }
    };
    //=== Submit Idea ===//

    // Submit Delete //
    const submiteDel = () => {
        if (users.id == id) {                       
            axios.put(url + users.id, 
                {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    password: users.password,
                    state: users.state,
                    usertype: users.usertype,
                    idea: ""
                }
            )
            .then(function (response) {
                console.log(response);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    };
    //=== Submit Delete ===//

    // Background-color For Card //
    let bgCard;
    let state;

    if (users.state == "accepted") {
        bgCard  = "rgba(21, 128, 61, 1)";
        state   = "الفكرة مقبولة"
    } else if (users.state == "Reject") {
        bgCard  = "rgba(185, 28, 28, 1)";
        state   = "الفكرة مرفوضة"
    } else {
        bgCard  = "rgba(156, 163, 175, 1)";
        state   = "انتظار";
    };
    //== Background-color For Card ==//

    // Show Card Or Not //
    let display;
    let addUpdate;

    if (users.idea == "") { // 
        display     = "none";
        addUpdate   = "إضافة فكرة جديدة +"
    } else {
        display     = "block";
        addUpdate   = "تعديل الفكرة"
    };
    //== Show Card Or Not ==//


    const [showModal, setShowModal] = useState(false);
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Cards Of Users */}
            <div className='flex-grow flex flex-col items-center'>
                <div className="container mx-auto py-10">
                    {/* Add Idea */}
                    <div className="mb-10">
                        <div className="flex justify-center lg:justify-start items-center">
                            <h1 onClick={() => { setDisplayIdea("") }} className="text-4xl rounded-lg bg-white text-black w-fit p-3 font-semibold cursor-pointer hover:bg-slate-200">{addUpdate}</h1>
                        </div>

                        <div className="flex justify-center items-center w-screen h-screen absolute top-0 right-0 bg-black opacity-95 z-10" style={{"display": displayIdea}}>
                            <div className="w-full md:w-3/4 lg:w-1/2 border-4 border-gray-300 p-10 rounded-lg">
                            <div>
                                <textarea onChange={(e) => { setIdea(e.target.value) }} value={idea} className="p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gray-500 break-words resize-none text-xl text-white mb-3" rows={2} placeholder="اكتب الفكرة ..."></textarea>
                            </div>
                            <div className="card-actions justify-between items-center">
                                <button onClick={() => { setDisplayIdea("none") }} className="btn bg-white text-xl text-black font-bold">الغاء</button>
                                <button onClick={submitIdea} className="btn bg-white text-xl text-black font-bold">إرسال</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/*== Add Idea ==*/}

                    {/* ============================================================================================================================= */}
                    {/* ============================================================================================================================= */}
                    {/* ============================================================================================================================= */}

                    {/* Show Ideas */}
                    <div className="grid grid-cols-1 grid-flow-row gap-10 justify-items-center content-center">
                        <div className="w-full md:w-3/4 lg:w-1/2">
                            <div className="card card-compact shadow-xl">
                                <div className="card-body rounded-lg" style={{"backgroundColor": bgCard, "display": display}}>
                                    <h2 className="card-title text-3xl text-white" style={{"backgroundColor": bgCard}}>{users.name}</h2>
                                    
                                    <p className="w-full p-3 text-center overflow-auto text-white text-4xl font-semibold mt-10" style={{"backgroundColor": bgCard}}>{users.idea}</p>

                                    <p className="w-full p-3 text-center overflow-auto text-white text-4xl font-semibold my-10" style={{"backgroundColor": bgCard}}>{state}</p>

                                    <div className="card-actions justify-between" style={{"backgroundColor": bgCard}}>
                                        <button onClick={() => {
                                            setShowModal(true);}} className="w-full btn bg-white text-2xl text-black font-bold">
                                                حذف
                                        </button>

                                        {showModal && (
                                            <dialog className="modal modal-bottom sm:modal-middle z-50" open>
                                                <div className="modal-box">
                                                        <p className="py-4 text-center text-white text-lg">
                                                            هل أنت متأكد أنك تريد حذف هذه الفكرة؟
                                                        </p>
                                                        <div className="flex justify-center items-center p-10 gap-3">
                                                            <button
                                                                onClick={submiteDel}
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
                    {/*== Show Ideas ==*/}
                </div>
            </div>
            {/* Cards Of Users */}

            <Footer />
        </div>
    )
};
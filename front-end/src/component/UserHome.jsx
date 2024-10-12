import axios from "axios";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
export default function UserHome() {

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
        axios.get(url)
        .then((response) => {
        // handle success
        setUsers(response.data);
        console.log(users)
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
    let addUpdate;
    const submitIdea = () => {
        users.find(item => {

            if (item.idea == "") { 
                addUpdate   = "إضافة فكرة جديدة +"
            } else {
                addUpdate   = "تعديل الفكرة"
            };
        if (item.id == id) {                                             
            if (idea.trim() != "" && item.idea != idea) {
            axios.put(url + item.id, 
                {
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
        })
    };
    //=== Submit Idea ===//

    // Add Or Update //
    users.find(item => {
        if (item.id == id) {                                              

            if (item.idea == "") { 
                addUpdate   = "إضافة فكرة جديدة +"
            } else {
                addUpdate   = "تعديل الفكرة"
            };
        };
    });
    //=== Add Or Update ===//
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

                    {/* ================================================================================================================================= */}
                    {/* ================================================================================================================================= */}
                    {/* ================================================================================================================================= */}

                    {/* Show Ideas */}
                    <div className="flex flex-col-reverse gap-5 justify-center items-center">
                        {
                            users.filter((item) => item.state === "accepted" && item.idea != "").map((item, index) => {
                            return (
                                <div key={index} className="w-full">
                                    <div className="rounded-lg p-3 flex flex-col bg-green-700 justify-between items-center md:flex-row ">
                                        <p className="p-2 text-center overflow-auto text-white text-4xl font-semibold">{item.idea}</p>
                                    
                                        <p className="p-2 text-center text-white text-4xl font-semibold">الفكرة مقبولة</p>
                                    </div>
                                </div>
                            )
                            })
                        }
                    </div>
                    {/*== Show Ideas ==*/}
                </div>
            </div>
            {/* Cards Of Users */}

            <Footer />
        </div>
    )
};
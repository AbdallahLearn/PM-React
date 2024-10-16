import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UserIdea() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the URL
    const [item, setItem] = useState(null);
    const url = `https://67092a6aaf1a3998baa09cc6.mockapi.io/users`;

    useEffect(() => {
        axios.get(`${url}/${id}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [id]);

    const moveToHome = () => {
        navigate('/home');
    };

    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <div className="p-4 flex-grow flex flex-col mt-20 items-center">
                {item ? (
                    <div className={`card w-[60%] shadow-xl ${item.state === "accepted" ? "bg-green-500" : "bg-gray-400"} m-auto`}>
                        <div className="card-body">
                            <h2 className="card-title text-white font-bold text-2xl">{item.name}</h2>
                            <p className="text-white">الفكرة: {item.idea}</p>
                        </div>
                    </div>
                    
                ) : (
                    <p>Loading...</p>
                )}
                
                <button className='btn bg-black text-white mt-4' onClick={moveToHome}>رجوع</button>
            </div>
            <Footer />
        </div>
    );
}

export default UserIdea;

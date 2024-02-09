import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import catAnimation from "../../assets/catAnimaiton.json"

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/users/${id}`)
            .then(resp => resp.json())
            .then(data => setUser(data))
    }, [id]);
    return (
        <div>
            <div className="p-5 mx-auto sm:p-10 md:p-16 bg-gray-800 text-gray-100 min-h-screen" >
                <div className="flex flex-col max-w-6xl mx-auto overflow-hidden rounded" >
                    <div className="max-w-3xl">
                        <img src={user?.image} alt="" className="w-3/4 h-60 sm:h-96 mx-auto" />
                    </div>
                    <div className="p-6 pb-12 m-4 mx-auto -mt-2 space-y-6 lg:max-w-6xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900 grid lg:grid-cols-4" >
                        <div className="col-span-2 ">
                            <div className="space-y-1" >
                                <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-xl">Hello I'm {user?.firstName}</a>
                                <p className="text-xs text-gray-400">User-name:
                                    <a rel="noopener noreferrer" href="#" className="text-xs hover:underline"> {user?.username}</a>
                                </p>
                            </div>
                            <div className="text-gray-100 space-y-3 mt-3" >
                                <h2 className="card-title text-lg lg:text-2xl font-light"><span className="font-semibold">First Name:</span> {user?.firstName}</h2>
                                <h2 className="card-title text-lg lg:text-2xl font-light"><span className="font-semibold">Last Name: </span> {user?.lastName}</h2>
                                <h2 className="card-title text-lg lg:text-2xl font-light"><span className="font-semibold">Email: </span> {user?.email}</h2>
                                <h2 className="card-title text-lg lg:text-2xl font-light"><span className="font-semibold">Company Name: </span> {user?.company?.name}</h2>
                                <h2 className="card-title text-lg lg:text-2xl font-light"><span className="font-semibold">Address: </span>
                                    <h1>{user?.address?.address}
                                        , {user?.address?.city}, {user?.address?.state}</h1>
                                </h2>

                            </div>
                        </div>
                        <div className="col-span-2  flex items-end">
                            <Lottie animationData={catAnimation} className=" border-l-4 border-[#dbb878]"></Lottie>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
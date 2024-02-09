import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(resp => resp.json())
            .then(data => setUsers(data?.users))
    }, []);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const filteredUsers = searchInput.trim() === '' ? users : users.filter(user =>
        user?.firstName.toLowerCase().includes(searchInput.toLowerCase())
    );

     // Sorting based on selected option
     if (sortOption === 'name') {
        filteredUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortOption === 'email') {
        filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortOption === 'companyName') {
        filteredUsers.sort((a, b) => a.company?.name.localeCompare(b.company?.name));
    }
    

    return (
        <div className="bg-[#0f172b] min-h-screen">
            <div className=" max-w-6xl mx-auto py-10">
                <h3 className="hover:text-white ease-in-out duration-150 text-5xl text-[#dbb878] text-center font-bold  pb-16">Users List Application</h3>

                <div className="mb-16 space-y-5">
                    {/* search field  */}
                    <form onSubmit={e => e.preventDefault()} className="">
                        <label className="mb-2 text-sm font-medium  sr-only text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input value={searchInput} onChange={handleSearchInputChange} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-white border  rounded-lg   bg-gray-700 border-gray-600 placeholder-gray-400 " placeholder="Search By User's name...." required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-[#dbb878] font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                        </div>
                    </form>

                    {/* sort input field  */}
                    <select onChange={handleSortChange} value={sortOption} id="countries" className="w-full p-4 ps-10 text-sm text-white border  rounded-lg   bg-gray-700 border-gray-600 placeholder-gray-600 ">
                        <option selected>Sort User List By ...</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="companyName">Company Name</option>
                    </select>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {
                        filteredUsers.map(user =>
                            <Link to={`/user-details/${user?.id}`} key={user?.email} >
                                <div className="card w-96 bg-[#dbb878] rounded-none hover:border hover:border-gray-300 border-2  hover:scale-110 ease-in-out duration-500 hover:z-20
                             ">
                                    <figure className="px-5 pt-5 bg-[#0f172b]">
                                        <img src={user?.image} alt="Shoes" className=" w-3/4" />
                                    </figure>
                                    <div className="card-body text-left p-6">
                                        <h1 className="font-semibold text-sm text-orange-900">user-name: {user?.username}</h1>
                                        <h2 className="card-title text-lg hover:rotate-3 origin-center"><span className=" hover:text-emerald-800">First Name:</span> {user?.firstName}</h2>
                                        <h2 className="card-title text-lg hover:rotate-3 origin-center"><span className=" hover:text-emerald-800">Last Name: </span> {user?.lastName}</h2>
                                        <h2 className="card-title text-lg hover:rotate-3 origin-center"><span className=" hover:text-emerald-800">Email: </span> {user?.email}</h2>
                                        <h2 className="card-title text-lg hover:rotate-3 origin-center"><span className=" hover:text-emerald-800">Address: </span> {user?.address?.address}</h2>
                                        <h2 className="card-title text-lg hover:rotate-3 origin-center"><span className=" hover:text-emerald-800">Company Name: </span> {user?.company?.name}</h2>

                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;



// fgdfgdfgdfg
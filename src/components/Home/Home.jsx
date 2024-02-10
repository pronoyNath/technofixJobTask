import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [users, setUsers] = useState([])

    const [formData, setFormData] = useState({
        // id: '',
        image: '',
        firstName: '',
        lastName: '',
        email: '',
        company: { name: '' },
        address: {
            address: '',
        }
    });

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


    // craeting user 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // If the input field belongs to a nested object
        if (name.includes('.')) {
            const [parent, child] = name.split('.'); // Split the name into parent and child keys
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent], // Spread the parent object
                    [child]: value // Update the child key with new value
                }
            });
        } else {
            // If the input field belongs to the main formData object
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // POST method to add user with formData
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                // Prepend the newly added user to the existing list
                setUsers([data, ...users]); // Prepending the new user to the existing list
                // Reset form data
                setFormData({
                    id: '',
                    image: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    company: { name: '' },
                    address: {
                        address: '',
                    }
                });
                Swal.fire({
                    title: "User Created Successfully",
                    text: "check user list",
                    icon: "success"
                });
            })
            .catch(error => console.error('Error:', error));
    };
    console.log(formData);

    return (
        <div className="bg-[#0f172b] min-h-screen overflow-x-hidden">
            <div className=" max-w-6xl mx-auto py-10">
                <h3 className="hover:text-white ease-in-out duration-150 text-3xl lg:text-5xl text-[#dbb878] text-center font-bold  pb-16">Users List Application</h3>

                <div className="mb-16 space-y-5 px-10 lg:px-0">
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

                    {/* Form to add new user */}
                    <details className="collapse mb-10 bg-gray-700">
                        <summary className="collapse-title text-xl  font-medium  text-[#dbb878]">
                            Add User "Click to open/close"
                        </summary>
                        <div className="collapse-content">
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    className="block w-full p-4 ps-10 text-sm text-white border rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none border-[#dbb878]"
                                    required
                                />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    className="block w-full p-4 ps-10 text-sm text-white border rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none border-[#dbb878]"
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className="block w-full p-4 ps-10 text-sm text-white border rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none border-[#dbb878]"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="block w-full p-4 ps-10 text-sm text-white border rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none border-[#dbb878]"
                                    required
                                />
                                <input
                                    type="text"
                                    name="company.name"
                                    value={formData.company.name}
                                    onChange={handleInputChange}
                                    placeholder="Company Name"
                                    className="block w-full p-4 ps-10 text-sm text-white border rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none border-[#dbb878]"
                                    required
                                />
                                <input
                                    type="text"
                                    name="address.address"
                                    value={formData.address.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                    className="block w-full p-4 ps-10 text-sm text-white border rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none border-[#dbb878]"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-[#dbb878] font-medium rounded-lg text-sm px-4 py-4"
                                >
                                    Add User
                                </button>
                            </form>

                        </div>
                    </details>
                </div>




                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-7">
                    {
                        filteredUsers.map(user =>
                            <Link to={`/user-details/${user?.id}`} key={user?.email} >
                                <div className="card w-[90%] lg:w-96 bg-[#dbb878] rounded-none hover:border hover:border-gray-300 border-2  hover:scale-110 ease-in-out duration-500  mx-auto hover:z-20
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
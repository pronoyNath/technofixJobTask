import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home/Home';
import UserDetails from '../components/UserDetails/UserDetails';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "/user-details/:id",
        element: <UserDetails></UserDetails>
    },
    
]);


export default router;
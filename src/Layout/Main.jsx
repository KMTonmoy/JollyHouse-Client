import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Main = () => {
    const { user } = useContext(AuthContext)
 
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
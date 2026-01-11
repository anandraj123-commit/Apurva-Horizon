import './asset/css/app.css';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';
import Header from './common/Header';
import { ToastContainer } from 'react-toastify';
import { Outlet} from 'react-router-dom';

function Admin() {
    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
                    {/* <h1> admin page </h1> */}
                    <ToastContainer />
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Admin;
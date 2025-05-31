import Footer from "./common/Footer";
import Header from "./common/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


function Web() {
    return (
            <div className="main">
                <Header />
                <main className="content" style={{"padding-top":0}}>
                    <ToastContainer />
                    <Outlet />
                </main>
                <Footer />
            </div>
    );
}

export default Web;

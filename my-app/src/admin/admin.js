import './asset/css/app.css';
import Sidebar from './common/Sidebar';
import Footer from './common/Footer';
import Header from './common/Header';
import ImageUpload from './Imageupload';
import FileUpload from './Fileupload';
function Admin() {
    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main">
                <Header />
                <main className="content">
                    <p>Admin Panel</p>
                    image
                    <ImageUpload/>
                    file
                    <FileUpload/>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Admin;

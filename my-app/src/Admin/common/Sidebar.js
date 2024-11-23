import { BiCategory } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { LuFileType } from "react-icons/lu";

import "../asset/css/common.css";
const Sidebar = function({ isActive }){
    return(
        <nav id="sidebar" className={`sidebar ${isActive ? "active" : "inactive"}`}>
        <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="index.html">
                <span className="align-middle">Apurva Horizon</span>
            </a>

            <ul className="sidebar-nav">
                <li className="sidebar-item active">
                    <a className="sidebar-link" href="">
                        <i className="align-middle" data-feather="sliders"></i> <span className="align-middle"><AiFillDashboard />Dashboard</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="/admin/content-type">
                        <i className="align-middle" data-feather="user"></i> <span className="align-middle"><LuFileType />Content-Type</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link" href="">
                        <i className="align-middle" data-feather="user"></i> <span className="align-middle"><BiCategory />Category</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="">
                        <i className="align-middle" data-feather="log-in"></i> <span className="align-middle"><FaRegUserCircle />User</span>
                    </a>
                </li>

                {/* <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/pages-sign-up.html">
                        <i className="align-middle" data-feather="user-plus"></i> <span className="align-middle">Sign Up</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/pages-blank.html">
                        <i className="align-middle" data-feather="book"></i> <span className="align-middle">Blank</span>
                    </a>
                </li> */}

                <li className="sidebar-header">
                    Tools & Components
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/ui-buttons.html">
                        <i className="align-middle" data-feather="square"></i> <span className="align-middle">Buttons</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/ui-forms.html">
                        <i className="align-middle" data-feather="check-square"></i> <span className="align-middle">Forms</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/ui-cards.html">
                        <i className="align-middle" data-feather="grid"></i> <span className="align-middle">Cards</span>
                    </a>
                </li>

               

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/icons-feather.html">
                        <i className="align-middle" data-feather="coffee"></i> <span className="align-middle">Icons</span>
                    </a>
                </li>

                <li className="sidebar-header">
                    Plugins & Addons
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/charts-chartjs.html">
                        <i className="align-middle" data-feather="bar-chart-2"></i> <span className="align-middle">Charts</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/maps-google.html">
                        <i className="align-middle" data-feather="map"></i> <span className="align-middle">Maps</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    )
}

export default Sidebar;
const Sidebar = function(){
    return(
        <nav id="sidebar" className="sidebar js-sidebar">
        <div className="sidebar-content js-simplebar">
            <a className="sidebar-brand" href="index.html">
                <span className="align-middle">Apurva Horizon</span>
            </a>

            <ul className="sidebar-nav">
                <li className="sidebar-item active">
                    <a className="sidebar-link" href="index.html">
                        <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Dashboard</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/pages-profile.html">
                        <i className="align-middle" data-feather="user"></i> <span className="align-middle">Category</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/pages-sign-in.html">
                        <i className="align-middle" data-feather="log-in"></i> <span className="align-middle">Sign In</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/pages-sign-up.html">
                        <i className="align-middle" data-feather="user-plus"></i> <span className="align-middle">Sign Up</span>
                    </a>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link" href="./asset/static/pages-blank.html">
                        <i className="align-middle" data-feather="book"></i> <span className="align-middle">Blank</span>
                    </a>
                </li>

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
                    <a className="sidebar-link" href="./asset/static/ui-typography.html">
                        <i className="align-middle" data-feather="align-left"></i> <span className="align-middle">Typography</span>
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
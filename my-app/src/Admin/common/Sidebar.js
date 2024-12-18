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
                    <a className="sidebar-link" href="/admin/content-type">
                        <i className="align-middle" data-feather="user"></i> <span className="align-middle">Content-Type</span>
                    </a>
                </li>
                
                <li className="sidebar-item">
                    <a className="sidebar-link" href="/admin/category-type/list">
                        <i className="align-middle" data-feather="user"></i> <span className="align-middle">Category</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link" href="/admin/news/list">
                        <i className="align-middle" data-feather="user"></i> <span className="align-middle">News</span>
                    </a>
                </li>
                
            </ul>
        </div>
    </nav>
    )
}

export default Sidebar;
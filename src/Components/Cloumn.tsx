import React, { useState } from 'react';
import './Column.css';
import Mukul from './Logo..jpg';
// import {SelectMainController} from '../app/drawer/controllers/SelectMainController'; // Import the component correctly

const Column: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => { 
    setIsExpanded(!isExpanded);
  };

  const handleSectionClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleCloseSidebar = () => {
    setIsExpanded(false);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`} onClick={handleCloseSidebar}>
      <div className="sidebar-content" onClick={handleSectionClick}>
        <img src={Mukul} alt="HMD"  />
        <div className="sidebar-section-group">
          <div className="sidebar-section" onClick={toggleSidebar}>
            <i className="icon fa fa-home"></i>
            {isExpanded && <span className="section-text">Home Planner</span>} 
          </div>
          <div className="sidebar-section" onClick={handleSectionClick}>
            <i className="icon fa fa-book"></i>
            {isExpanded && <span className="section-text">Public Library</span>}
          </div>
          <div className="sidebar-section" onClick={handleSectionClick}>
            <i className="icon fa fa-user"></i>
            {isExpanded && <span className="section-text">My Account</span>}
          </div>
        </div>
        <div className="sidebar-section logout" onClick={toggleSidebar}>
          <i className="icon fa fa-sign-out"></i>
          {isExpanded && <span className="section-text">Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Column;


// import React from 'react';
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarFooter,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from 'cdbreact';
// import { NavLink } from 'react-router-dom';

// const Sidebar: React.FC = () => {
//   return (
//     <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
//       <CDBSidebar textColor="#fff" backgroundColor="#333">
//         <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//           <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
//             Sidebar
//           </a>
//         </CDBSidebarHeader>
//         <CDBSidebarContent className="sidebar-content">
//           <CDBSidebarMenu>
//             <NavLink exact to="/" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/tables" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/profile" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/analytics" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
//             </NavLink>
//           </CDBSidebarMenu>
//         </CDBSidebarContent>
//         <CDBSidebarFooter style={{ textAlign: 'center' }}>
//           <div style={{ padding: '20px 5px' }}>
//             Sidebar Footer
//           </div>
//         </CDBSidebarFooter>
//       </CDBSidebar>
//     </div>
//   );
// };

// export default Sidebar;



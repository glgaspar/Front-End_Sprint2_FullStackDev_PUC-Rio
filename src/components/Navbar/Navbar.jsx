import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import classes from "./Navbar.module.css";
import { IconContext } from "react-icons";

function Navbar() {
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);
	
	return (
		<>
			<IconContext.Provider value={{ color: "#ffffff" }}>
				<div className="grid grid-cols-9 bg-main-blue">
					<div className="p-1 col-span-2">
						<div className="text-[2rem] cursor-pointer">
							<FaIcons.FaBars onClick={showSidebar} />
						</div>
					</div>
					<div className="col-span-3 ml-auto mr-0">
						<Link to="/home">
							<img src="" className="h-[7vh]" alt="logo" />
						</Link>
					</div>
					
					<nav className={sidebar ? classes.navMenuActive : classes.navMenu} onBlur={() => setSidebar(false)}>						
						<ul className={classes.navMenuItems} onClick={showSidebar}>
							{SidebarData.map((item, index) => {
								return (
									<li key={index} className={classes.navText}>
										<Link to={item.path}>
											{item.icon}
											<span className={classes.navLink}>{item.title}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			</IconContext.Provider>
		</>
	);
}

export default Navbar;

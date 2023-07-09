import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo192.png"
function Navbar() {
	
	return (
		<>
				<div className="grid grid-cols-9 bg-main-blue">
					<div className="p-1 col-span-2">
						<div className="text-[2rem] cursor-pointer">
							{/* <FaIcons.FaBars onClick={showSidebar} /> */}
						</div>
					</div>
					<div className="col-span-3 ml-auto mr-0">
						<Link to="/home">
							<img src={logo} className="h-[5vh]" alt="logo" />
						</Link>
					</div>
					
				</div>
		</>
	);
}

export default Navbar;

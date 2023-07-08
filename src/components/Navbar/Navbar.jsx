import React, { useState } from "react";
import { Link } from "react-router-dom";

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
							<img src="" className="h-[7vh]" alt="logo" />
						</Link>
					</div>
					
				</div>
		</>
	);
}

export default Navbar;

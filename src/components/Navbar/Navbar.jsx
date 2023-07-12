import React from "react";
import { IconContext } from "react-icons";
import * as Io from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo192.png";
function Navbar() {
	const pathname = window.location.pathname;
	const navigate = useNavigate();
	
	return (
    <>
		<IconContext.Provider value={{ color: "#ffffff" }}>
			<div className="grid grid-cols-9 bg-main-blue">
			<div className="p-1 col-span-2">
				<div className="text-[2rem] cursor-pointer">
				{pathname !== "/" && pathname !== "/home" && (
					<Io.IoArrowBackSharp onClick={() => navigate("/home")} />
				)}
				</div>
			</div>
			<div className="col-span-2"></div>
			<div className="col-span-1 ml-auto mr-auto">
				<Link to="/home">
				<img src={logo} className="h-[6vh]" alt="logo" />
				</Link>
			</div>
			</div>
		</IconContext.Provider>
	</>
	);
}

export default Navbar;

import React from "react";
import { IconContext } from "react-icons";
import * as Io from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo192.png";
import { APIData } from "../APIs/APIs";
import toast from "react-hot-toast";

function Navbar() {

	const pathnname  = window.location.pathname ///////retorna o caminho e o nome do arquivo da página atual
	
	const navigate = useNavigate()

	const logoff = ()=>{
		APIData(sessionStorage.getItem('userToken')).get('/vendas')
		.then((result) =>{
			sessionStorage.clear()
				navigate('/')
				window.location.reload()
		})
		.catch(err => toast.error('Erro no processamento.'))
        
    }


	return (
		<>
			<IconContext.Provider value={{ color: "#ffffff" }}>
				<div className="grid grid-cols-4 md:grid-cols-10 bg-main-blue">
					<div className="p-1 col-span-1 md:col-span-4">
						<div className="text-[2rem] cursor-pointer">
							{pathnname !== '/home' && pathnname !== '/' && <Io.IoArrowBackSharp onClick={()=>navigate('/home')} />}
						</div>
					</div>
					<div className="col-span-2 md:col-span-2 ml-auto mr-auto">
						<Link to="/home">
							<img src={logo} className="h-[6vh]" alt="logo" />
						</Link>
					</div>
					<div className="col-span-1 md:col-span-4 text-right p-2 mb-auto mt-auto">
					{pathnname !== '/' && <span
						className="text-smbg-element-blue p-2 text-white rounded-xl cursor-pointer hover:bg-accent-orange"
						onClick={logoff}>Sair</span>}
					</div>
					
				</div>
			</IconContext.Provider>
		</>
	);
}

export default Navbar;

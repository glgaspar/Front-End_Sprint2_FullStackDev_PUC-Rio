import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { APIUser } from "../APIs/APIs";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setSenha] = useState("");

	async function handleSubmitLogin(e) {
		e.preventDefault();
		console.log(process.env.PATH_API_LOGIN)
		APIUser('').post('/login', { email: email, pssw: password })
		.then(
            (result) => {
				sessionStorage.setItem('user',JSON.stringify(result.data))
				sessionStorage.setItem('userToken', JSON.stringify(result.data.token))
				window.location.reload();
			}
		)
		.catch(err =>{
			toast.error(err.response.data.message)
		});
	}

	return (
		<div className="bg-component-whitesmoke m-auto mt-5 w-[75vw] md:w-[45vw] border border-solid border-gray-300 rounded-xl p-2">
			<h1 className="text-center text-xl m-5">Login</h1>
			<form className="grid grid-col-3" onSubmit={handleSubmitLogin}>
				<div className="grid grid-cols-4 gap-1 mb-5 h-[4vh]">
					<p className="col-span-1 text-center md:text-right"> Usuário </p>
					<input
						className="col-span-3 border border-solid pl-2 rounded-md md:w-4/5"
						type="text"
						name=""
						placeholder="Nome do Usuário"
						onChange={(text) => setEmail(text.target.value)}
						required
					/>
				</div>
				<div className="grid grid-cols-4 gap-1 mb-5 h-[4vh]">
					<p className="col-span-1 text-center md:text-right">Senha</p>
					<input
						className="col-span-3 border border-solid pl-2 rounded-md md:w-4/5"
						type="password"
						placeholder="Senha"
						onChange={(text) => setSenha(text.target.value)}
						required
					/>
				</div>
				<div className="m-auto grid grid-cols-1">
					<button className="text-sm col-span-2 h-10 p-2 bg-element-blue text-white rounded-xl cursor-pointer hover:bg-accent-orange"> Login </button>
				</div>
			</form>
		</div>
	);
}

export default Login;

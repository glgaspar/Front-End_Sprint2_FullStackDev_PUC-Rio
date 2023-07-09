import React, { useState } from "react";
import BttnPadrao from "../components/Botoes/BttnPadrao";
import FiltroSelect from "../components/Filtros/FIltroSelect";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem/CardItem";

import clientes from "../assets/clientes.json";
import listaItens from "../assets/itens.json";

export default function NewOrder() {
	const [cliente, setCliente] = useState();
	const [nomeMedico, setNomeMedico] = useState();
	const [nCrm, setNCrm] = useState();
	const [receita, setReceita] = useState();
	const [item, setItem] = useState();
	const [qtd, setQtd] = useState();
	const [vlunit, setVlunit] = useState();
	const [itens, setItens] = useState([]);

	const infoItem =
		item && listaItens.filter((i) => i.produto === item.value)[0];
	// console.log(infoItem)
	const addItem = (e) => {
		e.preventDefault();
		const obj = {
			produto: item.label,
			ean: infoItem.EAN,
			qtd: qtd,
			unid: infoItem.unidade,
			vlunit: vlunit,
			vltotal: Number(qtd) * Number(vlunit),
		};
		setItens([...itens, obj]);
		setQtd(0);
		setVlunit(0);
	};
	const navigate = useNavigate();
	const handleBttn = (flag) => {
		if (flag === 1) {
			if (cliente && itens.length > 0) {
				const newOrder = {
					medico: nomeMedico,
					crm: nCrm,
					cliente: cliente.value,
					receita: receita.target.value || null,
					itens: itens,
				};
				alert("Confirmado");
				console.log(newOrder);
				navigate("/home");
			} 
			else{alert('Dados necessários não foram preenchidos.')}
		}
		else if (flag === 0) {
			console.log("Cancelado");
			navigate("/home");
		}
	};

	const removeItem = (index) => {
		setItens([...itens.slice(0, index), ...itens.slice(index + 1)]);
	};

	return (
		<div className="m-5 grid md:grid-cols-12 sm:grid-cols-4 gap-y-5">
			<div className="md:col-span-10 sm:col-span-4 grid md:grid-cols-10 sm:grid-cols-4 md:col-start-2 bg-component-whitesmoke rounded-xl sm:mb-15">
				<div className="mt-5 ml-5 mr-5 md:col-span-10 sm:col-span-4 text-center text-xl">
					<h2 className="mb-3">Registro de novo pedido</h2>
					<hr className="border-accent-orange" />
				</div>
				<div className="mt-5 ml-5 mr-5 md:col-span-10 grid md:grid-cols-6 gap-5">
					<div name="div" className="md:col-span-2">
						<p htmlFor="Vendedor">Vendedor:</p>
						<p name="Vendedor">Gustavo Gaspar</p>
					</div>
					<div name="div" className="md:col-span-2 grid">
						<label htmlFor="Medico">Médico:</label>
						<input
							className="p-2 rounded-lg border border-solid w-4/5"
							name="Medico"
							type="text"
							value={nomeMedico}
							onChange={(e) => setNomeMedico(e.target.value)}
						/>
					</div>
					<div name="div" className="md:col-span-2 grid">
						<label htmlFor="CRM">CRM:</label>
						<input
							className="p-2 rounded-lg border border-solid w-4/5"
							name="CRM"
							type="text"
							value={nCrm}
							onChange={(e) => setNCrm(e.target.value)}
						/>
					</div>
					<div name="div" className="md:col-span-2">
						<label htmlFor="Cliente">
							Cliente:
							<FiltroSelect
								placeholder="Cliente"
								name="Cliente"
								multi={false}
								options={clientes}
								chave={"cliente"}
								onChange={setCliente}
							/>
						</label>
					</div>
					<div name="div" className="md:col-span-2 md:mt-5">
						<label
							htmlFor={"Receita"}
							className="text-sm col-span-2 p-3 bg-element-blue text-white rounded-xl cursor-pointer hover:bg-accent-orange"
						>
							<input
								className="p-2 rounded-lg hidden"
								id={"Receita"}
								type="file"
								onChange={(e) => {
									setReceita(e);
								}}
							/>
							Adicionar Receita {receita && <span>OK</span>}
						</label>
					</div>
					<hr className="border-accent-orange md:col-span-10" />
				</div>
				<form
					className="mt-5 ml-5 mr-5 md:col-span-10 sm:col-span-4 grid md:grid-cols-6 sm:grid-cols-4 gap-5"
					onSubmit={(e) => addItem(e)}
				>
					<div className="md:col-span-1 sm:col-span-2">
						<label htmlFor="Produto">Produto: </label>
						<FiltroSelect
							placeholder="Produto"
							id="Produto"
							multi={false}
							options={listaItens}
							chave={"produto"}
							onChange={setItem}
						/>
					</div>
					<div className="md:col-span-1 sm:col-span-2">
						<label htmlFor="EAN">
							EAN:
							<p mame="EAN">{infoItem && infoItem.EAN}</p>
						</label>
					</div>
					<div className="md:col-span-1 sm:col-span-2">
						<label htmlFor="Unidade">
							Unidade:
							<p mame="Unidade">{infoItem && infoItem.unidade}</p>
						</label>
					</div>
					<div className="md:col-span-1 sm:col-span-2">
						<label htmlFor="Quantidade">
							Quantidade:
							<input
								className="p-2 rounded-lg w-4/5 border border-solid"
								mame="Quantidade"
								type="number"
								value={qtd}
								onChange={(e) => setQtd(e.target.value)}
							/>
						</label>
					</div>
					<div className="md:col-span-1 sm:col-span-2">
						<label htmlFor="Valor">
							Valor Unitário:
							<input
								className="p-2 rounded-lg w-4/5 border border-solid"
								mame="Valor"
								type="number"
								step={0.0001}
								min={0.0001}
								value={Number(vlunit)}
								onChange={(e) => setVlunit(e.target.value)}
								required
							/>
						</label>
					</div>
					<div className="md:col-span-1 sm:col-span-2 grid m-3">
						<BttnPadrao texto="Adicionar" />
					</div>
					<hr className="border-accent-orange md:col-span-6 sm:col-span-4" />
				</form>
				<div className="mt-5 ml-5 mr-5 md:col-span-10 sm:col-span-4">
					<h4 className="text-center md:text-lg">Itens Inseridos</h4>
					{itens &&
						itens.map((item, index) => {
							return (
								<div
									key={index}
									className="md:col-span-10 sm:col-span-4 grid md:grid-cols-10 md:gap-5"
								>
									<div className="md:col-span-9 sm:col-span-4">
										<CardItem data={item} />
									</div>
									<div className="md:col-span-1 grid md:mt-5 sm:col-span-2">
										<BttnPadrao
											texto="&#10006;"
											onClick={() => removeItem(index)}
										/>
									</div>
								</div>
							);
						})}
				</div>
			</div>
			<div className="col-span-4 grid grid-cols-2 md:col-start-5 gap-5">
				<div className="col-span-1 grid">
					<BttnPadrao texto="Cancelar" onClick={() => handleBttn(0)} />
				</div>
				<div className="col-span-1 grid">
					<BttnPadrao texto="Confirmar" onClick={() => handleBttn(1)} />
				</div>
			</div>
		</div>
	);
}

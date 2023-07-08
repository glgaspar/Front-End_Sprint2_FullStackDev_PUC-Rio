import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TabelaSimples from "../components/Tabelas/TabelaSimples";
import FiltroSelect from "../components/Filtros/FIltroSelect";
import BttnPadrao from "../components/Botoes/BttnPadrao";

import clientes from "../assets/clientes.json";
// import data from "../data/orders.json";

export default function Home() {
	const [compras, setCompras] = useState([]);
	const [filtroCliente, setFiltroCliente] = useState([]);
	const [filtroEstado, setFiltroEstado] = useState([]);

	useEffect(() => {
		// consulta no backend seria feita aqui para definir os pedidos
		const data = require("../assets/orders.json")
		setCompras(data)
	}, []);

	let navigate = useNavigate();
	const routePedido = (props) => {
		const path = `/detalhe?${props.id}`;
		navigate(path);
	};

	const head = {
		id: "ID",
		cliente: "Cliente",
		valor: "Valor",
		data: "Data",
		receita: "Receita",
		UF: "UF",
	};

	function camadaFiltro() {
		let array = compras;
		if (filtroCliente.length > 0) {
			array = array?.filter((item) => {
				return filtroCliente.find((filtro) => {
					return item.cliente === filtro.value;
				});
			});
		}
		if (filtroEstado.length > 0) {
			array = array?.filter((item) => {
				return filtroEstado.find((filtro) => {
					return item.UF === filtro.value;
				});
			});
		}
		return array;
	}

	const obj = camadaFiltro();

	return (
		<div className="m-5 grid md:grid-cols-12 grid-cols-4 gap-5 md:col-start-2 md:col-end-11 ">
			<div className="md:col-span-6 col-span-4 grid md:grid-cols-6 grid-cols-4 gap-5 md:col-start-2 m-5">
				<div className="col-span-2">
					<FiltroSelect
						placeholder="Clientes"
						multi={true}
						options={clientes}
						chave={"cliente"}
						onChange={setFiltroCliente}
					/>
				</div>
				<div className="col-span-2">
					<FiltroSelect
						placeholder="Estado"
						multi={true}
						options={[{ estado: "SP" }, { estado: "RJ" }]}
						chave={"estado"}
						onChange={setFiltroEstado}
					/>
				</div>
			</div>
			<div className="md:col-span-5 md:col-start-2 col-span-4 m-5">
				{compras && (
					<div className="bg-component-whitesmoke p-5 rounded-xl shadow-md border border solid">
						<h5 className="text-center md:text-lg md:mb-5">Inseridos</h5>
						<TabelaSimples
							dados={obj.filter((i) => i.status === "NÃO")}
							head={head}
							altura="35vh"
							onClick={routePedido}
						/>
					</div>
				)}
			</div>
			<div className="md:col-span-5 col-span-4 m-5">
				{compras && (
					<div className="bg-component-whitesmoke p-5 rounded-xl shadow-md border border solid">
						<h5 className="text-center md:text-lg md:mb-5">Pagos</h5>
						<TabelaSimples
							dados={obj.filter((i) => i.status === "SIM")}
							head={head}
							altura="35vh"
							onClick={routePedido}
						/>
					</div>
				)}
			</div>
			<div className="md:col-span-6 grid md:grid-cols-6 gap-5 md:col-start-6">
				<BttnPadrao texto="Novo Pedido" onClick={() => navigate("/novo")} />
			</div>
		</div>
	);
}

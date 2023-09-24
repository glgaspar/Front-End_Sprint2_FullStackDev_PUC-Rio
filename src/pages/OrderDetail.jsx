import React, { useEffect, useState } from "react";
import CardItem from "../components/CardItem/CardItem";
import { useNavigate } from "react-router-dom";
import TabelaSimples from "../components/Tabelas/TabelaSimples";
import BttnPadrao from "../components/Botoes/BttnPadrao";
import BttnDialog from "../components/Botoes/BttnDialog";
import toast from "react-hot-toast";
// import itemList from "../assets/orderItens.json";
// import data from "../assets/orders.json";
import { APIData } from "../components/APIs/APIs";

function Pedido() {
	const [pedido, setPedido] = useState();
	const [pedidos, setPedidos] = useState();

	const numPed = window.location.search.slice(1);
	/////////// useEffect para fazer um request assim que a pagina é renderizada, o resultado dessa API é inserida em um useState
	useEffect(() => {
		APIData(JSON.parse(sessionStorage.getItem('userToken')))
			.get(`/venda?numPedido=${numPed}`)
			.then((result) => {
				console.log(result)
				setPedido({...result.data.data, dtEmissao:  new Date(result.data.data.dtEmissao)})
			});

		APIData(JSON.parse(sessionStorage.getItem('userToken')))
			.get("/vendas")
			.then((result) => {
				setPedidos(result.data.data.map((info)=>{
					return{...info, dtEmissao:  new Date(info.dtEmissao)}
				}));
			});
	}, [numPed]);
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const navigate = useNavigate();
	///////////
	const routePedido = (props) => {
		window.location.replace(
			window.location.origin + window.location.pathname + `?${props.numPedido}`
		);
	};

	const removeItem = (codItem, numPedido)=>{
		APIData(JSON.parse(sessionStorage.getItem('userToken')))
			.delete(`/venda/produto?numPedido=${numPedido}&codItem=${codItem}`)
			.then((result)=>{
				toast.success(result.data.message)
			})
			.catch(err=>{
				console.log(err)
				toast.error(err.response.data.message)
			})
	}

	function cancelaPedido(){
		APIData(JSON.parse(sessionStorage.getItem('userToken')))
			.delete(`/venda?numPedido=${numPed}`)
			.then((result)=>{
				toast.success(result.data.message)				
			})
			.catch(err=>{
				console.log(err)
				toast.error(err.response.data.message)
			})
	}

	function entregaPedido(){
		APIData(JSON.parse(sessionStorage.getItem('userToken')))
			.put(`/recebimento?numPedido=${numPed}`)
			.then((result)=>{
				toast.success(result.data.message)				
			})
			.catch(err=>{
				console.log(err)
				toast.error(err.response.data.message)
			})
	}

	//OBJ para colocar no componente tabela simples
	const head = {
		numPedido: "Pedido",
		status: "Status",
		cliente_cpf: "CPF Cliente",
		vlTotal: "Vl. Total",
		dtEmissao: "Emissão",
	};

	return (
		<div className="m-5 grid md:grid-cols-12 grid-cols-4 gap-5 md:col-start-2 md:col-end-11 m-5">
			<div className="md:col-span-5 col-span-5 md:col-start-2 h-50 bg-component-whitesmoke p-5 rounded-xl shadow-md border border solid">
				<h3 className="text-center text-xl mb-2">
					Pedido Nº: {numPed}
					{pedido && pedido.status === "ENVIADO" ?(
						<button className="text-xs ml-5 p-2 bg-element-blue text-white rounded-xl cursor-pointer hover:bg-accent-orange">
							<BttnDialog texto="Cancelar Pedido" mensagem="Cancelar Pedido?" onClick={cancelaPedido}/>
							</button>)
							: <button className="text-xs ml-5 p-2 bg-element-blue text-white rounded-xl cursor-pointer hover:bg-accent-orange">
							<BttnDialog texto="Confirmar entrega" mensagem="Confirmar entrega?" onClick={entregaPedido}/>
							</button>}
				</h3>
				<hr className="border-accent-orange" />
				<div className="mt-5 mb-5 md:grid md:grid-cols-2 md:gap-5">
					<div>
						<p className="mt-3">Cliente: {pedido && pedido.cliente_cpf}</p>
						<p className="mt-3">Data: {pedido && pedido.dtEmissao.toLocaleString()}</p>
						<p className="mt-3">Status: {pedido && pedido.status}</p>
					</div>
					<div>
						<p className="mt-3">Médico: {pedido && pedido.medico_nome}</p>
						<p className="mt-3">CRM: {pedido && pedido.medico_crm}</p>
						{/* <p className="mt-3">Receita: {pedido && ReceitaMed(pedido)}</p> */}
					</div>
				</div>
				<hr className="border-accent-orange" />
				<h3 className="text-center text-xl mb-5 mt-5">Itens:</h3>
				<div className="md:m-3">
					{pedido &&
						pedido.itens.map((item, index) => (
							<div className="grid grid-cols-[95%_5%]">
								<CardItem data={item} key={index} />
								{pedido && pedido.status === "ENVIADO" && <button className="text-right text-accent-orange"><BttnDialog texto="X" mensagem="Remover item do pedido?" onClick={() =>removeItem(item.codItem, numPed)}/></button> }
							</div>
						))}
				</div>
			</div>
			<div className="md:col-span-5 col-span-4 md:col-start-7 grid md:grid-cols-5 grid-cols-4 h-50 p-5">
				<div className="md:col-span-6 grid md:grid-cols-6 col-span-2 col-start-2 grid grid-cols-2 md:gap-5 mb-10 ">
					<BttnPadrao texto="Novo Pedido" onClick={() => navigate("/novo")} />
				</div>
				<div className="bg-component-whitesmoke p-2 rounded-xl shadow-md border border solid lg:col-span-5 col-span-4 lg:mt-5  mt-5">
					{pedidos && pedido && (
						<TabelaSimples
							dados={pedidos?.filter(
								(i) =>{
									console.log(i) 
									return i.cliente_cpf === pedido.cliente_cpf}
							)}
							head={head}
							onClick={routePedido}
							altura="50vh"
							money={['vlTotal']}
							dateTime={['dtEmissao']}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Pedido;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FiltroSelect from "../components/Filtros/FIltroSelect";
import BttnPadrao from "../components/Botoes/BttnPadrao";
// import Pedidos from "../components/Pedidos/Pedidos";
import TabelaSimples from "../components/Tabelas/TabelaSimples"
import { APIData } from "../components/APIs/APIs";
import toast from "react-hot-toast";

export default function Home() {
	const [compras, setCompras] = useState([]);
	const [filtroCliente, setFiltroCliente] = useState([]);

	useEffect(() => {
		APIData(sessionStorage.getItem('userToken')).get('/vendas')
		.then((result) =>{
			console.log(result.data.data)
			setCompras((result.data.data).map((info)=>{
				return{...info, dtEmissao:  new Date(info.dtEmissao)}
			}));
		})
		.catch(err => toast.error('Erro na conexão.'))
	}, []);


	let navigate = useNavigate();
	const routePedido = obj => {
		const path = `/detalhe?${obj.numPedido}`;
		navigate(path);
	};

	
	const head = {
		numPedido: 'Pedido',
		cliente_cpf: 'CPF Cliente',
		cliente: 'Nome Cliente',
		medico_crm:'CRM', 
		medico_nome:'Médico',
		dtEmissao: 'Emissão',
		vlTotal:'Vl. Total',
		status:'Status'
	}

//função que retorna um filtro, que quando selecionar um cliente, filtrará só os pedidos desse cliente
	function camadaFiltro() {
		let array = compras;
		if (filtroCliente.length > 0) {
			array = array?.filter((item) => {
				return filtroCliente.find((filtro) => {
					return item.cliente_cpf === filtro.value;
				});
			});
		}
		return array;
	}

	const obj = camadaFiltro();
	return (
		<>
			<div className="m-5  md:col-start-2 md:col-end-11 ">
				<div className="md:col-span-6 col-span-4 grid md:grid-cols-6 grid-cols-4 gap-5 md:col-start-2 m-5">
					<div className="md:col-span-1 md:col-start-2 col-span-2">
						<FiltroSelect
							placeholder="Clientes"
							multi={true}
							options={compras}
							chave={"cliente_cpf"}
							onChange={setFiltroCliente}
						/>
					</div>
					<div className="col-span-2 md:col-start-5">
							<BttnPadrao texto="Novo Pedido" onClick={() => navigate("/novo")} />
					</div>
				</div>
				<div className="md:col-span-5 col-span-4 m-5">
				<div className="bg-component-whitesmoke p-2 rounded-xl shadow-md border border solid  mt-5">
					
								<h5 className="text-center md:text-lg md:mb-2">Pedidos</h5>
						{compras.length > 0 && (
							<TabelaSimples dados={obj} head={head} altura="65vh" onClick={routePedido} money={['vlTotal']} dateTime={['dtEmissao']} />
						)}
							{/* <div className="bg-component-whitesmoke p-5 rounded-xl shadow-md border border solid">
								<Pedidos pedidos={obj} />
							</div> */}				
				</div>	
				</div>
				
			</div>
		</>
	);
}
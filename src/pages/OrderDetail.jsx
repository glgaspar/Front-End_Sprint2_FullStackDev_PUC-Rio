import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem/CardItem";
import FiltroSelect from "../components/Filtros/FIltroSelect";
import TabelaSimples from "../components/Tabelas/TabelaSimples";
import BttnPadrao from "../components/Botoes/BttnPadrao";
import itemList from "../assets/orderItens.json";
import data from "../assets/orders.json";

function Pedido() {
	const [filtroProduto, setFiltroProduto] = useState([]);
	const [dados, setDados] = useState();
	const [itens, setItens] = useState([]);

	const numPed = window.location.search.slice(1);
	
	useEffect(() => {
		console.log(data.filter((i) => i.id === Number(numPed)));
		setDados(data.filter((i) => i.id === Number(numPed))[0]);
		setItens(itemList.filter((i) => i.id === Number(numPed)));
	}, []);

	const navigate = useNavigate()
	const routePedido = (props) => {
		// so navigate não reseta o estado dos
		window.location.replace(window.location.origin+window.location.pathname+`?${props.id}`);
    };


	console.log(window.location)
	const head = {
		id: "ID",
		cliente: "Cliente",
		valor: "Valor",
		data: "Data",
		receita: "Receita",
		UF: "UF",
	};

	const compravante = ()=>{
		setDados(prevDados =>{
			return{
				...prevDados, 
				status:1
			}
		})
	}

	function camadaFiltro() {
        let array = data
        if (filtroProduto.length >0){
            array = array?.filter((item) => {
                return filtroProduto.find((filtro)=>{
                    return item.produto === filtro.value
                })
            })
        }
        return array
    }

	return (
		<div className="m-5 grid lg:grid-cols-12 sm:grid-cols-4 gap-5 lg:col-start-2 lg:col-end-11 sm:m-5">
			<div className="lg:col-span-5 sm:col-span-5 lg:col-start-2 h-50 bg-component-whitesmoke p-5 rounded-xl shadow-md border border solid">
				<h3 className="text-center text-xl mb-2">
					Pedido Nº: {numPed}
					{dados?.status === 0 && <label
						htmlFor={"Receita"}
						className="text-xs ml-5 p-2 bg-element-blue text-white rounded-xl cursor-pointer hover:bg-accent-orange"
					>
						<input
							className="hidden"
							id={"Receita"}
							type="file"
							onChange={compravante}
						/>
						Adicionar Comprovante
					</label>}
				</h3>
				<hr className="border-accent-orange" />
				<div className="mt-5 mb-5 lg:grid lg:grid-cols-2 lg:gap-5">
					<div>
						<p className="mt-3">Cliente: {dados && dados.cliente}</p>
						<p className="mt-3">Data: {dados && dados.data}</p>
						<p className="mt-3">Status: {dados && dados.status}</p>
					</div>
					<div>
						<p className="mt-3">Médico: {dados && dados.medico}</p>
						<p className="mt-3">CRM: {dados && dados.crm}</p>
						<p className="mt-3">Receita: {dados && dados.receita}</p>
					</div>
				</div>
				<hr className="border-accent-orange" />
				<h3 className="text-center text-xl mb-5 mt-5">Itens:</h3>
				<div className="lg:m-3">
					{itens &&
						itens.map((item, index) => <CardItem data={item} key={index} />)}
				</div>
			</div>
			<div className="lg:col-span-5 sm:col-span-4 lg:col-start-7 grid lg:grid-cols-5 sm:grid-cols-4 h-50 p-5">
				<div className="lg:col-span-6 grid lg:grid-cols-6 sm:col-span-4 sm:grid-cols-4 lg:gap-5 sm:mb-10">
					<BttnPadrao texto="Novo Pedido" onClick={() => navigate("/novo")} />
				</div>
				{dados && (
					<>						
						<div className="lg:col-span-5 sm:col-span-4 lg:mt-10">
							<TabelaSimples
								dados={camadaFiltro(data).filter((i) => i.cliente === dados.cliente)}
								head={head}
								onClick={routePedido}
								altura="60vh"
							/>
						</div>
					</>
				)}
				
			</div>
		</div>
	);
}

export default Pedido;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TabelaSimples from "../components/Tabelas/TabelaSimples";
import FiltrosSelect from "../components/Filtros/FIltroSelect";
import BttnPadrao from "../components/Botoes/BttnPadrao";
import data from "../data/orders.json";

export default function Home() {
	const [compras, setCompras] = useState(data);
	const [filtroProduto, setFiltroProduto] = useState([]);
	const [filtroCliente, setFiltroCliente] = useState([])
    const [filtroEstado, setFiltroEstado] = useState([])

	let navigate = useNavigate(); 
    const routePedido = (props) => {
		const path = `/detalhe?${props.id}`
        navigate(path);
    };

	const head = {
		id: "ID",
		cliente: "Cliente",
		valor: "Valor",
		data: "Data",
	};

	function camadaFiltro() {
        let array = compras

        if (filtroProduto.length >0){
            array = array?.filter((item) => {
                return filtroProduto.find((filtro)=>{
                    return item.produto === filtro.value
                })
            })
        }
        if (filtroCliente.length >0){
            array = array?.filter((item) => {
                return filtroCliente.find((filtro)=>{
                    return item.cliente === filtro.value
                })
            })
        }
        if (filtroEstado.length >0){
            array = array?.filter((item) => {
                return filtroEstado.find((filtro)=>{
                    return item.estao === filtro.value
                })
            })
        }
        return array
    }

    const obj = camadaFiltro()

	return (
		<div className="m-5 grid grid-cols-12 gap-5 col-start-2 col-end-11">
			<div className="col-span-6 grid grid-cols-6 gap-5 col-start-2">
				<div className="col-span-2">
					<FiltrosSelect
						options={[]}
						chave={"Produto"}
						onChange={setFiltroProduto}
					/>
				</div>
				<div className="col-span-2">
					<FiltrosSelect
						options={[]}
						chave={"Produto"}
						onChange={setFiltroCliente}
					/>
				</div>
				<div className="col-span-2">
					<FiltrosSelect
						options={[]}
						chave={"Produto"}
						onChange={setFiltroEstado}
					/>
				</div>
			</div>
			<div className="col-span-6">
				{compras && <TabelaSimples dados={obj.filter(i=>i.status ===0)} head={head} altura="60vh" onClick={routePedido} />}
			</div>
            <div className="col-span-6">
				{compras && <TabelaSimples dados={obj.filter(i=>i.status ===1)} head={head} altura="60vh" onClick={routePedido} />}
			</div>
            <div className="col-span-6 grid grid-cols-6 gap-5 col-start-6">
                <BttnPadrao texto="Novo Pedido" onClick={()=>navigate('/new')} />
            </div>
		</div>
	);
}

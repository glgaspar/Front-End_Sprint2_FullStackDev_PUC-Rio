import React, { useEffect, useState, useCallback } from "react";
import BttnPadrao from "../components/Botoes/BttnPadrao";
import FiltroSelect from "../components/Filtros/FIltroSelect";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem/CardItem";
import toast from "react-hot-toast";
import axios from 'axios';

import { useDropzone } from "react-dropzone";
import { MdDeleteForever } from "react-icons/md";

// import clientes from "../assets/clientes.json";
// import listaItens from "../assets/itens.json";
import { APIData } from "../components/APIs/APIs";

export default function NewOrder() {
	const [cliente, setCliente] = useState();
	const [nomeMedico, setNomeMedico] = useState();
	const [nCrm, setNCrm] = useState();
	const [item, setItem] = useState();
	const [itens, setItens] = useState([]);
	const [produtos, setProdutos] = useState([]);
	const [qtd, setQtd] = useState(1);
	const [CEP, setCEP] = useState();
	const [optPay, setOptPay] = useState();
	const [file, setFile] = useState();
	const [bit, setBit] = useState();
	const [extension, setExtension] = useState();

	/////////////////////////// aqui faz a requisão para a API para pegar os itens que tem no estoque ///////////////////////
	useEffect(() => {
		APIData(sessionStorage.getItem('userToken'))
			.get("/produtos")
			.then((result) => {
				setProdutos(result.data.data);
			});
	}, []);

	/////////////////////////////////////////////////////////////////////////////////////////////////////

	/// Dropzone foi criado aqui, essa ferramenta faz um "uploade" do arquivo e pega os dados e armazena no useState para depois enviar os bits junto com as informações para o banco /////////////////////////////////////////////////////////////////////////////////////
	const onDrop = useCallback((files) => {
		setFile(files);
		files.forEach((file) => {
			const reader = new FileReader();

			reader.onabort = () => console.log("file reading was aborted");
			reader.onerror = () => console.log("file reading has failed");
			reader.onload = () => {
				// Do whatever you want with the file contents
				const binaryStr = reader.result;
				console.log(binaryStr);
				console.log(Object.keys(binaryStr));
				const teste = new Int8Array(binaryStr);
				const teste234 = new Uint8Array(binaryStr);
				const decoder = new TextDecoder("utf-8");
				const string2 = decoder.decode(teste);
				console.log(reader);
				console.log(typeof string2);
				console.log(teste234);
				const bytesArray = Array.from(teste234);
				console.log(bytesArray);
				setBit(bytesArray);
				const string = file.name;
				const ultimapalavra = file.name.lastIndexOf(".");
				if (ultimapalavra !== -1) {
					const substringAposUltimoPonto = string
						.substring(ultimapalavra + 1)
						.trim();
					const palavras = substringAposUltimoPonto.split(" ");
					const primeiraPalavraDepoisPonto = palavras[0];
					setExtension(primeiraPalavraDepoisPonto);
				}
			};
			reader.readAsArrayBuffer(file);
		});
	}, []);

	const offDrop = useCallback(() => {
		setFile(null);
	}, []);

	const dropzone = useDropzone({
		onDrop,
		accept: {
			"application/pdf": [".pdf"],
			"image/*": [".png", ".gif", ".jpeg", ".jpg"],
		},
	});

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Aqui pega o Nome do Usuario da sessão ////////
	// const user = JSON.parse(sessionStorage.getItem("user")).userName;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const infoItem =
		item && produtos.filter((i) => i.descricao === item.value)[0];

	////////////Aqui temos 2 funções uma que pega a quantidade do item e faz uma condicional, que se a qtd for igual a 1 sera retornado um valo
	///////////se a qtd for 2 sera retornado o vl 2, por causa dos descontos, se for uma certa quantidade tera um descondo no proço

	function handleVl(qauntidade) {
		if (item && qauntidade > 1) {
			return Number(infoItem.vl2);
		} else if (item && qauntidade === 1) {
			return Number(infoItem.vl1);
		}
	}

	function HndleSetQTD(soma) {
		if (qtd + soma > 0) {
			setQtd((setestadoQtd) => (setestadoQtd += soma));
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////// Aqui temos um handlesumit para o item, que pega os itens que foram adicionados e coloca essa informação em um useState

	const addItem = (e) => {
		e.preventDefault();
		const obj = {
			codItem: infoItem.codItem,
			produto: infoItem.descricao,
			quant: qtd,
			vr_unitario: handleVl(qtd),
			unidade: infoItem.uniVenda,
		};
		console.log(obj);
		setItens([...itens, obj]);
		setQtd(1);
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const calculaPrazo = (uf)=>{
		console.log(uf)
		switch(uf){
			case 'RJ' : return 1
			case ['SP', 'MG', 'ES'].includes(uf): return 2
			default: return 5
		}
	}

	///////Aqui temos um handle que cria um objeto para enviar para um post na API de criar novo pedido
	const navigate = useNavigate();
	const handleBttn = (flag) => {
		let pay
		if (flag === 1) {
			axios.get(`https://brasilapi.com.br/api/cep/v1/${CEP}`)
			.then((local)=>{
				console.log(local)
				if (cliente && itens.length > 0 && file && optPay.value) {
					switch(optPay.value){
						case 'Cartão' : pay = 8; break
						case 'Tranferência' : pay = 4; break
						default: pay = null; break
					}
					const newOrder = {
						vendedor:JSON.parse(sessionStorage.getItem('user')).email,
						cpf_cliente: cliente,
						id_forma_pagamento: 1,
						cod_formPg: pay,
						prazo_entrega: calculaPrazo(local.data.state),
						ordem_de_compra: "-",
						medico_nome: nomeMedico,
						estado:local.data.state,
						cidade:local.data.city,
						medico_crm: nCrm,
						itens: itens,
						receita: {
							nome: file[0].name,
							extensao: extension,
							arquivo: bit,
							tamanho: file[0].size,
						},
					};
					console.log(newOrder);
					APIData(JSON.parse(sessionStorage.getItem('userToken')))
						.post("/venda", newOrder)
						.then((result) => {
							console.log(result);
							toast.success("Pedido cadastrado com sucesso!");
							navigate("/home");
						})
						.catch(err => toast.error('Falha no registro do pedido. Favor entrar em contato com o administrador'));
				} else {
					toast.error("Dados necessários não foram preenchidos.");
				}
			})
			.catch(err => toast.error('CEP inválido.'))
		} else if (flag === 0) {
			console.log("Cancelado");
			navigate("/home");
		}
	};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////Função que tem uma condicional, que se não existir um arquivo ele retorna um span para ADICIONAR UMA RECEITA
	///////////E se existir um arquivo ele coloca o nome do arquivo
	function verifyFile(files) {
		if (!files) {
			return (
				<>
					<span>Adicionar Receita</span>
				</>
			);
		} else if (files) {
			return (
				<>
					<span>{files[0].name}</span>
				</>
			);
		}
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const removeItem = (index) => {
		setItens([...itens.slice(0, index), ...itens.slice(index + 1)]);
	};

	return (
		<div className="m-5 grid md:grid-cols-12 grid-cols-4 gap-y-5">
			<div className="md:col-span-10 col-span-4 grid md:grid-cols-10 grid-cols-4 md:col-start-2 bg-component-whitesmoke rounded-xl mb-15">
				<div className="mt-5 ml-5 mr-5 md:col-span-10 col-span-4 text-center text-xl">
					<h2 className="mb-3">Registro de novo pedido</h2>
					<hr className="border-accent-orange" />
				</div>
				<div className="mt-5 ml-5 mr-5 md:col-span-10 grid md:grid-cols-13 col-span-4 grid-cols-1 gap-5">
					<div name="div" className="md:col-span-2 grid">
						<p htmlFor="Vendedor">Vendedor:</p>
						<p name="Vendedor">{JSON.parse(sessionStorage.getItem('user')).user || ''}</p>
					</div>
					<div name="div" className="md:col-span-2 grid">
						<label htmlFor="Medico">Médico:</label>
						<input
							className="p-2 rounded-lg border border-solid w-4/5"
							name="Medico"
							type="text"
							value={nomeMedico}
							onChange={(e) => setNomeMedico(e.target.value)}
							required
						/>
					</div>
					<div name="div" className="md:col-span-2 grid">
						<label htmlFor="CRM">CRM:</label>
						<input
							className="p-2 rounded-lg border border-solid w-4/5"
							name="CRM"
							type="text"
							value={nCrm}
							maxLength="12"
							onChange={(e) => setNCrm(e.target.value)}
							required
						/>
					</div>
					<div name="div" className="md:col-span-2 grid">
						<label htmlFor="Cliente"> Cliente (CPF): </label>
						<input
							className="p-2 rounded-lg border border-solid w-4/5"
							name="Cliente"
							placeholder="Apenas números"
							type="text"
							value={cliente}
							onChange={(e) => setCliente(e.target.value)}
							maxLength="11"
							required
						/>
					</div>
					<div name="div" className="md:col-span-2 grid">
						<label htmlFor="Cliente"> CEP: </label>
						<input
							className="p-2 rounded-lg border border-solid w-4/5"
							name="cep"
							placeholder="Apenas números"
							type="text"
							value={CEP}
							onChange={(e) => setCEP(e.target.value)}
							maxLength="8"
							required
						/>
					</div>
					<div name="div" className="md:col-span-2 w-4/5 pt-3">
						<FiltroSelect
							placeholder="Forma de pagamento"
							id="Produto"
							multi={false}
							options={[
								{ id: 4, descricao: "Tranferência" },
								{ id: 8, descricao: "Cartão" },
							]}
							chave={"descricao"}
							onChange={setOptPay}
						/>
						{/* <label htmlFor="Pagamento">Forma de Pagamento</label>
						<select name="pagamento" id="pagamento" required onChange={(e) => setOptPay(e.target.value)}  >
							<option value="" disabled selected >Selecione uma opção</option>
							<option value="4">Tranferência</option>
							<option value="8">Cartão</option>
						</select> */}
					</div>
					<div
						name="div"
						className="md:col-span-8 md:mt-5 w-5/5"
						{...dropzone.getRootProps()}
					>
						<label
							htmlFor={"Receita"}
							className="text-sm col-span-2 p-3 bg-element-blue text-white rounded-xl cursor-pointer hover:bg-accent-orange"
						>
							<input {...dropzone.getInputProps()} />
							{verifyFile(file)}
						</label>
						{file && (
							<label
								htmlFor={"Receita"}
								className="bg-element-blue text-white rounded-xl cursor-pointer hover:bg-accent-orange"
							>
								<button type="button" onClick={offDrop}>
									{" "}
									<MdDeleteForever />
								</button>
							</label>
						)}
					</div>

					<hr className="border-accent-orange md:col-span-12" />
				</div>
				<form
					className="mt-5 ml-5 mr-5 md:col-span-10 col-span-4 grid md:grid-cols-6 grid-cols-4 gap-5"
					onSubmit={(e) => addItem(e)}
				>
					<div className="pt-2 md:col-span-1 col-span-4">
						{/* <label htmlFor="Produto">Produto: </label> */}
						{produtos.length > 0 && (
							<FiltroSelect
								placeholder="Produto"
								id="Produto"
								multi={false}
								options={produtos}
								chave={"descricao"}
								onChange={setItem}
							/>
						)}
					</div>
					<div className="md:col-span-1 col-span-2">
						<label htmlFor="EAN">
							EAN:
							<p className="pt-2" mame="EAN">{infoItem && infoItem.ean}</p>
						</label>
					</div>
					<div className="md:col-span-1 col-span-2">
						<label htmlFor="Unidade">
							Unidade:
							<p className="pt-2" mame="EAN">{infoItem && infoItem.uniVenda}</p>
						</label>
					</div>
					<div className="md:col-span-1 col-span-2">
						<label htmlFor="Quantidade">
							Quantidade:
							<div className="pt-1 grid grid-cols-[5%_30%_5%] gap-1">
								<span className="text-center text-xl hover:cursor-pointer" onClick={() => HndleSetQTD(-1)}>&#45;</span>
								<input
									className="p-2 text-center rounded-lg border border-solid appearance-none"
									mame="Quantidade"
									type="text"
									value={qtd}
									readOnly
								/>
								<span className="text-center text-xl hover:cursor-pointer" onClick={() => HndleSetQTD(1)}>&#43;</span>
							</div>
						</label>
					</div>
					<div className="md:col-span-1 col-span-2">
						<label htmlFor="Valor">
							Valor Unitário:
							<p className="pt-2">
								{qtd && handleVl(qtd)?.toLocaleString("pt-BR", {
									style: "currency",
									currency: "BRL",
								})}
							</p>
						</label>
					</div>
					<div className="md:col-span-1 col-span-2 grid m-3">
						<BttnPadrao texto="Adicionar" />
					</div>
					<hr className="border-accent-orange md:col-span-6 col-span-4" />
				</form>
				<div className="mt-5 ml-5 mr-5 md:col-span-10 col-span-4">
					<h4 className="text-center md:text-lg">Itens Inseridos</h4>
					{itens &&
						itens.map((item, index) => {
							return (
								<div
									key={index}
									className="md:col-span-10 col-span-4 grid md:grid-cols-10 md:gap-5"
								>
									<div className="md:col-span-9 col-span-4">
										<CardItem data={item} />
									</div>
									<div className="md:col-span-1 grid md:mt-5 col-span-2">
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
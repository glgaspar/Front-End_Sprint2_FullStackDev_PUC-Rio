import React, { useCallback, useState } from "react";

function TabelaSimples(props) {
	// Tabela de camada única
	/**
	 * dados -> dados a renderizar
	 * head -> correspondência do Object.keys(dados) com título a renderizar na coluna
	 * onClick -> função que executa clicando na linha da tabela
	 * money -> string ou string[] com Object.keys para formatar como R$xx.xx
	 * checkBox Object.key da coluna que vai ser controlada como checkbox. Por enquanto só há suporte a 1 coluna
	 *
	 */

	function sortData({ tableData, sortKey, reverse }) {
		if (!sortKey) return tableData;

		const sortedData = props.dados.sort((a, b) => {
			return a[sortKey] > b[sortKey] ? 1 : -1;
		});
		if (reverse) {
			return sortedData.reverse();
		}

		return sortedData;
	}

	// botao que define ordenacao das colunas
	function SortButton({ sortOrder, columnKey, sortKey }) {
		return (
			<button
				className={`bg-transparent text-[10px] text-[gray] cursor-pointer transition-transform duration-[0.05s] ease-[ease-out] m-0 border-[none]
                ${
									sortKey === columnKey && sortOrder === "desc"
										? "rotate-180"
										: ""
								}`}
			>
				{sortKey === columnKey ? "▲" : ""}
			</button>
		);
	}

	// controle de estados para saber se vai ordenar crescente ou decerescente
	const [sortKey, setSortKey] = useState(Object.keys(props.head)[0]);
	const [sortOrder, setSortOrder] = useState("ascn");
	function changeSort(key) {
		setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

		setSortKey(key);
	}

	// filtra dados para exibir na tabela apenas as colunas de interesse
	const titulos = Object.keys(props.head);
	const dadoTabela = props.dados.map((e) => {
		let obj = {};
		titulos.forEach((k) => (obj[k] = e[k]));
		return obj;
	});

	// manipulador que faz o callback para ordenar a tabela
	const sortedData = useCallback(
		() =>
			sortData({
				tableData: dadoTabela,
				sortKey,
				reverse: sortOrder === "desc",
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dadoTabela, sortKey, sortOrder]
	);

	// puxa nome das colunas
	const colunas = dadoTabela[0] && Object.keys(dadoTabela[0]);

	// formatador de colunas para tabela simples
	const formataColunas = (coluna, linhas, index) => {
		// formatador em R$xx,xx
		if (props.money && props.money.includes(coluna)) {
			return (
				<td
					className="hover:bg-[rgb(195,195,195)] border text-center text-xs p-1 border-l-[none] border-solid border-[#a1a1a14d] first:border first:border-l-[none] first:border-solid first:border-[#a1a1a14d] last:border last:border-r-[none] last:border-solid last:border-[#a1a1a14d]"
					key={index}
				>
					{linhas[coluna].toLocaleString("pt-br", {
						style: "currency",
						currency: "BRL",
					})}
				</td>
			);
		}
		// Formatador de checkbox
		if (props.checkBox && props.checkBox === coluna) {
			return (
				<td key={index}>
					{
						<input
							className="hover:bg-[rgb(195,195,195)] border text-center text-xs p-1 border-l-[none] border-solid border-[#a1a1a14d] first:border first:border-l-[none] first:border-solid first:border-[#a1a1a14d] last:border last:border-r-[none] last:border-solid last:border-[#a1a1a14d]"
							type="checkbox"
							checked={linhas[coluna]}
							onChange={() => handleOnChangeCheckbox(linhas)}
						/>
					}
				</td>
			);
		}
		if (props.dateTime?.includes(coluna)) {
			return (
				<td
					className="hover:bg-[rgb(195,195,195)] border text-center text-xs p-1 border-l-[none] border-solid border-[#a1a1a14d] first:border first:border-l-[none] first:border-solid first:border-[#a1a1a14d] last:border last:border-r-[none] last:border-solid last:border-[#a1a1a14d]"
					key={index}
				>
					{linhas[coluna].toLocaleString()}
				</td>
			);
		} else
			return (
				<td
					className="hover:bg-[rgb(195,195,195)] border text-center text-xs p-1 border-l-[none] border-solid border-[#a1a1a14d] first:border first:border-l-[none] first:border-solid first:border-[#a1a1a14d] last:border last:border-r-[none] last:border-solid last:border-[#a1a1a14d]"
					key={index}
				>
					{linhas[coluna]}
				</td>
			);
	};

	// handler para clickes na linha, se houver a funcionalidade
	const onClickHandler = (linhas) => {
		if (props.onClick) {
			props.onClick(linhas);
		}
	};
	// handler para clickes no checkbox, se houver a funcionalidade
	const handleOnChangeCheckbox = (linhas) => {
		if (props.onChangeCheckbox) {
			props.onChangeCheckbox(linhas);
		}
	};

	return (
		<div
			className="h-[75vh] overflow-y-scroll"
			style={{ maxHeight: props.altura ? props.altura : "none" }}
		>
			<table className="m-auto" cellPadding={0} cellSpacing={0}>
				<thead className="text-xs sticky top-0">
					<tr>
						{dadoTabela[0] &&
							colunas.map((titulo, index) => (
								<th
									className="min-w-[6vw] max-w-[13vw] text-center py-3 border-l-[none] border-r-[#a1a1a14d] border-r border-solid last:border-r-[none] cursor-pointer text-center bg-[white] p-1 border-b-[#0A5B9A] border-b border-solid overflow-wrap: break-word"
									key={index}
									onClick={() => changeSort(titulo)}
								>
									{props.head[titulo]}
									<SortButton
										columnKey={titulo}
										{...{
											sortOrder,
											sortKey,
										}}
									/>
								</th>
							))}
					</tr>
				</thead>
				<tbody className="max-h-8 overflow-y-scroll [&>*:nth-child(even)]:bg-[#f2f2f2]">
					{sortedData().map((linhas, index) => (
						<tr
							className="hover:bg-[#ddd]"
							key={index}
							onClick={() => onClickHandler(linhas)}
						>
							{colunas.map((coluna, index) =>
								formataColunas(coluna, linhas, index)
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default TabelaSimples;

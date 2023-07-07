import React, { useCallback, useState } from 'react';
import classes from './TabelaSimples.module.css'


function TabelaSimples(props){
    // Tabela de camada única
    /**
     * dados -> dados a renderizar
     * head -> correspondência do Object.keys(dados) com título a renderizar na coluna
     * onClick -> função que executa clicando na linha da tabela   
     * money -> string ou string[] com Object.keys para formatar como R$xx.xx
     * checkBox Object.key da coluna que vai ser controlada como checkbox. Por enquanto só há suporte a 1 coluna
     * 
    */
    
    function sortData({
        tableData,
        sortKey,
        reverse,
        }) {
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
        function SortButton({
            sortOrder,
            columnKey,
            sortKey,
            onClick,
        }) {
        return (
            <button
            onClick={onClick}
            className={
                sortKey === columnKey && sortOrder === "desc"
                ? classes['sort-button'] + " " + classes['sort-reverse']
                : classes['sort-button']
            }
            >
            ▲
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
    const titulos = Object.keys(props.head)
    const dadoTabela = props.dados.map((e) => {
        let obj = {};
        titulos.forEach((k) => obj[k] = e[k])
        return obj;
    });    
    
    // manipulador que faz o callback para ordenar a tabela
    const sortedData = useCallback(
        () => sortData({ tableData: dadoTabela, sortKey, reverse: sortOrder === "desc" }),
        [dadoTabela, sortKey, sortOrder]
    );  
    
    // puxa nome das colunas
    const colunas = dadoTabela[0] && Object.keys(dadoTabela[0])
    
    // formatador de colunas para tabela simples
    const formataColunas = (coluna, linhas, index)=>{
        // formatador em R$xx,xx
        if (props.money && props.money.includes(coluna)) {
            return <td key={index}>
                    {linhas[coluna].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </td>
            }      
        // Formatador de checkbox
        if (props.checkBox && props.checkBox===coluna) {
            return <td key={index}>
                    {<input type="checkbox" checked={linhas[coluna]} onChange={() => handleOnChangeCheckbox(linhas)} />}
                    </td>
            }       
        else return <td key={index}>{linhas[coluna]}</td>
    }

    // handler para clickes na linha, se houver a funcionalidade
    const onClickHandler = (linhas) =>{
        if (props.onClick) {props.onClick(linhas)}
    }
    // handler para clickes no checkbox, se houver a funcionalidade
    const handleOnChangeCheckbox = (linhas) =>{
        if (props.onChangeCheckbox) {props.onChangeCheckbox(linhas)}
    }
    

    return(             
            <div className={classes.containerTabela} style={{maxHeight: props.altura ? props.altura : 'none'}}>
                <table className={classes.tabela} cellPadding={0} cellSpacing={0}>
                    <thead>
                        <tr>
                            {
                                dadoTabela[0] && colunas.map((titulo, index) => 
                                    <th key={index}>
                                        { props.head[titulo]}
                                        <SortButton
                                            columnKey={titulo}
                                            onClick={() => changeSort(titulo)}
                                            {...{
                                                sortOrder,
                                                sortKey,
                                            }}
                                        />
                                    </th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData().map((linhas, index) =>
                                            <tr className={classes.linha} key={index} onClick={() =>onClickHandler(linhas)}>
                                                {
                                                    colunas.map((coluna, index) => formataColunas(coluna, linhas, index))
                                                }
                                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
    )
}

export default TabelaSimples;
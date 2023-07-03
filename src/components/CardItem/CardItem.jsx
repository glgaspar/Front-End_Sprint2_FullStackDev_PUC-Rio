import React from 'react'

export default function CardItem(props) {
    return(
        <div className="m-2 w-full rounded-xl bg-white border border-solid border-black-500 hover:shadow-md">                          
            <div className="p-2">
                <h4 className='text-center'>{props.data.produto}</h4> 
                <div className="grid grid-cols-5 text-xs">
                    <div>
                        <p>Ean: {props.data.ean}</p> 
                        <p>Lote: {props.data.lote}</p>
                        
                    </div>
                    <div>
                        <p>Valor Unitário: {props.data.vlunit.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                        
                    </div>
                    <div>
                        <p>Unidade: {props.data.unid}</p>  
                        
                    </div>
                    <div>
                        <p>QTD: {props.data.qtd}</p>
                    </div>
                    <div>
                        <p>Total: {props.data.vltotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>
            </div>
        </div>
        )
}

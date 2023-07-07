import React from 'react'

export default function CardItem({data}) {
    return(
        <div className="m-2 w-full rounded-xl bg-white border border-solid border-gray-400 hover:shadow-md">                          
            <div className="lg:p-2">
                <h4 className='text-center'>{data.produto}</h4> 
                <div className="text-sm text-center grid grid-cols-4 lg:mt-3">
                    <div className=' lg:border-r lg:border-solid lg:border-gray-400 lg:col-span-1 col-span-2'>
                        <p>Valor Unitário:</p>
                        <p>{Number(data.vlunit).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    <div className=' lg:border-r lg:border-solid lg:border-gray-400 lg:col-span-1 col-span-2'>
                        <p>Unidade:</p>  
                        <p>{data.unid}</p>
                    </div>
                    <div className=' lg:border-r lg:border-solid lg:border-gray-400 lg:col-span-1 col-span-2'>
                        <p>QTD:</p>
                        <p>{Number(data.qtd)}</p>
                    </div>
                    <div className=' lg:col-span-1 col-span-2'>
                        <p>Total:</p>
                        <p>{Number(data.vltotal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>
            </div>
        </div>
        )
}

import React from 'react'

export default function CardItem({data}) {
    return(
        <div className="m-2 w-full rounded-xl bg-white border border-solid border-gray-400 hover:shadow-md">                          
            <div className="md:p-2">
                <h4 className='text-center m-2'>{data.produto}</h4> 
                <div className="text-sm text-center grid grid-cols-4 md:mt-3">
                    <div className='border-r border-solid border-gray-400 lg:col-span-1 col-span-2 m-2'>
                        <p>Valor Unitário:</p>
                        <p>{Number(data.vr_unitario).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    <div className='lg:border-r lg:border-solid lg:border-gray-400 lg:col-span-1 col-span-2 m-2'>
                        <p>Unidade:</p>  
                        <p>{data.unidade}</p>
                    </div>
                    <hr className='col-span-4 mr-2 ml-2 md:hidden'/>
                    <div className='border-r border-solid border-gray-400 lg:col-span-1 col-span-2 m-2'>
                        <p>QTD:</p>
                        <p>{Number(data.quant)}</p>
                    </div>
                    <div className='lg:col-span-1 col-span-2 m-2'>
                        <p>Total:</p>
                        <p>{Number(data.vr_unitario * data.quant).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </div>
            </div>
        </div>
        )
}

import React, { useState } from "react";

export default function BttnDialog(props) {
	const [aberto, setAberto] = useState(false);

	const handleBttn = () => {
		props.onClick();
		setAberto(!aberto);
	};


	return (
		<div>
			<span  onClick={() => setAberto(!aberto)}>{props.texto}</span>
			<dialog
				open={aberto}
				className="z-50 fixed m-auto border rounded-xl bg-component-whitesmoke hover:cursor-default shadow-md"
			>
				<h1 className="mt-5">{props.mensagem}</h1>
					<div className="grid grid-flow-col gird-cols-2 gap-5 m-5">
                    <button
							className="border rounded-xl p-1 text-xs bg-element-blue text-white w-25 hover:bg-accent-orange hovevr:curso-pointer"
                            onClick={()=>setAberto(!aberto)}
						>
							Cancelar
						</button>
						<button
							className="border rounded-xl p-1 text-xs bg-element-blue text-white w-25 hover:bg-accent-orange hovevr:curso-pointer"
							onClick={handleBttn}
						>
							Confirmar
						</button>
						
					</div>
			</dialog>
		</div>
	);
}

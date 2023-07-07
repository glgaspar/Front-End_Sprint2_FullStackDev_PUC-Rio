export default function BttnPadrao({ texto, onClick }) {
	return (
		<>
			<button
				className="text-sm col-span-2 h-10 p-2 bg-element-blue text-white rounded-xl cursor-pointer hover:bg-accent-orange"
				onClick={onClick}
			>
				{texto}
			</button>
		</>
	);
}

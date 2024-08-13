interface Props {
	getSelect: (item: string) => void;
	selectOption: string;
};

const ItemGroupSelect: React.FC<Props> = ({ getSelect, selectOption }) => {
	return (
		<div onClick={() => getSelect(selectOption)} className="select-item truncate">
			{selectOption}
		</div>
	);
};

export default ItemGroupSelect;
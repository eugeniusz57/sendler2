interface Props {
	getSelect: (item: string) => void;
	selectOption: string;
}

const ItemGroupSelect = ({ getSelect, selectOption }: Props) => {
	return (
		<div onClick={() => getSelect(selectOption)} className="select-item truncate">
			{selectOption}
		</div>
	)
}

export default ItemGroupSelect
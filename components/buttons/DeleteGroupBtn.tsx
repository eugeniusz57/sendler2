import { deleteGroup } from "@/fetch-actions/groupsFetchActions";

type Props = {
	id: number;
	getGroups: () => void,
	children: React.ReactNode;
};

const DeleteGroupBtn: React.FC<Props> = ({ id, getGroups, children }) => {

	const handleClick = async () => {
		await deleteGroup(id);
		getGroups();
	}

	return (
		<button type="button" onClick={handleClick} className="row-table__btn">
			{children}
		</button>
	);
};

export default DeleteGroupBtn;

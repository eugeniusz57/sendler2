import Link from "next/link";

type Props = {
	id: number;
	children: React.ReactNode;
};

const ManageContactBtn: React.FC<Props> = ({ id, children }) => {

	return (
		<Link href={`admin/${id}/edit`} className="row-table__btn md:mr-2 block md:mb-2 lg:mb-0 lg:inline ">
			{children}
		</Link>
	);
};

export default ManageContactBtn;
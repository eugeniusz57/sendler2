import Link from 'next/link';

type Props = {
	id: number;
	children: React.ReactNode;
};

const DetailBtn: React.FC<Props> = ({ id, children }) => {
	return (
		<Link href={`admin/${id}/detail`} className="row-table__btn px-1 md:px-2 block lg:inline ">
			{children}
		</Link>
	);
};

export default DetailBtn;

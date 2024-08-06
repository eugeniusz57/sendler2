import Link from "next/link";

import { useSession } from "next-auth/react";

type Props = {
	id: number;
	children: React.ReactNode;
};

const UpdateGroupBtn: React.FC<Props> = ({ id, children }) => {
	const { data: session } = useSession();
	const userId = session?.user.user_id;

	return (
		<Link href={`/user/${userId}/groups/${id}/edit`} className="row-table__btn">
			{children}
		</Link>
	);
};

export default UpdateGroupBtn;
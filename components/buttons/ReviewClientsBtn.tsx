import Link from "next/link";
import GreenButton from "./GreenButton";

type Props = {
	id: number | undefined;
	children: React.ReactNode;
};

const ReviewClientsBtn: React.FC<Props> = ({ id, children }) => {

	return (
		<GreenButton size="normal">
			<Link href={`/user/${id}/clients`}>
				{children}
			</Link>
		</GreenButton>
	);
};

export default ReviewClientsBtn;
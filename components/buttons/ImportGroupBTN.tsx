'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';

type Props = {
	id: number;
	children: React.ReactNode;
};

const ImportGroupBtn: React.FC<Props> = ({ id, children }) => {
	const { data: session } = useSession();
	const userId = session?.user.user_id;
	const locale = useLocale();

	return (
		<Link href={`/${locale}/user/${userId}/groups/${id}/update`} className="row-table__btn">
			{children}
		</Link>
	);
};

export default ImportGroupBtn;
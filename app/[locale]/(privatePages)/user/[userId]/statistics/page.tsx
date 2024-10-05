import { getServerSession } from "next-auth";
import { getTranslations } from 'next-intl/server';

import { options } from "@/app/api/auth/[...nextauth]/options";
import Title from "@/components/Title";
import HistoryTable from "@/components/HistoryTable";
import { ISession } from "@/globaltypes/types";

const SendingHistory: React.FC = async () => {
	const session: ISession | null = await getServerSession(options);
	const userId = session?.user.user_id;
	const t = await getTranslations('StatisticsPage');

	return (
		<>
			<Title type="h1" color="dark">
				{t('pageTitle')}
			</Title>
			<div className="mt-[60px]">
				<HistoryTable id={userId} />
			</div>
		</>
	);
}


export default SendingHistory;
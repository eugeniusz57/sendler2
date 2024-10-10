

import { ISession } from "@/globaltypes/types";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import UserSmsBalansInform from "@/components/UserSmsBalansInform";
import { options } from "../../api/auth/[...nextauth]/options";

export const metadata: Metadata = {
	title: "BSender",
	description: "BSender sms sending application",
};

interface Props {
	children: React.ReactNode;
};

const RootLayout: React.FC<Props> = async ({
	children,
}) => {
	const session: ISession | null = await getServerSession(options);
	return (
		<main className="w-full pt-6 md:pt-[50px] md:pb-20 pb-[50px] flex flex-col items-center bg-white dark:bg-bgDark">
			<section className="container">
				{session?.user.user_role === 'user' && <UserSmsBalansInform session={session} />}
				{children}
			</section>
		</main>
	);
};

export default RootLayout;
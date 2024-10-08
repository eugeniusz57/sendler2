import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "BSender",
	description: "BSender sms sending application",
};

interface Props {
	children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({
	children,
}) => {
	return <main className="w-full pt-[50px] pb-[50px] md:pb-20 flex flex-col items-center">{children}</main>;
};

export default RootLayout;

import "./globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from 'next-intl';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Providers from "@/components/providers/Providers";
import ToastProvider from "@/components/providers/TostifyProvider";
import BackToTopBtn from "@/components/buttons/BackToTopBtn";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "BSender",
	description: "BSender sms sending application",
};

interface Props {
	children: React.ReactNode;
	params: { locale: string };
};

const LocaleLayout: React.FC<Props> = ({ children, params: { locale } }) => {
	const messages = useMessages();

	return (
		<html lang={locale}>
			<body className="flex flex-col items-center min-h-screen">
				<Providers>
					<Toaster />
					<ToastProvider>
						<NextIntlClientProvider locale={locale} messages={messages}>
							<Header />
							{children}
							<Footer />
						</NextIntlClientProvider>
						<BackToTopBtn />
					</ToastProvider>
				</Providers>
			</body>
		</html>
	);
};

export default LocaleLayout;
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'next-client-cookies/server';
import { Toaster } from '@/components/ui/toaster';
import { ToasterSonner } from '@/components/ui/sonner';
import Header from '@/components/header/Header';
import { Suspense } from 'react';
import VerifyAccountBanner from '@/components/auth/VerifyAccountBanner';
import auth from '@/utils/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'RentR - manage your rental properties',
	description: 'RentR is a property management platform that helps you manage your rental properties',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const user = await auth.getUser();
	// Print the users labels
	if (user) {
		console.log(user.labels);
	}
	

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<CookiesProvider>
					<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
						<VerifyAccountBanner />
						<Header />
						{children}
						<Toaster />
						<ToasterSonner richColors />
					</ThemeProvider>
				</CookiesProvider>
			</body>
		</html>
	);
}

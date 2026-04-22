import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/ui/molecues/Header";
import { BottomNav } from "@/ui/molecues/BottomNav";
import { Toast } from "@heroui/react";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { plPL } from "@clerk/localizations";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Wynniczek",
	description: "Wynniczek - aplikacja do zarządzania wynikami gier planszowych",
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/jpeg" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/jpeg" },
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/jpeg" }],
		other: [
			{ rel: "icon", url: "/android-icon-192x192.png", sizes: "192x192", type: "image/jpeg" },
		],
	},
	manifest: "/manifest.json",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider localization={plPL} afterSignOutUrl="/sign-in">
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0`}
				>
					<Providers>
						<Toast.Provider />
						<Header />
						{children}
						<BottomNav />
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}

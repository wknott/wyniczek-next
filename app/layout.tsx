import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/ui/molecues/Header";

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
		<html lang="en" className="dark" data-theme="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}

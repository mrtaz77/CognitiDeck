import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "CognitiDeck",
	description: "Flashcard SaaS",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning={true} className={inter.className}>{children}</body>
		</html>
	);
}

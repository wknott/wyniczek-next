import { buttonVariants } from "@heroui/styles";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex min-h-[80vh] flex-col items-center justify-center gap-4 p-4 text-center">
			<h1 className="text-muted text-6xl font-extrabold">404</h1>
			<p className="text-muted text-lg">Nie znaleziono strony</p>
			<Link href="/" className={buttonVariants({ variant: "primary" })}>
				Strona główna
			</Link>
		</main>
	);
}

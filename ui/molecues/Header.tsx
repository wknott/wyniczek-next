import Link from "next/link";
import Image from "next/image";

export const Header = () => (
	<header className="sticky top-0 z-10 border-b border-slate-700/50">
		<div className="flex items-center justify-between px-4 py-4">
			<Link href="/">
				<Image src="/header-logo.svg" alt="Wynniczek" width={160} height={56} />
			</Link>
			<nav className="flex gap-4">
				<Link
					href={"/results" as any}
					className="text-sm font-medium transition-colors hover:text-blue-500"
				>
					Historia
				</Link>
				<Link
					href={"/games" as any}
					className="text-sm font-medium transition-colors hover:text-blue-500"
				>
					Gry
				</Link>
				<Link
					href={"/games/new" as any}
					className="text-sm font-medium transition-colors hover:text-blue-500"
				>
					Dodaj grę
				</Link>
				<Link
					href={"/players/new" as any}
					className="text-sm font-medium transition-colors hover:text-blue-500"
				>
					Dodaj gracza
				</Link>
			</nav>
		</div>
	</header>
);

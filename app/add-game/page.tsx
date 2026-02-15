import { AddGameForm } from "@/ui/organisms/AddGameForm";

export default function AddGamePage() {
    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-4 md:p-8">
            <div className="w-full">
                <AddGameForm />
            </div>
        </main>
    );
}

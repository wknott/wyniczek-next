import { AddPlayerForm } from "@/ui/organisms/AddPlayerForm";

export default function AddPlayerPage() {
    return (
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center gap-6 p-4 md:p-8">
            <div className="w-full">
                <AddPlayerForm />
            </div>
        </main>
    );
}

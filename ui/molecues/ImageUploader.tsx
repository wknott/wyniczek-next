"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Label } from "@heroui/react";
import { Xmark, Picture, TriangleExclamation } from "@gravity-ui/icons";
import { useUploadThing } from "@/ui/atoms/Uploadthing";

export type UploadedImage = {
	key: string;
	url: string;
};

interface ImageUploaderProps {
	value: UploadedImage[];
	onChange: (images: UploadedImage[]) => void;
	maxFiles?: number;
}

const MAX_SIZE_MB = 8;

export const ImageUploader = ({ value, onChange, maxFiles = 10 }: ImageUploaderProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [progress, setProgress] = useState<number>(0);

	const { startUpload, isUploading } = useUploadThing("resultImageUploader", {
		onClientUploadComplete: (res) => {
			const newImages = res.map((r) => ({ key: r.key, url: r.ufsUrl }));
			onChange([...value, ...newImages]);
			setError(null);
			setProgress(0);
		},
		onUploadError: (err) => {
			setError(err.message || "Nie udało się przesłać zdjęć");
			setProgress(0);
		},
		onUploadProgress: (p) => {
			setProgress(p);
		},
	});

	const handleFiles = (files: FileList | File[]) => {
		setError(null);
		const arr = Array.from(files);

		if (arr.length === 0) {
			setError("Nie wybrano żadnego pliku");
			return;
		}

		const remaining = maxFiles - value.length;
		if (remaining <= 0) {
			setError(`Osiągnięto limit ${maxFiles} zdjęć`);
			return;
		}

		const limited = arr.slice(0, remaining);
		const skipped = arr.length - limited.length;

		const valid: File[] = [];
		const errors: string[] = [];

		for (const file of limited) {
			const isImageMime = file.type === "" || file.type.startsWith("image/");
			if (!isImageMime) {
				errors.push(`${file.name || "plik"}: to nie jest obrazek`);
				continue;
			}
			if (file.size > MAX_SIZE_MB * 1024 * 1024) {
				const sizeMb = (file.size / 1024 / 1024).toFixed(1);
				errors.push(`${file.name || "plik"}: ${sizeMb} MB (max ${MAX_SIZE_MB} MB)`);
				continue;
			}
			valid.push(file);
		}

		if (skipped > 0) errors.push(`Pominięto ${skipped} (limit ${maxFiles})`);

		if (valid.length === 0) {
			setError(errors.join(" · ") || "Nie udało się odczytać plików");
			return;
		}

		if (errors.length > 0) setError(errors.join(" · "));
		void startUpload(valid);
	};

	const handleRemove = (key: string) => {
		onChange(value.filter((img) => img.key !== key));
	};

	const canAddMore = value.length < maxFiles && !isUploading;

	return (
		<div className="space-y-3">
			<Label>
				Zdjęcia ({value.length}/{maxFiles})
			</Label>

			{canAddMore && (
				<label
					onDragOver={(e) => {
						e.preventDefault();
						setIsDragging(true);
					}}
					onDragLeave={() => setIsDragging(false)}
					onDrop={(e) => {
						e.preventDefault();
						setIsDragging(false);
						handleFiles(e.dataTransfer.files);
					}}
					className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
						isDragging
							? "border-accent bg-accent/10"
							: "border-border hover:border-accent hover:bg-muted"
					}`}
				>
					<Picture className="size-8 text-muted" />
					<div className="text-sm">
						<span className="font-semibold">Kliknij</span> lub przeciągnij zdjęcia
					</div>
					<div className="text-xs text-muted">JPG, PNG, WEBP, HEIC · max {MAX_SIZE_MB} MB</div>
					<input
						type="file"
						accept="image/*"
						multiple
						className="sr-only"
						disabled={isUploading}
						onChange={(e) => {
							const files = e.target.files;
							if (files && files.length > 0) handleFiles(files);
							e.target.value = "";
						}}
					/>
				</label>
			)}

			{isUploading && (
				<div className="space-y-1">
					<div className="flex items-center justify-between text-sm">
						<span>Przesyłanie…</span>
						<span className="text-muted">{progress}%</span>
					</div>
					<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
						<div
							className="h-full bg-accent transition-all"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
			)}

			{error && (
				<div className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
					<TriangleExclamation className="mt-0.5 size-4 flex-shrink-0" />
					<div className="flex-1 break-words">{error}</div>
					<button
						type="button"
						onClick={() => setError(null)}
						className="text-danger/70 hover:text-danger"
						aria-label="Zamknij"
					>
						<Xmark />
					</button>
				</div>
			)}

			{value.length > 0 && (
				<div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
					{value.map((img) => (
						<div
							key={img.key}
							className="relative aspect-square overflow-hidden rounded-lg border border-border"
						>
							<Image
								src={img.url}
								alt=""
								fill
								sizes="(max-width: 640px) 33vw, 25vw"
								className="object-cover"
							/>
							<Button
								type="button"
								size="sm"
								variant="danger"
								isIconOnly
								className="absolute top-1 right-1"
								onClick={() => handleRemove(img.key)}
							>
								<Xmark />
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

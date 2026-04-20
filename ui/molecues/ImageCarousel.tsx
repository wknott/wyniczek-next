"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

type CarouselImage = {
	id: string;
	url: string;
};

interface ImageCarouselProps {
	images: CarouselImage[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
	const [selectedIndex, setSelectedIndex] = useState(0);

	const scrollTo = useCallback(
		(index: number) => emblaApi?.scrollTo(index),
		[emblaApi],
	);

	useEffect(() => {
		if (!emblaApi) return;
		const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
		onSelect();
		emblaApi.on("select", onSelect);
		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	if (images.length === 0) return null;

	if (images.length === 1) {
		return (
			<div className="w-full overflow-hidden rounded-lg">
				<Image
					src={images[0].url}
					alt=""
					width={0}
					height={0}
					sizes="(max-width: 768px) 100vw, 768px"
					className="h-auto w-full"
					priority
				/>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<div className="relative">
				<div className="overflow-hidden rounded-lg" ref={emblaRef}>
					<div className="flex">
						{images.map((img) => (
							<div key={img.id} className="min-w-0 flex-[0_0_100%]">
								<Image
									src={img.url}
									alt=""
									width={0}
									height={0}
									sizes="(max-width: 768px) 100vw, 768px"
									className="h-auto w-full"
								/>
							</div>
						))}
					</div>
				</div>

				<Button
					type="button"
					size="sm"
					variant="secondary"
					isIconOnly
					aria-label="Poprzednie zdjęcie"
					className="absolute top-1/2 left-2 -translate-y-1/2 bg-background/80 backdrop-blur"
					onClick={() => emblaApi?.scrollPrev()}
				>
					<ChevronLeft />
				</Button>
				<Button
					type="button"
					size="sm"
					variant="secondary"
					isIconOnly
					aria-label="Następne zdjęcie"
					className="absolute top-1/2 right-2 -translate-y-1/2 bg-background/80 backdrop-blur"
					onClick={() => emblaApi?.scrollNext()}
				>
					<ChevronRight />
				</Button>
			</div>

			<div className="flex gap-2 overflow-x-auto">
				{images.map((img, i) => (
					<button
						key={img.id}
						type="button"
						onClick={() => scrollTo(i)}
						className={`relative size-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
							i === selectedIndex ? "border-accent" : "border-transparent opacity-60"
						}`}
					>
						<Image src={img.url} alt="" fill sizes="64px" className="object-cover" />
					</button>
				))}
			</div>
		</div>
	);
};

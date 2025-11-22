export const GameImage = ({ src, alt }: { src: string; alt: string }) => {
	return (
		<img src={src} alt={alt} width="64px" height="64px" className="object-cover object-center" />
	);
};

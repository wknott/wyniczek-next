import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "*.ufs.sh" },
			{ protocol: "https", hostname: "utfs.io" },
		],
	},
	async redirects() {
		return [
			{
				source: "/wyniki",
				destination: "/wyniki/1",
				permanent: true,
			},
		];
	},
};

export default nextConfig;

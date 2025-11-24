import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
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

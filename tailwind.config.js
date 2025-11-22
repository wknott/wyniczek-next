module.exports = {
	content: [
		"./pages/**/*.{ts,tsx,js,jsx}",
		"./app/**/*.{ts,tsx,js,jsx}",
		"./components/**/*.{ts,tsx,js,jsx}",
		"./ui/**/*.{ts,tsx,js,jsx}", // include your ui folder (watch spelling: "molecues" vs "molecules")
		"./**/*.{ts,tsx,js,jsx,html}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};

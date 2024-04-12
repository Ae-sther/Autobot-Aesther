const axios = require('axios');

module.exports.config = {
		name: "Ai",
		version: 1.0,
		credits: "OtinXSandip",
		description: "AI",
		hasPrefix: false,
		usages: "{pn} [prompt]",
		aliases: ["megan","AE"],
		cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
		try {
				const prompt = args.join(" ");
				if (!prompt) {
						await api.sendMessage("🌱𝘼𝙆𝘼𝙄🌱\n\n 𝘾𝙃𝘼𝙏𝘽𝙊𝙏 𝘾𝙊𝙈𝙈𝙐𝙉𝘼𝙐𝙏𝙔 𝘼 𝙑𝙊𝙏𝙍𝙀 𝙎𝙀𝙍𝙑𝙄𝘾𝙀 😺 ", event.threadID);
						return;
				}

				const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
				const answer = response.data.answer;

				await api.sendMessage(answer, event.threadID);
		} catch (error) {
				console.error("Error:", error.message);
		}
};

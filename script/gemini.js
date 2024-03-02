const axios = require('axios');

module.exports.config = {
		name: "gemini",
		version: "1.0.0",
		credits: "dipto",
		role: 0,
		description: "Get a response from gemini AI",
		hasPrefix: false,
		usages: "{p}gemini [prompt]",
		cooldown: 0,
		aliases: ["gem"]
};

module.exports.run = async ({ api, event, args }) => {
		if (!args[0]) return api.sendMessage("Please provide a prompt after '{p}gemini'. For example: {p}gemini What is the capital of France?", event.threadID, event.messageID);

		try {
				const prompt = args.join(' ');
				const response = await axios.get(`https://openai-rest-api.vercel.app/hercai?model=gemini&ask=${encodeURIComponent(prompt)}`);
				const answer = response.data.answer;
				api.sendMessage(answer, event.threadID, event.messageID);
		} catch (error) {
				console.error("Error fetching response from Gemini AI:", error);
				api.sendMessage("An error occurred while fetching the response. Please try again later.", event.threadID, event.messageID);
		}
};

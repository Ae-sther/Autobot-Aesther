const axios = require('axios');

module.exports.config = {
		name: "turbo",
		version: "1.0.0",
		credits: "duck",
		hasPrefix: false,
		description: "Get a response from GPT-3.5 Turbo.",
		aliases: [],
		usages: "",
		cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
		const query = args.join(" ");
		try {
				const response = await axios.post('https://api-turtle.onrender.com/api/chat', { query });
				const answer = response.data.answer;
				api.sendMessage(answer, event.threadID);
		} catch (error) {
				console.error("Error fetching response from GPT-3.5 Turbo:", error);
				api.sendMessage("Sorry, I couldn't fetch a response at the moment.", event.threadID);
		}
};

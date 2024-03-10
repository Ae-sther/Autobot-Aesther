const axios = require("axios");

module.exports.config = {
		name: "gpt99",
		version: "1.0.0",
		credits: "cliff",
		role: 0,
		description: "Chat with ChatGPT.",
		hasPrefix: false,
		usages: "{pn}",
		cooldown: 5,
		aliases: []
};

module.exports .run = async function ({ api, event, args }) {
		try {
				const query = args.join(" ");
				const response = await axios.get(`https://worker-quiet-pond-d88c.cliffjutsko.workers.dev/search?q=${encodeURIComponent(query)}`);

				if (response.status === 200) {
						const answer = response.data;
						api.sendMessage(answer, event.threadID);
				} else {
						api.sendMessage("Sorry, I couldn't fetch a response at the moment.", event.threadID);
				}
		} catch (error) {
				console.error("Error:", error);
				api.sendMessage("Sorry, an error occurred while processing your request.", event.threadID);
		}
};
const axios = require("axios");

module.exports.config = {
		name: "claude",
		version: "1.0.0",
		credits: "dipto",
		role: 0,
		description: "",
		hasPrefix: false,
		usages: "",
		cooldown: 5,
		aliases: []
};

const handleEvent = async function ({ api, event }) {
		const { body, threadID, messageID } = event;
		const input = body.trim();
		const message = input.split(" ");

		if (message[0].toLowerCase() === "claude") {
				if (message.length < 2) {
						api.sendMessage("Please provide a question", threadID, messageID);
				} else {
						try {
								message.shift();
								const ask = message.join(" ");
								api.sendMessage(`Please wait a moment while I process your request: ${ask}`, threadID, messageID);

								// You can replace the API URL below with the desired API endpoint
								const response = await axios.get(`https://hazee-claude-ai-5b3176a38696.herokuapp.com/claude?q=${encodeURIComponent(ask)}`);
								api.sendMessage(response.data, threadID, messageID);
						} catch (error) {
								console.error(error);
								api.sendMessage("An error occurred while fetching the response.", threadID, messageID);
						}
				}
		}
};

module.exports = { config, handleEvent };

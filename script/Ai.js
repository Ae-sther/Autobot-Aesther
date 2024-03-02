const axios = require('axios');

module.exports.config = {
		name: "Ai",
		version: "1.0.0",
		role: 0,
		credits: "Eugene Aguilar",
		description: "Interacts with a GPT-4 API",
		cooldown: 5,
		hasPrefix: false,
		aliases: [""],
		usages: "",
};

module.exports.run = async function ({ api, event }) {
		const args = event.body.split(/\s+/);
		args.shift(); // Remove the command itself from the arguments

		// Check if there are arguments
		if (args.length === 0) {
				api.sendMessage("Please provide a question or prompt.", event.threadID, event.messageID);
				return;
		}

		const apiUrl = `https://hiro-api.replit.app/ai/hercai?ask=${encodeURIComponent(args.join(' '))}`;

		try {
				const response = await axios.get(apiUrl);

				// Check if the API response contains valid data
				if (response.status === 200 && response.data && response.data.trim() !== "") {
						const answer = response.data.trim();
						api.sendMessage(answer, event.threadID, event.messageID);
				} else {
						console.error("Invalid or empty AI response");
						api.sendMessage("Invalid or empty AI response", event.threadID, event.messageID);
				}
		} catch (error) {
				console.error("Error fetching AI response:", error);
				api.sendMessage("Error fetching AI response", event.threadID, event.messageID);
		}
};

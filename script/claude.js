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

module.exports.run = async function ({ api, event, args }) {
		const { body, threadID, messageID } = event;

		if (args.length < 1) {
				api.sendMessage("Please provide a question for Claude AI.", threadID, messageID);
				return;
		}

		try {
				const question = args.join(" ");
				api.sendMessage(`Please wait a moment while I process your request: ${question}`, threadID, messageID);

				const response = await axios.get(`https://hazee-claude-ai-5b3176a38696.herokuapp.com/claude?q=${encodeURIComponent(question)}`);
				api.sendMessage(response.data, threadID, messageID);
		} catch (error) {
				console.error(error);
				api.sendMessage("An error occurred while fetching the response.", threadID, messageID);
		}
};

const axios = require("axios");

module.exports.config = {
		name: "claude",
		version: "1.0.0",
		credits: "hazey",
		role: 0,
		description: "Claude ai",
		hasPrefix: false,
		usages: "{pn} ask",
		cooldown: 5,
		aliases: ["cla"]
};

module.exports.run = async function ({ api, event, args }) {
		const { body, threadID, messageID } = event;

		if (args.length < 1) {
				api.sendMessage("Please provide a question for Claude AI.", threadID, messageID);
				return;
		}

		try {
				const question = args.join(" ");
				api.sendMessage(`𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁 𝗮 𝗺𝗼𝗺𝗲𝗻𝘁 𝘄𝗵𝗶𝗹𝗲 𝗜 𝗽𝗿𝗼𝗰𝗲𝘀𝘀 𝘆𝗼𝘂𝗿 𝗿𝗲𝗾𝘂𝗲𝘀𝘁: ${question}...`, threadID, messageID);

				const response = await axios.get(`https://hazee-claude-ai-5b3176a38696.herokuapp.com/claude?q=${encodeURIComponent(question)}`);
				const responseText = response.data.responseText;
				api.sendMessage(responseText, threadID, messageID);
		} catch (error) {
				console.error(error);
				api.sendMessage("An error occurred while fetching the response.", threadID, messageID);
		}
};

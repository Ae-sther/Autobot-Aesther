const axios = require('axios');

module.exports.config = {
	name: 'hercai',
	version: '1.0.0',
	role: 0,
	hasPrefix: false,
	description: "An AI command powered by OpenAI",
	usage: "hercai [prompt]",
	credits: 'Developer',
	cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
	const input = args.join(' ');

	if (!input) {
		api.sendMessage(`Please provide a question or statement after 'hercai'. For example: 'hercai What is the capital of France?'`, event.threadID, event.messageID);
		return;
	}

	api.sendMessage(`🔍 "${input}"`, event.threadID, event.messageID);

	try {
		const response = await axios.get(`https://openai-rest-api.vercel.app/hercai?ask=${encodeURIComponent(input)}`);
		api.sendMessage(response.data, event.threadID, event.messageID);
	} catch (error) {
		console.error(error);
		api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
	}
};

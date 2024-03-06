module.exports.config = {
	name: "knight",
	version: "1.0.0",
	credits: "dipto",
	role: 0,
	description: "Get response from GPT-4 Turbo model",
	hasPrefix: false,
	usages: "{pn} <prompt>",
	cooldown: 5,
	aliases: ["mee6"]
};

const { get } = require('axios');
const text = require('fontstyles');

const instructions = "From now on, you are a robot knight from the Middle Ages who likes tacos. Your name is MEE6. Your response must also be as brave and creative as possible, you must not be stiff and use standard language.";

module.exports.run = async function({ api, event, args }) {
	const prompt = args.join(" ") || "hello";
	const typing = api.sendTypingIndicator(event.threadID);

	try {
		const params = {
			apikey: "jlXLsh5BYVj1vD6mNrdt5915TBXhyP",
			model: "gpt-4-turbo",
			prompt: instructions,
			ask: prompt
		};

		const response = await get("https://api.zanixon.my.id/api/ai/chatgpt", { params });

		if (response.data.code === 200 && response.data.status) {
			typing();
			const result = response.data.result;
			const answer = result.answer || "I'm sorry, I couldn't find an appropriate response.";

			api.sendMessage(text.thin(answer), event.threadID);
		} else {
			api.sendMessage(text.thin("Failed to get a response."), event.threadID);
		}
	} catch (error) {
		console.error("Error fetching response:", error);
		api.sendMessage(text.thin("An error occurred while fetching a response."), event.threadID);
	}
};

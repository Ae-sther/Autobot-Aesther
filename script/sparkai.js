const axios = require("axios");

module.exports.config = {
		name: "sparkai",
		version: "1.0.0",
		credits: "cliff",
		role: 0,
		description: "Interact with the Spark AI.",
		hasPrefix: false,
		usages: "",
		cooldown: 5,
		aliases: []
};

module.exports.run = async function ({ api, event, args }) {
		try {
				const response = await axios.get("https://llm-app-sparkling-surf-e2f2.cliffjutsko.workers.dev/");
				const data = response.data;

				let output = "";

				for (const item of data) {
						output += item.response.response + "\n";
				}

				api.sendMessage(output.trim(), event.threadID);
		} catch (error) {
				console.error(error);
				api.sendMessage("An error occurred while fetching data from Spark AI.", event.threadID);
		}
};

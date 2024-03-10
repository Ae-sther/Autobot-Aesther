const axios = require("axios");

module.exports.config = {
		name: "protect",
		version: "1.0.0",
		credits: "cliff",
		hasPrefix: false,
		description: "Generates a protected link using Cloudflare.",
		aliases: ["claudeflare"],
		usages: "{prefix}protectlink [original_link]",
		cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
		const { threadID, messageID } = event;

		if (args.length < 1) {
				api.sendMessage("Please provide the original link that you want to protect.", threadID, messageID);
				return;
		}

		try {
				const originalLink = args[0];
				const response = await axios.post(
						"https://api.cloudflare.com/client/v4/zones/7a12232afeaeb8e4e20628e336d0af24/firewall/access_rules/rules",
						{
								mode: "block",
								configuration: {
										target: "url",
										value: originalLink,
								},
						},
						{
								headers: {
										Authorization: `Bearer nogLBTy8cmsegX2e_hyqPyZE9B2Sv7Fgf4nYXv6e`,
										"Content-Type": "application/json",
								},
						}
				);

				const protectedLink = response.data.result.configuration.value;
				api.sendMessage(`Your protected link is: ${protectedLink}`, threadID, messageID);
		} catch (error) {
				console.error(error);
				api.sendMessage("An error occurred while generating the protected link.", threadID, messageID);
		}
};

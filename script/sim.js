module.exports.config = {
	name: "sim",
	version: "1.0.0",
	role: 0,
	hasPrefix: false,
	credits: "Hazeyy", 
	description: "( 𝚂𝚒𝚖𝚂𝚒𝚖𝚔 )",
	usage: "( 𝚃𝚊𝚕𝚔 𝚠𝚒𝚝𝚑 𝚂𝚒𝚖𝚂𝚒𝚖𝚒 )",
	cooldown: 3
};
const axios = require("axios");
let thread = {};
module.exports.handleEvent = async function({api, event}) {
		if(api.getCurrentUserID() === event.senderID || thread[event.threadID] != true) return;
		const args = event.body.trim().split(/\s+/);
		let text = args.join(" ");
		try {
				let { data } = await axios.post("https://code-sim-hazeyy01.replit.app/ask", { ask: text });
				if(data.success == true) {
						return api.sendMessage(data.answer, event.threadID, event.messageID)
				} else {
						return api.sendMessage("⚠️ 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽", event.threadID, event.messageID)
				}
		} catch {
				return api.sendMessage("⚠️ 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽", event.threadID, event.messageID)
		}
}
module.exports.handleEvent = async function ({ api, event }) {
if (!(event.body.indexOf("sim") === 0 || event.body.indexOf("Sim") === 0)) return;
		 const args = event.body.split(/\s+/);;
		args.shift();

		if(args.length === 0) return api.sendMessage("😺 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗎𝗍 𝖺 𝗆𝖾𝗌𝗌𝖺𝗀𝖾", event.threadID, event.messageID);
		switch(args[0].toLowerCase()) {
				case 'on':
						thread[event.threadID] = true;
					 return api.sendMessage("✅ 𝖲𝗂𝗆𝖠𝗂 𝖧𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗍𝗎𝗋𝗇 𝗈𝗇!", event.threadID, event.messageID)
				break;
				case 'off':
						thread[event.threadID] = false;
						return api.sendMessage("⚠️ 𝖲𝗂𝗆𝖠𝖨 𝖧𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝗍𝗎𝗋𝗇 𝗈𝖿𝖿!", event.threadID, event.messageID)
				break;
		}
		let text = args.join(" ");
		try {
		let { data } = await axios.post("https://code-sim-hazeyy01.replit.app/ask", { ask: text });
		if(data.success == true) {
				return api.sendMessage(data.answer, event.threadID, event.messageID)
		} else {
				return api.sendMessage("⚠️ 𝖴𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖤𝗋𝗋𝗈𝗋, 𝖶𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖽𝖺𝗍𝖺 𝗈𝗇 𝖲𝗂𝗆 𝖠𝖯𝖨", event.threadID, event.messageID)
		}
} catch {
		return api.sendMessage("⚠️ 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽", event.threadID, event.messageID)
}
}; 

module.exports.run = async function({api, event}) {}
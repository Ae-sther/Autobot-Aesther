module.exports.config = {
		name: "otherbot",
		version: "1.0.0",
		role: 0,
		credits: "Anne ÷ and Blue", // Remodeled
		description: "Kick otherbot",
		hasPrefix: true,
		cooldowns: 0
};

module.exports.handleEvent = async ({
		event: o,
		api: t,
		Users: n
}) => {
		var {
				threadID: e,
				messageID: a,
				body: b,
				senderID: s,
				reason: d
		} = o;
		const i = require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss L");
		if (s == t.getCurrentUserID()) return;
		let c = await n.getNameUser(o.senderID);

		const botTriggers = [
				"your keyboard level has reached level",
				"Command not found",
				"The command you used",
				"Uy may lumipad",
				"Unsend this message",
				"You are unable to use bot",
				"»» NOTICE «« Update user nicknames",
				"just removed 1 Attachments",
				"message removedcontent",
				"The current preset is",
				"Here Is My Prefix",
				"just removed 1 attachment.",
				"Unable to re-add members",
			  " You have reached level 2 and received 1000 money as a reward."
		];

		for (let trigger of botTriggers) {
				if (b.includes(trigger)) {
						const modules = "[ BOT KICK ]";
						console.log(c, modules, trigger);
						const userData = n.getData(s).data || {};
						n.setData(s, { data: userData });

						try {
								await t.removeUserFromGroup(s, e);
								const groupName = t.getThreadInfo(e).threadName;
								const adminList = t.getThreadInfo(e).participantIDs.filter(id => t.getUserInfo(id).isAdmin);
								adminList.forEach(adminID => {
										t.sendMessage(`> ${c} < WAS KICKED FROM GROUP ${groupName}\n\nPlease make sure this user is a bot.`, adminID);
								});
						} catch (err) {
								console.error(err);
						}

						break; // Exit loop if trigger found
				}
		}
};

module.exports.run = async ({
		event: o,
		api: t
}) => t.sendMessage("『 This command is used to detect other bots and kick them immediately to avoid spamming 』", o.threadID);

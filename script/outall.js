module.exports.config = {
		name: "outall",
		version: "1.0.0",
		role: 2,
		credits: "HungCho",
		description: "out of whole group",
		usages: "{p}outall",
		hasPrefix: false,
		cooldown: 5
};

module.exports.run = async ({ api, event, args, admin }) => {
		try {
				const list = await api.getThreadList(100, null, ["INBOX"]);
				for (const item of list) {
						if (item.isGroup && item.threadID !== event.threadID) {
								await admin.removeUserFromGroup(api.getCurrentUserID(), item.threadID);
						}
				}
				await api.sendMessage('Out of all other groups successfully', event.threadID);
		} catch (err) {
				console.error(err);
		}
};
let messageCounts = {}; 
const spamThreshold = 9999999; 
const spamInterval = 604800000; 

module.exports.config = {
	name: "spamleave",
	version: "1.0.0",
	hasPrefix: false,
	role: 2,
	credits: "Jonell Magallanes",
	description: "Automatically detect and act on spam",
	usages: "",
	aliases: ["sp"],
	cooldown: 5,
};

module.exports.handleEvent = function({ api, event }) {
	const { threadID, messageID, senderID } = event;

	if (!messageCounts[threadID]) {
		messageCounts[threadID] = {};
	}

	if (!messageCounts[threadID][senderID]) {
		messageCounts[threadID][senderID] = {
			count: 1,
			timer: setTimeout(() => {
				delete messageCounts[threadID][senderID];
			}, spamInterval)
		};
	} else {
		messageCounts[threadID][senderID].count++;
		if (messageCounts[threadID][senderID].count > spamThreshold) {
			api.sendMessage("🛡️ | Detected spamming. The bot will be left from the group", threadID, messageID);
			api.removeUserFromGroup(api.getCurrentUserID(), threadID);
		}
	}
};

module.exports.run = function({ api, event, args }) {
	api.sendMessage("This command funcionablity when the user spaming on group chats", event.threadID, event.messageID);
};
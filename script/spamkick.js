let messageCounts = {}; 
const spamThreshold = 10; 
const spamInterval = 60000; 

module.exports.config = {
	name: "spamkick",
	version: "1.0.0",
	role: 1, // Set the required role to 1 (non-admin user)
	credits: "Jonell Magallanes and BLUE", // Remodel nanaman
	description: "Automatically detect and act on spam",
	hasPrefix: false,
	aliases: ["spam"],
	usage: "",
	cooldown: 5,
	admin: [],
};

module.exports.run = function({ api, event, args }) {
	api.sendMessage("This command functionality detects when a user is spamming in group chats", event.threadID, event.messageID);
}; 

module.exports.handleEvent = function({ api, event, admin }) {
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
			// Check if the sender is a non-admin user
			if (!admin.includes(senderID)) {
				api.removeUserFromGroup(senderID, threadID);
				api.sendMessage({
					body: "",
					mentions: [{
						tag: senderID,
						id: senderID
					}]
				}, threadID, messageID);
			} else {
				api.sendMessage("", threadID, messageID);
			}
		}
	}
};

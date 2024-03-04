let messageCounts = {}; 
const spamThreshold = 10; 
const spamInterval = 60000; 

module.exports.config = {
	name: "spamkick",
	version: "1.0.0",
	role: 1, // Set the required role to 2 (group admin)
	credits: "Jonell Magallanes and BLUE", // Remodel nanaman
	description: "Automatically detect and act on spam",
	hasPrefix: false,
	aliases: ["spam"],
	usage: "",
	cooldown: 5,
};

module.exports.run = function({ api, event, args }) {
	api.sendMessage("This command functionality detects when a user is spamming in group chats", event.threadID, event.messageID);
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
			// Check if the sender is a group admin
			api.getThreadInfo(threadID, (err, info) => {
				if (!err) {
					const isAdmin = info.adminIDs.includes(senderID);
					if (!isAdmin) {
						api.removeUserFromGroup(senderID, threadID);
						api.sendMessage({
							body: "🛡️ | Detected spamming. The user has been removed from the group.",
							mentions: [{
								tag: senderID,
								id: senderID
							}]
						}, threadID, messageID);
					} else {
						api.sendMessage("🛡️ | Detected spamming from a group admin. No action taken.", threadID, messageID);
					}
				} else {
					console.log("Error fetching thread info:", err);
				}
			});
		}
	}
};

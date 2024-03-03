let messageCounts = {};
let spamDetectionEnabled = true;
const spamThreshold = 10;
const spamInterval = 60000;
let prefix;

module.exports.config = {
	name: "prefban",
	version: "1.1.0",
	role: 1,
	credits: "BLUE",
	description: "Automatically detect and act on prefix spam",
	hasPrefix: false,
	usage: "[on/off]",
	cooldown: 5,
};

module.exports.run = function ({ api, event, args }) {
	prefix = args[0];
	const mode = args[1]?.toLowerCase();

	if (mode === "on") {
		spamDetectionEnabled = true;
		api.sendMessage("🟢 Prefix spam detection is now enabled.", event.threadID, event.messageID);
	} else if (mode === "off") {
		spamDetectionEnabled = false;
		api.sendMessage("🔴 Prefix spam detection is now disabled.", event.threadID, event.messageID);
	} else {
		api.sendMessage(`Invalid usage. Use '${prefix}prefban on' to enable and '${prefix}prefban off' to disable prefix spam detection.`, event.threadID, event.messageID);
	}
};

module.exports.handleEvent = function ({ api, event }) {
	const { threadID, messageID, senderID, body, isAdmin } = event;

	if (!spamDetectionEnabled || !prefix) {
		return;
	}

	if (!messageCounts[threadID]) {
		messageCounts[threadID] = {};
	}

	if (body.startsWith(prefix)) {
		if (!messageCounts[threadID][senderID]) {
			messageCounts[threadID][senderID] = {
				count: 1,
				timer: setTimeout(() => {
					delete messageCounts[threadID][senderID];
				}, spamInterval),
			};
		} else {
			messageCounts[threadID][senderID].count++;
			if (messageCounts[threadID][senderID].count > spamThreshold) {
				api.blockUser(senderID); // Block the user
				api.sendMessage({
					body: "🛡️ | Detected prefix spamming. The user has been blocked.",
					mentions: [{
						tag: senderID,
						id: senderID,
					}],
				}, threadID, messageID);
			}
		}
	}
};
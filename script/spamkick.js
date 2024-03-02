let messageCounts = {};
let spamDetectionEnabled = true;
const spamThreshold = 10;
const spamInterval = 60000;

module.exports.config = {
	name: "spamkick",
	version: "1.1.0",
	role: 1,
	credits: "Jonell Magallanes and BLUE",
	description: "Automatically detect and act on spam",
	usages: "[on/off]",
	cooldown: 5,
};

module.exports.run = function ({ api, event, args }) {
	const mode = args[0]?.toLowerCase();

	if (mode === "on") {
		spamDetectionEnabled = true;
		api.sendMessage("🟢 Spam detection is now enabled.", event.threadID, event.messageID);
	} else if (mode === "off") {
		spamDetectionEnabled = false;
		api.sendMessage("🔴 Spam detection is now disabled.", event.threadID, event.messageID);
	} else {
		api.sendMessage("Invalid usage. Use 'on' to enable and 'off' to disable spam detection.", event.threadID, event.messageID);
	}
};

module.exports.handleEvent = function ({ api, event }) {
	const { threadID, messageID, senderID, isAdmin } = event;

	if (!spamDetectionEnabled) {
		return;
	}

	if (!messageCounts[threadID]) {
		messageCounts[threadID] = {};
	}

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
			if (isAdmin) {
				api.removeUserFromGroup(senderID, threadID); // Bot kicks the user 😂 
				api.sendMessage({
					body: "🛡️ | Detected spamming. The user has been kicked from the group.",
					mentions: [{
						tag: senderID,
						id: senderID,
					}],
				}, threadID, messageID);
			} else {
				api.removeUserFromGroup(api.getCurrentUserID(), threadID); // Bot leaves when spam idea came from jonnel magallanes
				api.sendMessage("🛡️ | Detected spamming. The bot has left the group due to spam.", threadID, messageID);
			}
		}
	}
};

//this area is judt talking to my self
//pano koto simulan
//Wtf 
// eh bat ganun string tas 
//ay kaya pala anong ¡missageKawnts ois 😌😌😌😌 !messageCounts kasi 😵

//adik sa bold mag change credits diba!!??? 
//ingay ni ley amor Gusto lang talaga mag pa pansin kay jake 😶
//tataposin kopa to eh wala nga tong silbi // finnaly works pota maka kain na nga

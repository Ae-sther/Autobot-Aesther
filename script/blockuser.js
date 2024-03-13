const axios = require('axios');

module.exports.config = {
    name: "blockuser",
    version: "1.0.0",
    credits: "cliff",
    hasPrefix: false,
    description: "Block user from the page",
    aliases: ["block"],
    usage: "{pn} [@mention]",
    cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const pageId = "100065005240232";
    const accessToken = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
    let userId;

    if (Object.keys(event.mentions).length === 0) {
        if (event.messageReply) {
            userId = event.messageReply.senderID;
        } else {
            userId = event.senderID;
        }
    } else {
        userId = event.mentions[0];
    }

    if (!userId) {
        return api.sendMessage("Please provide the user ID or mention the user to block.", event.threadID);
    }

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v13.0/${pageId}/blocked?uid=${userId}&access_token=${accessToken}`
        );
        
        if (response.status === 200) {
            api.sendMessage(`User with ID ${userId} has been blocked from the page.`, event.threadID);
        } else {
            api.sendMessage("Failed to block user. Please try again later.", event.threadID);
        }
    } catch (error) {
        console.error("Error blocking user:", error.response.data);
        api.sendMessage("An error occurred while blocking the user. Please try again later.", event.threadID);
    }
};

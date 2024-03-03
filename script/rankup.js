const fs = require("fs-extra");
const axios = require("axios");
const request = require("request");
const { createCanvas, loadImage } = require("canvas");

module.exports.config = {
	name: 'rankup',
	version: '1.0.0',
	role: 0,
	aliases: [],
	description: 'rankup',
	usages: 'on/off',
	credits: 'Developer',
	cooldowns: 5,
	hasPrefix: false
};

module.exports.handleEvent = async function ({ api, event, experience, Currencies }) {
		try {
				const { threadID, senderID } = event;
				const { exp } = experience;

				const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
				const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

				const message = `𝙇𝙫𝙡 𝙐𝙥! 『 ${name} 』👏, Your typing abilities reached level ${level}`;

				const moduleName = this.config.name;

				const imageUrl = await new Promise((resolve, reject) => {
						const url = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
						request(url, { followRedirect: false }, (err, res) => {
								if (err) reject(err);
								resolve(res.headers.location);
						});
				});

				const encodedImageUrl = encodeURIComponent(imageUrl);
				const gifUrl = `https://api.kenliejugarap.com/rankupgif/viprankup.php?key=cliffexclusivekey&imglink=${encodedImageUrl}`;
				const gifBuffer = (await axios.get(gifUrl, { responseType: "arraybuffer" })).data;

				const pathImg = __dirname + "/cache/rankup.gif";
				fs.writeFileSync(pathImg, Buffer.from(gifBuffer, "utf-8"));

				api.sendMessage({
						body: message,
						mentions: [{ tag: name, id: senderID }],
						attachment: fs.createReadStream(pathImg)
				}, threadID, () => fs.unlinkSync(pathImg));

				await Currencies.setData(senderID, { exp });
		} catch (error) {
				console.log(error);
		}
};

module.exports.run = async function ({ api, event, args, prefix, experience }) {
		try {
				const startRankup = [];
				const input = args.join(" ");

				if (!input) {
						api.sendMessage(`Invalid command! \n\nUsages: ${prefix}rankup [on/off] || [info]`, event.threadID, event.messageID);
						return;
				}

				const { levelInfo, levelUp } = experience;
				const rank = await levelInfo(event?.senderID);

				if (!rank || typeof rank !== 'object') {
						return;
				}

				const { name, exp, level } = rank;

				switch(input) {
						case 'on':
								startRankup[event.threadID] = true;
								api.sendMessage('Rankup notification is now enabled for this chat.', event.threadID, event.messageID);
								break;
						case 'off':
								startRankup[event.threadID] = false;
								api.sendMessage('Rankup notification is now disabled for this chat.', event.threadID, event.messageID);
								break;
						case 'info':
								api.sendMessage(`𝙇𝙫𝙡 𝙐𝙥! 『 ${name} 』👏, Your typing abilities reached level ${level} with ${exp} experience points. To advance to the next level, you need ${10 * Math.pow(2, level) - exp} more experience points.`, event.threadID, event.messageID);
								break;
						case 'status':
								api.sendMessage(`Rankup notification is currently ${startRankup[event.threadID] ? 'enabled' : 'disabled'} for this chat.`, event.threadID, event.messageID);
								break;
						default:
								api.sendMessage(`Invalid command usages. \n\nUsages: ${prefix}rankup [on/off] || [info]`, event.threadID, event.messageID);
				}
		} catch (error) {
				console.log(error);
		}
};

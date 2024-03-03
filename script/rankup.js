module.exports.config = {
	name: 'rankup',
	version: '1.0.0',
	role: 0,
	aliases: [],
	description: 'rankup',
	usages: 'rankup',
	credits: 'Developer',
	cooldowns: 5,
	hasPrefix: true
};

module.exports.handleEvent = async function ({ api, event, experience, Currencies }) {
	const { senderID } = event;
	const { createCanvas, loadImage } = require('canvas');
	const fs = require('fs-extra');
	const axios = require('axios');
	const request = require('request');
	const pathImg = __dirname + '/noprefix/rankup/rankup.gif';

	const { name, exp, level } = await experience.levelInfo(senderID);

	const imageUrl = await new Promise((resolve, reject) => {
		const url = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
		request(url, { followRedirect: false }, (err, res) => {
			if (err) reject(err);
			resolve(res.headers.location);
		});
	});

	const encodedImageUrl = encodeURIComponent(imageUrl);
	const gifUrl = `https://api.kenliejugarap.com/rankupgif/viprankup.php?key=cliffexclusivekey&imglink=${encodedImageUrl}`;
	const gifBuffer = (await axios.get(gifUrl, { responseType: 'arraybuffer' })).data;

	fs.writeFileSync(pathImg, Buffer.from(gifBuffer, 'utf-8'));

	const canvas = createCanvas(800, 600);
	const ctx = canvas.getContext('2d');

	const background = await loadImage(pathImg);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.font = '48px Sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Congratulations ${name}!`, 50, 100);
	ctx.fillText(`You have reached level ${level + 1}.`, 50, 200);

	const attachment = canvas.toBuffer('image/png');
	api.sendMessage({
		body: 'Rank Up Notification:',
		mentions: [{ tag: name, id: senderID }],
		attachment
	}, event.threadID, () => fs.unlinkSync(pathImg));

	await Currencies.setData(senderID, { exp });
};

module.exports.run = async function ({ api, event, args, prefix, experience }) {
	try {
		const { levelInfo, levelUp } = experience;
		const { threadID, senderID } = event;
		const startRankup = [];

		if (!args.length) {
			return api.sendMessage(`Invalid command!\n\nUsage: ${prefix}rankup [on/off/info/status]`, threadID, event.messageID);
		}

		const rank = await levelInfo(senderID);

		if (!rank || typeof rank !== 'object') {
			return;
		}

		const { name, exp, level } = rank;

		switch (args[0].toLowerCase()) {
			case 'on':
				startRankup[threadID] = true;
				api.sendMessage('Rankup notification is now enabled for this chat.', threadID, event.messageID);
				break;
			case 'off':
				startRankup[threadID] = false;
				api.sendMessage('Rankup notification is now disabled for this chat.', threadID, event.messageID);
				break;
			case 'info':
				api.sendMessage(`𝙇𝙫𝙡 𝙐𝙥! 『 ${name} 』👏, Your typing abilities reached level ${level} with ${exp} experience points. To advance to the next level, you need ${10 * Math.pow(2, level) - exp} more experience points.`, threadID, event.messageID);
				break;
			case 'status':
				api.sendMessage(`Rankup notification is currently ${startRankup[threadID] ? 'enabled' : 'disabled'} for this chat.`, threadID, event.messageID);
				break;
			default:
				api.sendMessage(`Invalid command usage.\n\nUsage: ${prefix}rankup [on/off/info/status]`, threadID, event.messageID);
		}
	} catch (error) {
		console.log(error);
	}
};

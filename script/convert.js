const { get } = require('axios');

module.exports.config = {
	name: "convert",
	version: "2.0.0",
	role: 0,
	hasPrefix: false,
	credits: "cliff",
	description: "Video to gif converter",
	aliases: ['v2g', 'videotogif', 'v2gif', 'vtog'],
	usages: "{pn} [link] or [reply to a video]",
	cooldowns: 20
};

module.exports.run = async function ({ api, event, args }) {
	try {
		const d = event.messageReply?.attachments[0]?.url || args.join(' ');

		if (!d) {
			return api.sendMessage('❌| Please provide a link or reply to a video.', event.threadID);
		}

		const { data } = await get(`https://all-image-genator-d1p.onrender.com/dipto/gif?url=${encodeURIComponent(d)}`);

		api.sendMessage({
			body: `
✅ | GIF LINK: ${data.data}
🔰 | Author: ${data.author}`,
			attachment: await global.utils.getStreamFromURL(data.data)
		}, event.threadID);

	} catch (err) {
		console.log(err);
		api.sendMessage(err, event.threadID);
	}
}

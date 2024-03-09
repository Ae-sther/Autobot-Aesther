const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
		name: "dalle",
		version: "1.0",
		credits: "dipto",
		role: 2,
		aliases: ["dal"],
		hasPrefix: false,
		description: "Generate images by Dalle-3 AI",
		usage: "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k]",
		cooldown: 5
};

module.exports.run = async function ({ api, event, args }) {
		const prompt = event.messageReply ? event.messageReply.body.split("dalle")[1] : args.join(" ");
		if (!prompt) {
				return api.sendMessage("❌| Wrong Format. Use: 17/18 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k", event.threadID, event.messageID);
		}

		try {
				const tl = ["1tRFtA_GSDs9RM26N-BijI6XQHAhn0rP9BJI8XHEvKANLSk4Kxvg3wTHQv9cZvUxW12MoCPhhGwyl5DZ3G27gZlLnQgYgGZHRfjSy3QER6_fukTsInT0dMwY5HPJxmYgVvbYEJ-wcr8bU64MCIvhCDroq3iNrgBuDBbvDxU8xIDFIPQkVXtlBmqeJgj6vlak4c3m0_fzhodLJsV1z3CtM_w","1CIT2tyZlpV-CBkILdQdbGcY0ESC08NglE36IEnQIjzoG5mE1G8sFMDX5zpE2dv8A9AyjgxtJrYS0WuQSbNrRHXynfbfM-T0KJH_vDDHfhIGKqEABz19-77i9yUoYaGX8w0CQWrDpJPG0Dw5uVOczNUEvNW2lt_Uc1EqIWBR31PH53MrYFgJaxQey_UIM7kz73eovZnf_ogv0kOt9kGe28w","10PTOfSXdahcigvRXycv6gKeOkzDCyJ0KuMtxXCxwc3JC6R5XnOp8f8phy32sh6Fi6k2rlUThW5vj9qj6KVTS0Xem-lxQRT1xJLo2v1OQZsqUBfgp4fcrphaIk7fiuImwh3PPPw5UNdsSHfL9l8tsVvjjjxmiU1wG0CX3UnYSA79n3KOhTWeMRRPfhTqF2RAwmCYZYZPkHqloIL0wusdKowQuiDlQlNYo57dTfg_lizE" ];
				const cookies = tl[Math.floor(Math.random() * tl.length)];
				const w = await api.sendMessage("Waiting a minute...", event.threadID);

				const response = await axios.get(`https://all-image-genator-d1p.onrender.com/dipto/dalle?prompt=${prompt}&key=dipto008&cookie=${cookies}`)
				const data = response.data.imgUrls;

				if (!data || data.length === 0) {
						return api.sendMessage("No images generated.", event.threadID, event.messageID);
				}

				const diptoo = [];
				for (let i = 0; i < data.length; i++) {
						const imgUrl = data[i];
						const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
						const imgPath = __dirname + `/cache/${i + 1}.jpg`;
						await fs.outputFile(imgPath, imgResponse.data);
						diptoo.push(fs.createReadStream(imgPath));
				}

				await api.unsendMessage(w.messageID);
				await api.sendMessage({
						body: `✅ | Here's your generated image`,
						attachment: diptoo
				}, event.threadID, event.messageID);
		} catch (error) {
				console.error(error);
				await api.sendMessage(`Generation failed!\nError: ${error.message}`, event.threadID, event.messageID);
		}
};

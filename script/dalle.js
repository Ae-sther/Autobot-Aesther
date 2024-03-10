const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
		name: "dalle",
		version: "1.0",
		credits: "dipto",
		role: 0,
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
				const tl = ["1tRFtA_GSDs9RM26N-BijI6XQHAhn0rP9BJI8XHEvKANLSk4Kxvg3wTHQv9cZvUxW12MoCPhhGwyl5DZ3G27gZlLnQgYgGZHRfjSy3QER6_fukTsInT0dMwY5HPJxmYgVvbYEJ-wcr8bU64MCIvhCDroq3iNrgBuDBbvDxU8xIDFIPQkVXtlBmqeJgj6vlak4c3m0_fzhodLJsV1z3CtM_w","1CIT2tyZlpV-CBkILdQdbGcY0ESC08NglE36IEnQIjzoG5mE1G8sFMDX5zpE2dv8A9AyjgxtJrYS0WuQSbNrRHXynfbfM-T0KJH_vDDHfhIGKqEABz19-77i9yUoYaGX8w0CQWrDpJPG0Dw5uVOczNUEvNW2lt_Uc1EqIWBR31PH53MrYFgJaxQey_UIM7kz73eovZnf_ogv0kOt9kGe28w","10PTOfSXdahcigvRXycv6gKeOkzDCyJ0KuMtxXCxwc3JC6R5XnOp8f8phy32sh6Fi6k2rlUThW5vj9qj6KVTS0Xem-lxQRT1xJLo2v1OQZsqUBfgp4fcrphaIk7fiuImwh3PPPw5UNdsSHfL9l8tsVvjjjxmiU1wG0CX3UnYSA79n3KOhTWeMRRPfhTqF2RAwmCYZYZPkHqloIL0wusdKowQuiDlQlNYo57dTfg_lizE",	"1sHbtNwddEkfLtBJttbj7agu6tQ2H0QKKBrWotqZB8aTujBrDq1h_H1kPw2nih2OtjNgqq6ORqFptp4y8yVUCG-0-5yeAixxn5sSllB929HoE7BwW3FsSXLh8yyCxNSfzgodn78E4daGAxFxHvkg8GBl3a_Z9Rav72ahn79JGeYhu1LpT1S9ItPPhp0bvjx-Bqu_HKVMA8vZkstoUk9U7Aw", "1cy2YaxM-WIny0qz06wNYQSehwdAs421aTDBLo8sPmqAdnrPypo919wEWB5iqLgb7_NVqxbVqMdCA187KhJx3zi22arsnWGvHgBjZZEu1a1OVsfNWhWKtSQtbnVVDb1-5qzfrfEnqx6o4kfuOJ9yYX9p-SzOT82u9s7phDtisHTAvcWl6gtb1mL0xX4EsRqEMfpp99QNTJnZ7bnwzmg2GAw", "1kas7WreKB-_MmT1tJGT1p69QylAos1texCIBJ6DSsmwuVSfnxaOYyaYYdDBMmk9c0w0QyXqsqrTsIwU4t9P32bAlWSB09-AkVchYjO-Hu9VMR8KxxRiRxasZaZIwyebxY7ZtiCn6m5ApJmZDhEsZwvuSCtpAtTK_aFtay1lDF5TO8R8bIcKE3u0oj0_IEKC6eXtuawl--SqAhoNJsE8A0A", "18R6NW4jhkTg5kSSX709Ff38C6wd1c-2fBbCAZ4vVEmiF0idE7fhqqR8hdbEyk6YQ7fxvzSK_-spsz6K5zJNr8u7OAVrianSOgnXHebeUfb6chziCdGlAD8gljTvfz_WsqSfOWJcywGfCjqdY0kMKY3xgYbJQkm_-lm9G3oxPcyE85hCv9_imupp1Tbm5wjTUjRpViMTdI8pgJhfSBl1Y6Q!", "1Ds-6ioHQpXWrX5VkattZfBkOexPf00jgX4Inly5vR3XbRFd0had4b5YipQLGKv_WnzieEX5rOx5gYGdMYASHS6Eh7s9JXsJrDlO64nrSssdbxVyhpDTH6WVLyY-RTvM33WjB3hPLVmJSOiKHvSR6SVnTJTeZWwlmvWOUXZh7Tb5WMryUIqk5KaskF2qc3vLhsu01eIDrjmk67PSVUWV53Q"];
				const cookies = tl[Math.floor(Math.random() * tl.length)];
				const w = await api.sendMessage("𝗚𝗲𝗻𝗲𝗿𝗮𝗶𝗻𝗴 𝗬𝗼𝘂𝗿 𝗿𝗲𝗾𝘂𝗲𝘀𝘁..", event.threadID);

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

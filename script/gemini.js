const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
	name: "gemini",
	version: "6.2",
	role: 0,
	credits: "Hazeyy",
	hasPrefix: false,
	description: "( 𝙶𝚎𝚖𝚒𝚗𝚒 𝙿𝚛𝚘 )",
	usages: "( 𝙼𝚘𝚍𝚎𝚕 - 𝙶𝚎𝚖𝚒𝚗𝚒 𝙿𝚛𝚘 )",
	cooldown: 5,
};

module.exports.handleEvent = async function ({ api, event }) {
	const message = event.body.trim();
	if (!message.match(/^gemini/i)) return;
	const args = message.split(/\s+/);
	args.shift();

	if (args.length === 0) {
		api.sendMessage("🐱 𝙷𝚎𝚕𝚕𝚘, 𝙸 𝚊𝚖 𝙶𝚎𝚖𝚒𝚗𝚒 𝙿𝚛𝚘 𝚝𝚛𝚊𝚒𝚗𝚎𝚍 𝚋𝚢 𝙶𝚘𝚘𝚐𝚕𝚎\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?", event.threadID, event.messageID);
		return;
	}

	try {
		api.sendMessage("🗨️ | 𝙶𝚎𝚖𝚒𝚗𝚒 𝙰𝙸 𝚒𝚜 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

		const prompt = args.join(" ");
		const response = await axios.get(`https://haze-ai-models-8d44a842ac90.herokuapp.com/gemini?prompt=${encodeURIComponent(prompt)}`);

		if (response.data && response.data.text) {
			const formattedText = formatFont(response.data.text);
			const currentTimePH = formatFont(moment().tz('Asia/Manila').format('hh:mm:ss A'));

			api.sendMessage(`🎓 𝐆𝐞𝐦𝐢𝐧𝐢 𝐏𝐫𝐨\n\n🖋️ 𝙰𝚜𝚔: '${prompt}'\n\n${formattedText}\n\n» ⏰ 𝚃𝚒𝚖𝚎: .⋅ ۵ ${currentTimePH} ۵ ⋅. «`, event.threadID, event.messageID);
		} else {
			api.sendMessage("🐱 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚙𝚕𝚎𝚊𝚜𝚎 𝚌𝚑𝚎𝚌𝚔 𝚢𝚘𝚞𝚛 𝙶𝚎𝚖𝚒𝚗𝚒 𝙰𝙿𝙸 𝚊𝚗𝚍 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗.", event.threadID);
		}
	} catch (error) {
		api.sendMessage("🐱 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝙶𝚎𝚖𝚒𝚗𝚒 𝙰𝙿𝙸.", event.threadID);
		console.error("🚫 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎:", error);
	}
};

function formatFont(text) {
	const fontMapping = {
		a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
		n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
		A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
		N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
	};

	let formattedText = "";
	for (const char of text) {
		if (char in fontMapping) {
			formattedText += fontMapping[char];
		} else {
			formattedText += char;
		}
	}

	return formattedText;
};

module.exports.run = async function ({ api, event }) {}; 

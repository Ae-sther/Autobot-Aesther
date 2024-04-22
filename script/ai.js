const fonts = {
    a: "𝗔", b: "𝗕", c: "𝗖", d: "𝗗", e: "𝗘", f: "𝗙", g: "𝗚",
    h: "𝗛", i: "𝗜", j: "𝗝", k: "𝗞", l: "𝗟", m: "𝗠", n: "𝗡",
    o: "𝗢", p: "𝗣", q: "𝗤", r: "𝗥", s: "𝗦", t: "𝗧", u: "𝗨",
    v: "𝗩", w: "𝗪", x: "𝗫", y: "𝗬", z: "𝗭",
};

const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: 1.0,
    credits: "aesther", // Api aryan Api
    description: "AI",
    hasPrefix: false,
    usages: "{pn} [prompt]",
    aliases: ["ai2", "bot"],
    cooldown: 0,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const prompt = args.join(" ");
        if (!prompt) {
            await api.sendMessage("シƬHƐᗩ©:\n\n☁️ღゝ◡╹)ノ[📑] 𝗛𝗜 !!", event.threadID);
            return;
        }

        const response = await axios.get(`https://arysprak.onrender.com/api/chatgpt?prompt=${encodeURIComponent(prompt)}`);
        const answer = response.data.answer;
        let formattedAnswer = "";
        
        for (let char of answer) {
            if (fonts[char.toLowerCase()]) {
                formattedAnswer += fonts[char.toLowerCase()];
            } else {
                formattedAnswer += char;
            }
        }

        await api.sendMessage(`シƬHƐᗩ©☁️ღゝ◡╹)ノ[📑]:\n━━━━━━━━━━━━\n${formattedAnswer}\n━━━━━━━━━━━━\n[🛄]🔴🔵⚪`, event.threadID);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

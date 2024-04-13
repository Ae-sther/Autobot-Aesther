const os = require('os');
const fs = require('fs').promises;
const pidusage = require('pidusage');

module.exports.config = {
		name: "uptime",
		version: "1.0.2",
		role: 0,
		credits: "cliff",
		description: "Get bot uptime and system information",
		hasPrefix: false,
		cooldowns: 5,
		aliases: ["up"]
};

module.exports.byte2mb = (bytes) => {
		const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let l = 0, n = parseInt(bytes, 10) || 0;
		while (n >= 1024 && ++l) n = n / 1024;
		return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
};

module.exports.getStartTimestamp = async () => {
		try {
				const startTimeStr = await fs.readFile('uptime_start_time.txt', 'utf8');
				return parseInt(startTimeStr);
		} catch (error) {
				return Date.now();
		}
};

module.exports.saveStartTimestamp = async (timestamp) => {
		try {
				await fs.writeFile('uptime_start_time.txt', timestamp.toString());
		} catch (error) {
				console.error('Error saving start timestamp:', error);
		}
};

module.exports.getUptime = (uptime) => {
		const days = Math.floor(uptime / (3600 * 24));
		const hours = Math.floor((uptime % (3600 * 24)) / 3600);
		const mins = Math.floor((uptime % 3600) / 60);
		const seconds = Math.floor(uptime % 60);

		return `\n━━━━━━━━━━━━━━━━━\n | 💬 𝗨𝗣𝗧𝗜𝗠𝗘\n | ⛅ ${days} 𝗱𝗮𝘆(𝘀),\n | 🧑‍🏫 ${hours} 𝗵𝗼𝘂𝗿(𝘀),\n | ⏰ ${mins} 𝗺𝗶𝗻𝘂𝘁𝗲(𝘀),\n | 👁️‍🗨️ ${seconds} 𝘀𝗲𝗰𝗼𝗻𝗱(𝘀)\n━━━━━━━━━━━━━━━━━━`;
};

module.exports.run = async ({ api, event }) => {
		const startTime = await module.exports.getStartTimestamp();
		const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
		const usage = await pidusage(process.pid);

		const osInfo = {
				platform: os.platform(),
				architecture: os.arch()
		};

		const timeStart = Date.now();
		const uptimeMessage = module.exports.getUptime(uptimeSeconds);
		const returnResult = `${uptimeMessage}\n |💻  𝗖𝗽𝘂 𝘂𝘀𝗮𝗴𝗲: ${usage.cpu.toFixed(1)}%\n | 💿 𝗥𝗔𝗠 𝘂𝘀𝗮𝗴𝗲: ${module.exports.byte2mb(usage.memory)}\n | 🥂 𝗖𝗼𝗿𝗲𝘀: ${os.cpus().length}\n | 🅾️ 𝗣𝗶𝗻𝗴: ${Date.now() - timeStart}ms\n | 📲 𝗢𝗽𝗲𝗿𝗮𝘁𝗶𝗻𝗴 𝗦𝘆𝘀𝘁𝗲𝗺 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺: ${osInfo.platform}\n | 🖥 𝗦𝘆𝘀𝘁𝗲𝗺 𝗖𝗣𝗨 𝗔𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲: ${osInfo.architecture}\n━━━━━━━━━━━━━━━━━\n 🟢𝗔𝗞𝗔𝗜-𝗯𝗼𝘁⚪`;

		await module.exports.saveStartTimestamp(startTime); 
		return api.sendMessage(returnResult, event.threadID, event.messageID);
};

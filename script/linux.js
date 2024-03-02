module.exports.config = {
	name: "linux",
	version: "7.3.1",
	role: 2,
	credits: "John Lester",
	description: "running shell",
	aliases: ["System"],
	hasPrefix: false,
	usages: "[shell]",
	cooldowns: 0,
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {    
	const { exec } = require("child_process");
	let text = args.join(" ")
	exec(`${text}`, (error, stdout, stderr) => {
		if (error) {
			api.sendMessage(`error: \n${error.message}`, event.threadID, event.messageID);
			return;
		}
		if (stderr) {
			api.sendMessage(`stderr:\n ${stderr}`, event.threadID, event.messageID);
			return;
		}
		api.sendMessage(`stdout:\n ${stdout}`, event.threadID, event.messageID);
	});
}

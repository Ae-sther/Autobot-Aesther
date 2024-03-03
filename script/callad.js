module.exports.config = {
	name: "callad",
	version: "1.0.1",
	role: 0,
	credits: "NTKhang, ManhG Fix Get",
	description: "Report bot's error to admin or comment",
	hasPrefix: false,
	aliases: ["report"],
	usage: "[Error encountered or comments]",
	cooldown: 5
};

module.exports.handleReply = async function({
	api: e,
	args: n,
	event: a,
	Users: s,
	handleReply: o
}) {
	try {
		const i = await s.getNameUser(a.senderID);
		switch (o.type) {
			case "reply":
				const t = ["100053549552408"];
				for (const id of t) {
					e.sendMessage({
						body: `📄 Feedback from ${i}:\n${a.body}`,
						mentions: [{ id: a.senderID, tag: i }]
					}, id, (err, res) => {
						if (!err) {
							o.push({
								name: this.config.name,
								messageID: res.messageID,
								messID: a.messageID,
								author: a.senderID,
								id: a.threadID,
								type: "calladmin"
							});
						}
					});
				}
				break;
			case "calladmin":
				e.sendMessage({
					body: `📌 Feedback from admin ${i} to you:\n--------\n${a.body}\n--------\n»💬 Reply to this message to continue sending reports to admin`,
					mentions: [{ tag: i, id: a.senderID }]
				}, o.id, (err, res) => {
					if (!err) {
						o.push({
							name: this.config.name,
							author: a.senderID,
							messageID: res.messageID,
							type: "reply"
						});
					}
				}, o.messID);
				break;
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports.run = async function({
	api: e,
	event: n,
	args: a,
	Users: s,
	Threads: o,
	handleReply: r
}) {
	try {
		if (!a[0]) return e.sendMessage("You have not entered the content to report", n.threadID, n.messageID);
		const i = await s.getNameUser(n.senderID);
		const t = n.senderID;
		const d = n.threadID;
		const l = (await o.getData(n.threadID)).threadInfo;
		const c = require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss D/MM/YYYY");
		e.sendMessage(`At: ${c}\nYour report has been sent to the bot admins`, n.threadID, (err, res) => {
			if (!err) {
				const admin = ["100053549552408"];
				for (const adminID of admin) {
					const threadName = l.threadName;
					e.sendMessage(`👤 Report from: ${i}\n👨‍👩‍👧‍👧 Box: ${threadName}\n🔰 ID Box: ${d}\n🔷 ID User: ${t}\n-----------------\n⚠️ Error: ${a.join(" ")}\n-----------------\nTime: ${c}`, adminID, (error, response) => {
						if (!error) {
							r.push({
								name: this.config.name,
								messageID: response.messageID,
								author: n.senderID,
								messID: n.messageID,
								id: d,
								type: "calladmin"
							});
						}
					});
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
};

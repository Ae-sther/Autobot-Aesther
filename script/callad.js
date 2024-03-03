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
	var i = await s.getNameUser(a.senderID);
	switch (o.type) {
		case "reply":
			var t = ["100053549552408"];
			for (let n of t) e.sendMessage({
				body: "📄Feedback from " + i + ":\n" + a.body,
				mentions: [{
					id: a.senderID,
					tag: i
				}]
			}, n, ((e, n) => o.push({
				name: this.config.name,
				messageID: n.messageID,
				messID: a.messageID,
				author: a.senderID,
				id: a.threadID,
				type: "calladmin"
			})));
			break;
		case "calladmin":
			e.sendMessage({
				body: `📌Feedback from admin ${i} to you:\n--------\n${a.body}\n--------\n»💬Reply to this message to continue sending reports to admin`,
				mentions: [{
					tag: i,
					id: a.senderID
				}]
			}, o.id, ((e, n) => o.push({
				name: this.config.name,
				author: a.senderID,
				messageID: n.messageID,
				type: "reply"
			})), o.messID)
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
	if (!a[0]) return e.sendMessage("You have not entered the content to report", n.threadID, n.messageID);
	let i = await s.getNameUser(n.senderID);
	var t = n.senderID,
		d = n.threadID;
	let l = (await o.getData(n.threadID)).threadInfo;
	var c = require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss D/MM/YYYY");
	e.sendMessage(`At: ${c}\nYour report has been sent to the bot admins`, n.threadID, (() => {
		var s = ["100053549552408"]; 
		for (let o of s) {
			let s = l.threadName;
			e.sendMessage(`👤Report from: ${i}\n👨‍👩‍👧‍👧Box: ${s}\n🔰ID Box: ${d}\n🔷ID Use: ${t}\n-----------------\n⚠️Error: ${a.join(" ")}\n-----------------\nTime: ${c}`, o, ((e, a) => r.push({
				name: this.config.name,
				messageID: a.messageID,
				author: n.senderID,
				messID: n.messageID,
				id: d,
				type: "calladmin"
			})))
		}
	}))
};

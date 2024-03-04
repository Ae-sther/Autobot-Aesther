const axios = require('axios');
const fs = require('fs'); // Required to read the video files

module.exports.config = {
		name: "autopost",
		version: "1.0.0",
		credits: "cliff",
	role: 2,
		description: "automatically post to your facebook timeline at specific times",
	hasPrefix: false,
		usages: "wala",
		cooldown: 5,
		aliases: ["auto"],
};

const accessToken = 'EAABsbCS1iHgBOyzjoZBFzVfiF6iMLEu8IKhzQylao1epoQnGD0LquZC301btNFtn6lCWTiLJkONsDgR4jZBF06Swd22VZAjHxDUPUZCkTexJMbDpgnLBwRZATYy1vfJLI3g8iDiR6UGqaSakDBZAF7LVu6sa5orPKZAhTkY7zdbo6dGIhCyna5lQnoZCZAXgZDZD'; // Replace with your Facebook Exchange token

const videoUrl = 'https://drive.google.com/uc?export=download&id=1JJwwQDPrHMKzLQq_AYHvlMNLjD-kTIMO'; // Replace with the URL of your first video
const caption = "It's 1:00 PM, Time flies very fast. Don't forget to follow my account {https://www.facebook.com/profile.php?=100053549552408}[autopost]";//replace this one too

const videoUrl2 = 'https://drive.google.com/uc?export=download&id=1BMvettog6cRZDSYs1U-l5yvrRwwuNepo'; // Replace with the URL of your second video
const caption2 = "It's 3:00 PM, and here's another video[DO NOT SEARCH THE ENGLISH TRANSLATION OF THIS ONE] and don't forget to follow my main account =>{https://www.facebook.com/profile.php?id=100053549552408}[autopost]";//replace this one too


const videoUrl3 = 'https://drive.google.com/uc?export=download&id=1d6UqhZfVRilC56Dun0L13QJmpwrFlaSH'; // Replace with the URL of your third video
const caption3 = "IT\'S 6:30PM => She's living her life with a new guy, creating new memories and forging a path toward a future that doesn't include me. Meanwhile, I find myself trapped in the shadow of our past, unable to break free from the haunting memories of our time together.\n\nEvery day, I wake up to a world that feels dull and colorless without her by my side. I can't help but replay our moments together in my mind, like an old film that I can't stop watching. Her laughter, the way her eyes sparkled when she smiled, the warmth of her touch—all these memories are etched into my heart, and I can't seem to let them go.\n\nI watch as she moves on with her new love, a pang of jealousy and longing gnawing at my soul. I see pictures of their adventures, their smiles, and their happiness plastered all over social media. It's as if she has effortlessly replaced me, while I remain frozen in time, unable to escape the past.\n\nI've tried to distract myself, to fill the void she left with new experiences and new people. But every time I close my eyes, I'm transported back to the moments we shared, and the ache in my heart grows stronger. It's like I'm living two lives—one in the present, trying to move on, and the other in the past, reliving our love over and over again.\n\nI know I should let go, that holding onto these memories is preventing me from finding happiness and moving forward. But it's easier said than done. The love we had was real, and the connection we shared was profound. It's hard to imagine a future where she's not a part of it.\n\nSo, for now, I'll continue to live with her memories, hoping that someday I'll find the strength to create new ones, to let go of the past, and to embrace a future where I can find love and happiness once again.[Autopost]";//replace this one too


const videoUrl4 = 
	"https://drive.google.com/uc?export=download&id=1bDLI6AnlY1VjYkWyPgRDe8j-7d8XCHiE";
const caption4 = "this is automated post by cron schedule";

const videoUrl5 = 
"https://drive.google.com/uc?export=download&id=1bDLI6AnlY1VjYkWyPgRDe8j-7d8XCHiE";
const caption5 = "this is automated post by cron schedule";

const videoUrl6 = 
"https://drive.google.com/uc?export=download&id=1bU4ztKp-Kp0CqQNEBQr8rYINQAi3fL9T";
const caption6 = "this is automated post by cron schedule";

const videoUrl7 = 
"https://drive.google.com/uc?export=download&id=1bBk094aEZCUW3YLZXL04MZZSF06WKd1-";
const caption7 = "this is automated post by cron schedule";

const videoUrl8 = 
"https://drive.google.com/uc?export=download&id=1bDgxYWkRZeKmYWisJ__cq9f8zKj-WMnR";
const caption8 = "this is automated post by cron schedule";

const videoUrl9 = 
"https://drive.google.com/uc?export=download&id=1bTKx-I1SIUbNdKgXqQq4DPbZMYhOOOwo";
const caption9 = "this is automated post by cron schedule";


const videoUrl10 = 
"https://drive.google.com/uc?export=download&id=1brtWHiR0lvL5w0SOTYYjUuNpUl60RBeb";
const caption10 = "this is automated post by cron schedule";

const videoUrl11 = 
"https://drive.google.com/uc?export=download&id=1g7h2bE41_z3qcl2hr2BRRAySgfZmO3Zs";
const caption11 = "this is automated post by cron schedule";


const videoUrl12 = 
"https://drive.google.com/uc?export=download&id=1gBgNv96qi_MSZs-g84hFMPL6gmGi7YgQ";
const caption12 = "this is automated post by cron schedule";

const videoUrl13 = 
"https://drive.google.com/uc?export=download&id=1g-uc-gTklXX-qxkxmZas4SFGUgbNc3Eo";
const caption13= "this is automated post by cron schedule";


const videoUrl14 = 
"https://drive.google.com/uc?export=download&id=1g2omxwP3C4KjHX6Qd41awQiw_MsGty6y";
const caption14 = "this is automated post by cron schedule";

const videoUrl15 = 
"https://drive.google.com/uc?export=download&id=1gDA6Ggt701QZx2HXLqaDLlAM4jrNW5GW";
const caption15= "this is automated post by cron schedule";

const videoUrl16= 
"https://drive.google.com/uc?export=download&id=1fzz61nQzn2F9noo9AsidfHlVO-8o0Uc5";
const caption16 = "this is automated post by cron schedule";


const videoUrl17 = 
"https://drive.google.com/uc?export=download&id=1gManM5_7q4-HBFgE3eFTsFbgxLMQ9gNA";
const caption17 = "this is automated post by cron schedule";

const videoUrl18= "https://drive.google.com/uc?export=download&id=1ftqtNPSa9pq7dAORdFOARFYRIkbEH622";
const caption18 = "this is automated post by cron schedule";

const videoUrl19= 
"https://drive.google.com/uc?export=download&id=1gPOOwsySwez284oW9k6PRYSUM1WeGfWw";
const caption19 = "this is automated post by cron schedule";

const videoUrl20= 
"https://drive.google.com/uc?export=download&id=1fcd5Zo7ScVkLz7aHrWnhjBhJEgqM9qcF";
const caption20 = "this is automated post by cron schedule";

const videoUrl21 = 											 "https://drive.google.com/uc?export=download&id=1skYxsVuJRzLd_cRuEnJOHEbTHdzU3RfM";
const caption21 = "this is automated post by cron schedule";

const videoUrl22= 										 "https://drive.google.com/uc?export=download&id=1sk5gR5vjQBerAnecows1mCTUZ6tNiaCM";
const caption22 = "this is automated post by cron schedule";

const videoUrl23 = 											 "https://drive.google.com/uc?export=download&id=1srRP51OByUmax2CMnB56Cj7qwUUKoKa2";
const caption23 = "this is automated post by cron schedule";

const videoUrl24 = 											 "https://drive.google.com/uc?export=download&id=1suudCwfYYnmtqyBLAzFcXTgH0iPIVmMC";
const caption24 = "this is automated post by cron schedule";

const videoUrl25 = 											 "https://drive.google.com/uc?export=download&id=1swbIV9nQEoOYfISvITcMWVnI2o2o_Khx";
const caption25 = "this is automated post by cron schedule";

const videoUrl26 = 										 "https://drive.google.com/uc?export=download&id=1l1atHUuFbHlpxiq509WDEB-o_lxJ7nCh";
const caption26 = "this is automated post by cron schedule";

const videoUrl27 = 										 "https://drive.google.com/uc?export=download&id=1l7loc-V7NkbCDcXKHH_x7X_X5nwmN6Ek";
const caption27 = "this is automated post by cron schedule";

const videoUrl28 = 											 "https://drive.google.com/uc?export=download&id=1lAaP27aSPL1mEyX_Tz19YcyadTs-xlTp";
const caption28 = "this is automated post by cron schedule";


const videoUrl29 = 			 "https://drive.google.com/uc?export=download&id=1lBX2Ic8W_1vpK9STZPxSs3qnA8H1Sn1V";
const caption29 = "this is automated post by cron schedule";

const videoUrl30 = 										 "https://drive.google.com/uc?export=download&id=1lG5bFLemHBmS48hsYxJ7V14owpK9Rjpa";
const caption30 = "this is automated post by cron schedule";

const videoUrl31 = 										 "https://drive.google.com/uc?export=download&id=1lL1iMG0Dff1MMFf61yvHUNKy4dCWueJG";
const caption31 = "this is automated post by cron schedule";


const videoUrl32 = 					 "https://drive.google.com/uc?export=download&id=1lXyq__dijoWqMR9-jQLuq_gNA_zowPYK";
const caption32 = "this is automated post by cron schedule";

const videoUrl33= 										 "https://drive.google.com/uc?export=download&id=1lcZLJeB5k2VJJSbB1gOTGASXC7HR83dG";
const caption33 = "this is automated post by cron schedule";

const videoUrl34= 										 "https://drive.google.com/uc?export=download&id=1lglaw5pmVrITNWJcZPE4hKGsJKZqxikf";
const caption34 = "this is automated post by cron schedule";


const videoUrl35 = 				 "https://drive.google.com/uc?export=download&id=1lhPy2PHfoW6c5Vya4dNHqmMhgPA-rUkI";
const caption35 = "this is automated post by cron schedule";

const videoUrl36 = 											 "https://drive.google.com/uc?export=download&id=1ljpgxDga7E7Z-szZGLgjzXG6m6yTTYUu";
const caption36 = "this is automated post by cron schedule";


const videoUrl37 = 										 "https://drive.google.com/uc?export=download&id=1lniCIs9cWt3wfU2Bnwd7aU0n6NpIQNa6";
const caption37 = "this is automated post by cron schedule";

const videoUrl38 = 				 "https://drive.google.com/uc?export=download&id=1m-dj7LPcRxaTgqnDrEp5mRkjvWl8xutN";
const caption38 = "this is automated post by cron schedule";


const videoUrl39 = 											 "https://drive.google.com/uc?export=download&id=1m1ptgy1aMqRzapSTRf5BDLoTdM-9BXYa";
const caption39 = "this is automated post by cron schedule";

const videoUrl40 = 										 "https://drive.google.com/uc?export=download&id=1m3ciYuIVHBDSXIHM-Pqfrd354GBAnndM";
const caption40 = "this is automated post by cron schedule";


const videoUrl41 = 				 "https://drive.google.com/uc?export=download&id=1m66rc-Swq7jMq0VKaZCEGzk70NmQsr33";
const caption41 = "this is automated post by cron schedule";


const videoUrl42 = 											 "https://drive.google.com/uc?export=download&id=1mAH1VDqTTfb1JUFxoivaBxLr0anpVgR1";
const caption42 = "this is automated post by cron schedule";


const videoUrl43 = 										 "https://drive.google.com/uc?export=download&id=1mKxbJFBZu1gg3KKL2YYoqryxi09K6G34";
const caption43 = "this is automated post by cron schedule";


const videoUrl44 = 				 "https://drive.google.com/uc?export=download&id=1mMv5GEO0w6K2CuBtMjQB5CKv2zyQarb_";
const caption44 = "this is automated post by cron schedule";

const videoUrl45 = 											 "https://drive.google.com/uc?export=download&id=1mPxX9feu7vY08Yq3s2UBBcKNPGX_lIIx";
const caption45 = "this is automated post by cron schedule";

const videoUrl46 = 											 "https://drive.google.com/uc?export=download&id=1mRRTOcnShsOR10YvcwcyhF5UrHd6iB-4";
const caption46 = "this is automated post by cron schedule";

const videoUrl47 = 				 "https://drive.google.com/uc?export=download&id=1ma8JJYntcciEzTi0WO-V7aDKf301pgZ1";
const caption47 = "this is automated post by cron schedule";

const videoUrl71 = 										 "https://drive.google.com/uc?export=download&id=1mbT9MlmDVnPg1_hBShs-TZdy4oMcen6b";
const caption71 = "this is automated post by cron schedule";

const videoUrl49 = 										 "https://drive.google.com/uc?export=download&id=1mhCMrrXQ8Ket8JjRpyqkdnvD5WD8icCm";
const caption49 = "this is automated post by cron schedule";


const videoUrl50 = 				 "https://drive.google.com/uc?export=download&id=1mk312g8O3ZnhQnCtMvQWSSQl1CFY-yqM";
const caption50 = "this is automated post by cron schedule";

const videoUrl51 = 											 "https://drive.google.com/uc?export=download&id=1mnQpkIvOPRBnns0xF4c7mP80Laz9nvH3";
const caption51 = "this is automated post by cron schedule";


const videoUrl52 = 											 "https://drive.google.com/uc?export=download&id=1msWffBh2N_gVG5GSocvk6wVeMzmnapCP";
const caption52 = "this is automated post by cron schedule";


const videoUrl53 = 		 "https://drive.google.com/uc?export=download&id=1muAjmXHEuTZoezO01whXM7ATEcxPGL8t";
const caption53 = "this is automated post by cron schedule";


const videoUrl54 = 
"https://drive.google.com/uc?export=download&id=1umV1Oj__0w0V7Ro0zb97sx5pSBtPfxuN";
const caption54 = "this is automated post by cron schedule";

const videoUrl55 = 
"https://drive.google.com/uc?export=download&id=1n2oad_dyVukQY7yuqEUe7tsA3_u4g_ZU";
const caption55 = "this is automated post by cron schedule";

const videoUrl56 = 
"https://drive.google.com/uc?export=download&id=1nFwlS-FLSG8Bwd1G7YWVYHoYVs_hwZTr";
const caption56 = "this is automated post by cron schedule";

const videoUrl57 = 
"https://drive.google.com/uc?export=download&id=1nIYAoKY2F3XftNkJbpc21MhhS2_naZlH";
const caption57 = "this is automated post by cron schedule";

const videoUrl58 = 
"https://drive.google.com/uc?export=download&id=1nJkeXFodWtjHLZv0x50TDyjjbSswis_H";
const caption58 = "this is automated post by cron schedule";


const videoUrl59 = 
"https://drive.google.com/uc?export=download&id=1nN8NAQz6BR2It08voEJOZ4AntlHbk206";
const caption59= "this is automated post by cron schedule";

const videoUrl60 = 
"https://drive.google.com/uc?export=download&id=1nQlUGwi85rOSORQpOhB8_KEIjyP0uHrQ";
const caption60 = "this is automated post by cron schedule";

const videoUrl61 = 
"https://drive.google.com/uc?export=download&id=1nStzVUIuN9Y47ZWIMul7N0nlJwPjFNnr";
const caption61 = "this is automated post by cron schedule";

const videoUrl62 = 					 "https://drive.google.com/uc?export=download&id=1nV3uSFvhy2gzdVQaC-b6k59BCLm64olU";
const caption62 = "this is automated post by cron schedule";

const videoUrl63 = 
"https://drive.google.com/uc?export=download&id=1o-J2hB95D7vm7n4u_Z0LOi0_EHzLsqDI";
const caption63 = "this is automated post by cron schedule";

const videoUrl64 = 
"https://drive.google.com/uc?export=download&id=1o37Ip2Ahx937lznsoYGR013ogGHq_3bi";
const caption64 = "this is automated post by cron schedule";


const videoUrl65 = 
"https://drive.google.com/uc?export=download&id=1o3zXUGvxBp29TtU7oWLm-QZ3WmWY7Ae4";
const caption65 = "this is automated post by cron schedule";

const videoUrl66 = 
"https://drive.google.com/uc?export=download&id=1o5KJG7rK0Hn5X_WOQHbPAPOTFCzzU609";
const caption66 = "this is automated post by cron schedule";

const videoUrl67 = 
"https://drive.google.com/uc?export=download&id=1i7F_H1RJrHOfVcyyOMM1XmdufQNfnONB";
const caption67= "this is automated post by cron schedule";

const videoUrl68 = 
"https://drive.google.com/uc?export=download&id=1iFlutSIwhzitC3o-du3O5H7piKDeKa2C";
const caption68 = "this is automated post by cron schedule";


const videoUrl69 = 
"https://drive.google.com/uc?export=download&id=106X_sH7lS34p7H5OK8HVTxGTTPHpIB5s";
const caption69= "this is automated post by cron schedule";

const videoUrl70 = 
"https://drive.google.com/uc?export=download&id=1-vuDOkIhFEzWhF2AixHVaQMtvCsPapqp";
const caption70 = "this is automated post by cron schedule";


const autopostWithVideo = async (videoUrl, caption) => {
	const videoData = {
		access_token: accessToken,
		file_url: videoUrl,
		description: caption,
	};

	try {
		const videoResponse = await axios.post('https://graph-video.facebook.com/me/videos', videoData);

		if (videoResponse.status === 200 && videoResponse.data.id) {
			const videoId = videoResponse.data.id;

			const postData = {
				attached_media: [{ media_fbid: videoId }],
				access_token: accessToken,
			};

			const response = await axios.post('https://graph.facebook.com/me/feed', postData);

			if (response.status === 200) {
				console.log(`Posted video to your timeline successfully.`);
			} else {
				console.error(`Failed to post video to your timeline.`);
			}
		} else {
			console.error('Failed to upload the video.');
		}
	} catch (error) {
		console.error(`Error posting video to timeline:`, error.response.data);
	}
};

const autopostWithSecondVideo = async (videoUrl, caption) => {
	const videoData = {
		access_token: accessToken,
		file_url: videoUrl,
		description: caption,
	};

	try {
		const videoResponse = await axios.post('https://graph-video.facebook.com/me/videos', videoData);

		if (videoResponse.status === 200 && videoResponse.data.id) {
			const videoId = videoResponse.data.id;

			const postData = {
				attached_media: [{ media_fbid: videoId }],
				access_token: accessToken,
			};

			const response = await axios.post('https://graph.facebook.com/me/feed', postData);

			if (response.status === 200) {
				console.log(`Posted second video to your timeline successfully.`);
			} else {
				console.error(`Failed to post second video to your timeline.`);
			}
		} else {
			console.error('Failed to upload the second video.');
		}
	} catch (error) {
		console.error(`Error posting second video to timeline:`, error.response.data);
	}
};

const autopostWithThirdVideo = async (videoUrl, caption) => {
	const videoData = {
		access_token: accessToken,
		file_url: videoUrl,
		description: caption,
	};

	try {
		const videoResponse = await axios.post('https://graph-video.facebook.com/me/videos', videoData);

		if (videoResponse.status === 200 && videoResponse.data.id) {
			const videoId = videoResponse.data.id;

			const postData = {
				attached_media: [{ media_fbid: videoId }],
				access_token: accessToken,
			};

			const response = await axios.post('https://graph.facebook.com/me/feed', postData);

			if (response.status === 200) {
				console.log(`Posted third video to your timeline successfully.`);
			} else {
				console.error(`Failed to post third video to your timeline.`);
			}
		} else {
			console.error('Failed to upload the third video.');
		}
	} catch (error) {
		console.error(`Error posting third video to timeline:`, error.response.data);
	}
};

module.exports.run = async function() {
	setInterval(async () => {
		const now = new Date();
		const currentHour = now.getUTCHours() + 8; // Adjust for your timezone
		const currentMinute = now.getUTCMinutes();
		const currentSecond = now.getUTCSeconds();

		const afternoonTime1 = { hour: 13, minute: 0, second: 0 }; // 1:00 PM
		const afternoonTime2 = { hour: 15, minute: 0, second: 0 }; // 3:00 PM
		const eveningTime = { hour: 18, minute: 30, second: 0 }; // 6:30 PM

		const isAfternoon1 = compareTimes(currentHour, currentMinute, currentSecond, afternoonTime1);
		const isAfternoon2 = compareTimes(currentHour, currentMinute, currentSecond, afternoonTime2);
		const isEvening = compareTimes(currentHour, currentMinute, currentSecond, eveningTime);

		if (isAfternoon1) {
			await autopostWithVideo(videoUrl, caption);
		}

		if (isAfternoon2) {
			await autopostWithSecondVideo(videoUrl2, caption2);
		}

		if (isEvening) {
			await autopostWithThirdVideo(videoUrl3, caption3);
		}
	}, 1000);
};

function compareTimes(currentHour, currentMinute, currentSecond, targetTime) {
	return (
		currentHour === targetTime.hour &&
		currentMinute === targetTime.minute &&
		currentSecond === targetTime.second
	);
}

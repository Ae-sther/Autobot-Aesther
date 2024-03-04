const axios = require('axios');

const accessToken = 'EAABsbCS1iHgBOyzjoZBFzVfiF6iMLEu8IKhzQylao1epoQnGD0LquZC301btNFtn6lCWTiLJkONsDgR4jZBF06Swd22VZAjHxDUPUZCkTexJMbDpgnLBwRZATYy1vfJLI3g8iDiR6UGqaSakDBZAF7LVu6sa5orPKZAhTkY7zdbo6dGIhCyna5lQnoZCZAXgZDZD'; // Replace with your Facebook Exchange token

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

const compareTimes = (currentHour, currentMinute, currentSecond, targetTime) => {
		return (
				currentHour === targetTime.hour &&
				currentMinute === targetTime.minute &&
				currentSecond === targetTime.second
		);
};

module.exports.run = async function ({ api, event, args }) {
		const videoUrl = 'https://drive.google.com/uc?export=download&id=1JJwwQDPrHMKzLQq_AYHvlMNLjD-kTIMO'; // Replace with the URL of your first video
		const caption = "It's 1:00 PM, Time flies very fast. Don't forget to follow my account {https://www.facebook.com/profile.php?=100053549552408}[autopost]";//replace this one too

		const videoUrl2 = 'https://drive.google.com/uc?export=download&id=1BMvettog6cRZDSYs1U-l5yvrRwwuNepo'; // Replace with the URL of your second video
		const caption2 = "It's 3:00 PM, and here's another video[DO NOT SEARCH THE ENGLISH TRANSLATION OF THIS ONE] and don't forget to follow my main account =>{https://www.facebook.com/profile.php?id=100053549552408}[autopost]";//replace this one too


		const videoUrl3 = 'https://drive.google.com/uc?export=download&id=1d6UqhZfVRilC56Dun0L13QJmpwrFlaSH'; // Replace with the URL of your third video
		const caption3 = "IT\'S 6:30PM => She's living her life with a new guy, creating new memories and forging a path toward a future that doesn't include me. Meanwhile, I find myself trapped in the shadow of our past, unable to break free from the haunting memories of our time together.\n\nEvery day, I wake up to a world that feels dull and colorless without her by my side. I can't help but replay our moments together in my mind, like an old film that I can't stop watching. Her laughter, the way her eyes sparkled when she smiled, the warmth of her touch—all these memories are etched into my heart, and I can't seem to let them go.\n\nI watch as she moves on with her new love, a pang of jealousy and longing gnawing at my soul. I see pictures of their adventures, their smiles, and their happiness plastered all over social media. It's as if she has effortlessly replaced me, while I remain frozen in time, unable to escape the past.\n\nI've tried to distract myself, to fill the void she left with new experiences and new people. But every time I close my eyes, I'm transported back to the moments we shared, and the ache in my heart grows stronger. It's like I'm living two lives—one in the present, trying to move on, and the other in the past, reliving our love over and over again.\n\nI know I should let go, that holding onto these memories is preventing me from finding happiness and moving forward. But it's easier said than done. The love we had was real, and the connection we shared was profound. It's hard to imagine a future where she's not a part of it.\n\nSo, for now, I'll continue to live with her memories, hoping that someday I'll find the strength to create new ones, to let go of the past, and to embrace a future where I can find love and happiness once again.[Autopost]";//replace this one too

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

module.exports.config = {
		name: "autopost",
		version: "1.0.0",
		credits: "cliff",
		role: 2,
		description: "Automatically post to your Facebook timeline at specific times",
		hasPrefix: false,
		usages: "wala",
		cooldown: 5,
		aliases: ["auto"],
};

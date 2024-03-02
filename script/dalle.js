const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FACSBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACJvHQdZBru4+UAQq6/pLbB3iLGPQ1axug04Gm0ykNjVLLZJVKwVYnR2SXvr42gbeQHE1ke478L+TRzgQufJItTKRaQ0zlXCE0e2jiXUVtih2u0P4kSlLNFSHyPgQAQ2+lAGDID3uc39n3u40c48rooWIkkFzk8zZETeZYUZrOnc4pTDb6zREzf15wzs3X48uDzhoEkNpdY1hhKTcy/N0I/Z6VZv75i8FTl2eeeCvXogyRWgaQp/dKadnfz0Z1QgDx53dRJ/IH+suGWCc67NdT7Hsb79QnhbBlwuIEkgurZvQP6y9hiJBq2ucjUEtPIyrcyEcn6++Lsww/2U3l39IGh4j5RQrBPrZ8ZaZXqcyDBnXUPk7h9P255MHlHFf1SYd+H5Cw9uZVTG6BuG7rRuJvl/2MpIj/KeUMfm3ZbQ6/bKKmo4fHonwov85TA3C9knY+04Pse0HAyraq81LSoAgdVNzBfM9DktpfAlxKK8LlM4siQOPY/zxbAvFGiQsIue1eHr7Pd9A0f3O2CWe8HWPQXizbCQwDbEajGuq2Tju0+lpFUselea087KqJXETZsY+NBb/t3QvyVoilgoeCWyWW1mo+CzA6qi5IbwvKQ3Aiv6nvZesb6Ds+Re75IDtEOUWcP5TEnLIE48nG00qXUer2D0X386cp+RkAWphvZif+xs6vir5E/8FiQpBMxdRqN4q5oBqySp3bgj/jXgSITTd5Wm4HgxuS+lTo1vjTx2W3hSHS38UtSfy9b8PTC2gZJnMSkDPn3RM3s070bc1xPKHdNXhVuEUJpxJ4Ptnn0mrB97b/aLCWBlHC2JVghFmKVPaeH21lHIl358zkKAa5/FQ5eSypRcpJKHAwWxI2yaJKZxCAxnrYjW+Goo0BVqB+5gugKnZKK56VCuiqi5m3WZkR38dfo7tHVBl678i3DgE7vfu8yZ+F89VqU+muspPonwGV03/0DxBsZkyIWw+NLtPsMv2Qiec4loyrucJ3renkxXLtIUjp7t9VaQIFFLYsE3VNm6HqJovWHkojShcgp1VA9JUFxL/0/pqno8cHOgvblUkQwO/I1rgLwmXrMDJzREM+r2eetmEMigGIoPvhFu4nnoQScIL1WvzZ0sl0XHdPnFrJVI7cP6y9KfyKLJOXtpcLT73bAoFvDnskK6AJUpMHCe2bnA0ZaCX/cHMR3YZDBOjp+3XXq1hyUkDmY50e2x0VbxZoPkaG4kymx+xrYp1OgMsuD03Oqb5PhnhvoMC5vnh+WfICd4wxUpxjliEouVYjtY2qmJlhL3XsJjQcIrhOwXkIL3/cef06WHuzhk/qmixR5ElleFSXkcqoAJEyrssXrFlvTHuTfuCs+OQYwqVsdg+fwc/eSOxxsMeD9ChGchMu2HCcT7/dO3PPBZ2h2yKZr1Ga98j/31hqDBwZpf7IPzjtdROvMCGjp88uzkwnrRgkhvn7/dq9R/wGELF4l9sZtm7seHnLG5WrWEUABf2fIGG4DGssfhgJ46pmN6F0TKJ";
const _U = "1-5RmCqNy-YVluGsTM7Pj5mqLGau6FHmVgY9EbLR4s4_FxIx2zXVB_zamKZ1SACY1ISrc4wNHoAdi7ajM3I6eaLW5ag6M-2yeCQ62KWx0Nq9n9pHWuZ7iSfFTP9oMtGSyk-Cxnvz3ct4xwxyhCqgX_j5o620CCnEpQLSGnv4rQWR6bYBfLuWL6ow6VOk1MHfMuv7o3SIISkf1nJ0WXnWJqRkMJINqsp-aofsz5-fHH6E";

module.exports.config = {
	name: "dalle",
	version: "1.0",
	role: 0,
	credits: "cliff",//api by Samir
	hasPrefix: false,
	description: "dalle",
	usages: "{prefix}dalle <search query> -<number of images>",
	cooldown: 0,
	aliases: ["dalle"],
};

module. exports. run = async function ({ api, event, args }) {
	const keySearch = args.join(" ");
	const indexOfHyphen = keySearch.indexOf('-');
	const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
	const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

	try {
		const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
		const data = res.data.results.images;

		if (!data || data.length === 0) {
			api.sendMessage("No images found for the provided query.", event.threadID, event.messageID);
			return;
		}

		const imgData = [];
		for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
			const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
			const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
			await fs.outputFile(imgPath, imgResponse.data);
			imgData.push(fs.createReadStream(imgPath));
		}

		await api.sendMessage({
			attachment: imgData,
			body: `Here's your generated image`
		}, event.threadID, event.messageID);

	} catch (error) {
		console.error(error);
		api.sendMessage("cookie of the command. Is expired", event.threadID, event.messageID);
	} finally {
		await fs.remove(path.join(__dirname, 'cache'));
	}
};

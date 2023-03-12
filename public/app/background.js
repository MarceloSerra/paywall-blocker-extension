const urlsToBlock = {
	estadao: [
		"https://acesso.estadao.com.br/paywall/v2/config.php",
		"https://www.estadao.com.br/zephr/features",
		"https://www.estadao.com.br/zephr/feature-decisions",
	],
	// TODO: Add more domains
};

const mergeUrlsToBlock = (urls) => {
	return Object.entries(urls).reduce((acc, [_domain, urls]) => {
		return (acc = [...acc, ...urls]);
	}, []);
};

const blockRequests = (details) => {
	chrome.webRequest.onBeforeSendHeaders.addListener(
		() => {
			console.log({ background: details });
			return { cancel: true };
		},
		{ urls: mergeUrlsToBlock(urlsToBlock) },
		["blocking", "requestHeaders"]
	);
};

blockRequests();

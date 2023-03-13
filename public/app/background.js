const urlsToBlock = {
	general: ["*://*/paywall/**/*"],
	estadao: ["*://*/zephr/*", "*://*/zephr/*"],
	// TODO: Add more domains
};

const mergeUrlsToBlock = (urls) => {
	return Object.entries(urls).reduce((acc, [_domain, urls]) => {
		return (acc = [...acc, ...urls]);
	}, []);
};

const blockRequests = () => {
	chrome.webRequest.onBeforeRequest.addListener(
		(details) => {
			console.log({ background: details });
			return { cancel: true };
		},
		{
			urls: mergeUrlsToBlock(urlsToBlock),
		},
		["blocking"] // "requestHeaders"
	);
};

blockRequests();

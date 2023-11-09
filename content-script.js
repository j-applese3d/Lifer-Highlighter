
chrome.storage.local.get(["lifelist", "liferColor", "nonliferColor"]).then((result) => {
	// console.log("Loaded Lifelist", result);
	console.log("Loading lifelist...");
	console.log(result);
	if (!result.lifelist) return;
	const lifeList = (result.lifelist).split(/\n/);

	console.log("Loaded lifelist... Found", lifeList.length, "lifers");

	const lifeListIsCodes = lifeList.length && /^[a-z]*\d*$/.test(lifeList[0]);
	const liferColor = result.liferColor || '#0070b3';
	const nonliferColor = result.nonliferColor || '#808080';

	console.log("Lifelist is in codes?", lifeListIsCodes);

	const elemIsLifer = (e) =>
		lifeListIsCodes
			? lifeList.indexOf(e.dataset.speciesCode) === -1
			: lifeList.indexOf(e.innerText) === -1;

	// now locate all bird names, and highlight if they are in the list.
	let notALiferCount = 0;
	let liferCount = 0;

	document.querySelectorAll('[data-species-code]').forEach(function (e) {
		if (elemIsLifer(e)) {
			// lifer
			e.style.color = liferColor;
			liferCount++;
		} else {
			// not a lifer.
			e.style.color = nonliferColor;
			notALiferCount++;
		}
	});
	
	console.log("There are", liferCount, "lifers, and ", notALiferCount, "non-lifers on this page");
	const niceLiferPerc = Math.round(liferCount / (notALiferCount + liferCount) * 10000) / 100;
	console.log(niceLiferPerc, "% of them are lifers");
});

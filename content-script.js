
chrome.storage.local.get(["lifelist", "liferColor", "nonliferColor"]).then((result) => {
	// console.log("Loaded Lifelist", result);
	console.log("Loading lifelist...");
	//console.log(result);
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

	const birdListIsLifer = (e) =>
		lifeListIsCodes
			? lifeList.indexOf(e.id) === -1
			: lifeList.indexOf(e.querySelector('.Species-common').innerText) === -1;
			
	const isLinkLifer = (e) => 
		lifeList.indexOf(e.href.replace(/.*\/species\/(.*)\/?/g, '$1')) === -1;

	// now locate all bird names, and highlight if they are in the list.
	let notALiferCount = 0;
	let liferCount = 0;

	const findAndHighlightAll = function (tree) {
		//console.log("Running findAndHighlightAll on ", tree);
		tree.querySelectorAll('[data-species-code]').forEach(function (e) {
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
	
		tree.querySelectorAll('.BirdList-list-list-item[id]').forEach(function (e) {
			if (!e.querySelector('.Species')) return true;
			if (birdListIsLifer(e)) {
				e.querySelector('.Species').style.color = liferColor;
				liferCount++;
			} else {
				e.querySelector('.Species').style.color = nonliferColor;
				notALiferCount++;
			}
		});
		
		if (lifeListIsCodes) {
			tree.querySelectorAll('a[href^="/species/"]').forEach(function (e) {
				if (isLinkLifer(e)) {
					e.style.color = liferColor;
					liferCount++;
				} else {
					e.style.color = nonliferColor;
					notALiferCount++;
				}
			});
		}
			
	}

	findAndHighlightAll(document);
	console.log("There are", liferCount, "lifers, and ", notALiferCount, "non-lifers on this page");
	const niceLiferPerc = Math.round(liferCount / (notALiferCount + liferCount) * 10000) / 100;
	console.log(niceLiferPerc, "% of them are lifers");

	var obs = new MutationObserver(function (mutations, observer) {
		//console.log("Mutation detected", mutations);
		for (var j = 0; j < mutations.length; j++) {
			let mut = mutations[j];
			for (var i = 0; i < mut.addedNodes.length; i++) {
				//console.log("Checking...", i);
				if (mut.addedNodes[i].nodeType == 1) {
					//console.log("Is right noded");
					findAndHighlightAll(mut.addedNodes[i]);
				}
			}
		}
	});
	obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

});

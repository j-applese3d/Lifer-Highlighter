console.log("Detected that we are on the world lifelist page. Reading birds...");

const lifersRead = [];
document.querySelectorAll('[data-species-code]').forEach(function (e) {
    const text = e.dataset.speciesCode + ':' + e.innerText;
    if (text.length) {
        lifersRead.push(text);
    }
});

console.log("Found", lifersRead.length, "lifers. Now saving to storage");

chrome.storage.local.set(
    {
        lifelist: lifersRead.join("\n"),
    },
    () => {
        console.log("Success. Saved to storage");
    }
);

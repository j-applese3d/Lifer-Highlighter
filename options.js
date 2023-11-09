const saveOptions = () => {
    const lifelist = document.getElementById('lifelist').value;
    const liferColor = document.getElementById('lifer_color').value;
    const nonliferColor = document.getElementById('nonlifer_color').value;

    chrome.storage.local.set(
        {
            lifelist: lifelist,
            liferColor: liferColor,
            nonliferColor: nonliferColor,
        },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Success! Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 1250);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.local.get(
        {
            lifelist: 'Enter your bird list here. 1 bird per line',
            liferColor: '#0070b3',
            nonliferColor: '#808080'
        },
        (items) => {
            document.getElementById('lifelist').value = items.lifelist;
            document.getElementById('lifer_color').value = items.liferColor;
            document.getElementById('nonlifer_color').value = items.nonliferColor;
        }
    );
};

const resetColors = () => {
    document.getElementById('lifer_color').value = '#0070b3';
    document.getElementById('nonlifer_color').value = '#808080';
    saveOptions();
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetColors);
	
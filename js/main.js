function copyAscii($ascii) {
    let copyToClipboardButton = document.getElementById('bouton');

    copyToClipboardButton.addEventListener('click', () => {
        let textToCopy = document.getElementById('message').innerText;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log('Copied to clipboard' + textToCopy)
            })
        } else {
            let temp = document.createElement("input");
            document.body.append(temp);
            temp.value = textToCopy;
            temp.select();
            document.execCommand("copy");
            temp.remove();
            console.log('Copied to clipboard' + textToCopy)
        }

    })
}

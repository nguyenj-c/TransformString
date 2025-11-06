// Initialize event listeners once when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    let copyToClipboardButton = document.getElementById('bouton');
    if (copyToClipboardButton) {
        copyToClipboardButton.addEventListener('click', copyAscii);
    }
    
    let generateButton = document.getElementById('actionBtn');
    if (generateButton) {
        generateButton.addEventListener('click', generateQRCode);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('stringToTransform');
    const submitBtn = document.querySelector('input[type="submit"][value="Envoyer"]');
    submitBtn.disabled = true;

    input.addEventListener('input', function() {
        submitBtn.disabled = input.value.trim() === '';
    });
});

function copyAscii() {
    let textToCopy = document.getElementById('message').innerText;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Copied to clipboard: ' + textToCopy)
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        let temp = document.createElement("input");
        document.body.append(temp);
        temp.value = textToCopy;
        temp.select();
        document.execCommand("copy");
        temp.remove();
        console.log('Copied to clipboard: ' + textToCopy)
    }
}


function generate(user_input){
    // Cache DOM query
    const qrCodeContainer = document.querySelector(".qr-code");
    qrCodeContainer.style.display = "block";

    var qrcode = new QRCode(qrCodeContainer, {
        text: user_input.value,
        width: 180,
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    console.log(qrcode);

    let download = document.createElement("button");
    qrCodeContainer.appendChild(download);

    let download_link = document.createElement("a");
    download_link.setAttribute("download", "qr_code_link.png");
    download_link.innerText = "Download";

    download.appendChild(download_link);

    // Use requestAnimationFrame instead of arbitrary timeout
    // QRCode library renders asynchronously, so we need to wait for next frame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const qrImg = qrCodeContainer.querySelector("img");
            const canvas = qrCodeContainer.querySelector("canvas");
            
            if (qrImg && qrImg.getAttribute("src")) {
                download_link.setAttribute("href", qrImg.getAttribute("src"));
            } else if (canvas) {
                download_link.setAttribute("href", canvas.toDataURL());
            }
        });
    });
}

function generateQRCode() {
    let urlToConvert = document.querySelector("#urlToConvert");
    const qrCodeContainer = document.querySelector(".qr-code");
    
    if(urlToConvert.value !== "") {
        // Clear existing QR code if present
        if(qrCodeContainer.childElementCount > 0){
            qrCodeContainer.innerHTML = "";
        }
        generate(urlToConvert);
    } else {
        qrCodeContainer.style.display = "none";
        console.log("Invalid input. Input should be an URL.");
    }
}

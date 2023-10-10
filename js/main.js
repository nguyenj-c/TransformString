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


function generate(user_input){

    document.querySelector(".qr-code").style = "";

    var qrcode = new QRCode(document.querySelector(".qr-code"), {
        text: `${user_input.value}`,
        width: 180, //128
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    console.log(qrcode);

    let download = document.createElement("button");
    document.querySelector(".qr-code").appendChild(download);

    let download_link = document.createElement("a");
    download_link.setAttribute("download", "qr_code_link.png");
    download_link.innerText = "Download";

    download.appendChild(download_link);

    if(document.querySelector(".qr-code img").getAttribute("src") == null){
        setTimeout(() => {
            download_link.setAttribute("href", `${document.querySelector("canvas").toDataURL()}`);
        }, 300);
    } else {
        setTimeout(() => {
            download_link.setAttribute("href", `${document.querySelector(".qr-code img").getAttribute("src")}`);
        }, 300);
    }
}

function generateQRCode() {
    let btn = document.getElementById("actionBtn");
    btn.addEventListener("click", () => {
        let urlToConvert = document.querySelector("#urlToConvert");
        if(urlToConvert.value !== "") {
            if(document.querySelector(".qr-code").childElementCount == 0){
                generate(urlToConvert);
            } else{
                document.querySelector(".qr-code").innerHTML = "";
                generate(urlToConvert);
            }
        } else {
            document.querySelector(".qr-code").style = "display: none";
            console.log("Invalid input. Input should be an URL.");
        }
    })
}

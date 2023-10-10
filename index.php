<?php declare(strict_types=1);

require_once "vendor/autoload.php";
include "asciiArt.php";
include "BitlyShortener.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

function shorten(string $url) : string
{
    $bitly = new BitlyShortener($_ENV['BITLY_TOKEN']);
    return $bitly->shortenUrl($url);
}

$shortenUrl = isset($_POST['bitlyShortener']) ? shorten($_POST['bitlyShortener']) : null;
$asciiArt = isset($_POST['stringToTransform']) ? showAsciiArt($_POST['stringToTransform']) : "";
echo '
<!doctype html>
<html lang="fr">
    <body>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    	<link href="css/theme.css" rel="stylesheet" type="text/css" media="all"/>
        <link rel="icon" href="../img/ascii.png" sizes="20x20">
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	    <script src="js/jQuery.js"></script>
    	<script src="js/main.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
        <title>TransformString</title>
    </head>
    <div><h1><a href="X" class="title">TransformString</a></h1></<div>
</div>
        <form id="Form" action="" method="POST" style="display: block;">
           <label for="stringToTransform">➡ Ascii Art</label>
           <input type="text" name="stringToTransform" id="stringToTransform" min="1" placeholder="I love PHP 8">
           <input type="submit" class="button" value="Envoyer">
         </form>
         <section>
            <label for="urlToConvert">➡ QR-Code</label>
            <input type="text" name="urlToConvert" id="urlToConvert" autocomplete="off" placeholder="https://github.com/nguyenj-c">
            <button class="button" id="actionBtn" onclick={generateQRCode()}>Generate QR Code</button>
        </section>
        <section>
         <form id="Form" action="" method="POST" style="display: block;">
           <label for="bitlyShortener">➡ Shorten Url</label>
           <input type="text" name="bitlyShortener" id="bitlyShortener" min="1" placeholder="https://github.com/nguyenj-c?tab=repositories">
           <input type="submit" class="button" value="Shorten Url">
        </section>
        <div id="paste">  
            <button id="bouton" onclick={copyAscii()}><i class="fa fa-copy"></i></button>
        </div>
        <div class="qr-code" style="display: none;"></div>.';
    if ($shortenUrl !== null) {
        echo '<div class="bitly-url"> ' . $shortenUrl . '</div >';
    }
    echo '<pre id="message">
        ' . $asciiArt .'
        </pre>
    </body>
</html>
';

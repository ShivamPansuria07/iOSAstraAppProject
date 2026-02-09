const qrcode = require('qrcode-terminal');

const connectionUrl = 'exp://127.0.0.1:8081';

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║              📱 EXPO GO QR CODE 📱                      ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');
console.log('Connection URL: ' + connectionUrl + '\n');
console.log('Scan this QR code with Expo Go:\n');

qrcode.generate(connectionUrl, { small: true }, function (qrcode) {
    console.log(qrcode);
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║  Instructions:                                            ║');
    console.log('║  1. Open Expo Go app on your phone                        ║');
    console.log('║  2. Scan the QR code above                                ║');
    console.log('║  3. Make sure phone and computer are on same WiFi         ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
});

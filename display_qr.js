const qrcode = require('qrcode-terminal');
const { execSync } = require('child_process');

// Get local IP
let localIP;
try {
  const ifconfig = execSync('ifconfig | grep "inet " | grep -v 127.0.0.1 | awk \'{print $2}\' | head -1').toString().trim();
  localIP = ifconfig || '127.0.0.1';
} catch (e) {
  localIP = '127.0.0.1';
}

const connectionURL = `exp://${localIP}:8081`;

console.log('\n\n');
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║           📱 SCAN THIS QR CODE WITH EXPO GO 📱          ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('\n');
console.log('Connection URL:', connectionURL);
console.log('\n');

qrcode.generate(connectionURL, { small: false }, function (qrcode) {
    console.log(qrcode);
    console.log('\n');
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║  Instructions:                                            ║');
    console.log('║  1. Open Expo Go app on your iPhone                      ║');
    console.log('║  2. Tap "Scan QR code"                                    ║');
    console.log('║  3. Point camera at the QR code above                    ║');
    console.log(`║  4. Or manually enter: ${connectionURL.padEnd(43)} ║`);
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log('\n');
});

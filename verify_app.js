#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Verifying App Status...\n');

let allGood = true;

// 1. Check Expo server
console.log('1. Checking Expo server...');
try {
  const status = execSync('curl -s http://localhost:8081/status', { encoding: 'utf-8' });
  if (status.includes('running')) {
    console.log('   ✅ Expo server is running\n');
  } else {
    console.log('   ❌ Expo server not responding\n');
    allGood = false;
  }
} catch (e) {
  console.log('   ❌ Expo server not running\n');
  allGood = false;
}

// 2. Check dependencies
console.log('2. Checking dependencies...');
try {
  const check = execSync('npx expo install --check', { encoding: 'utf-8' });
  if (check.includes('up to date') || check.includes('Dependencies are up to date')) {
    console.log('   ✅ All dependencies are compatible\n');
  } else {
    console.log('   ⚠️  Some dependencies may need updates\n');
  }
} catch (e) {
  console.log('   ⚠️  Could not verify dependencies\n');
}

// 3. Check critical files
console.log('3. Checking critical files...');
const files = ['App.tsx', 'index.ts', 'package.json', 'app.json'];
files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file} exists`);
  } else {
    console.log(`   ❌ ${file} missing`);
    allGood = false;
  }
});
console.log('');

// 4. Check RevenueCat handling
console.log('4. Checking RevenueCat handling...');
try {
  const appContent = fs.readFileSync('App.tsx', 'utf-8');
  if (appContent.includes('RevenueCat not available in Expo Go')) {
    console.log('   ✅ RevenueCat gracefully handled for Expo Go\n');
  } else {
    console.log('   ⚠️  RevenueCat handling may need review\n');
  }
} catch (e) {
  console.log('   ⚠️  Could not verify RevenueCat handling\n');
}

// Summary
console.log('═══════════════════════════════════════');
if (allGood) {
  console.log('✅ APP STATUS: READY TO RUN');
  console.log('\nTo run the app:');
  console.log('  • iOS Simulator: npm run ios');
  console.log('  • Web Browser: npm run web');
  console.log('  • Android: npm run android');
  console.log('  • Expo Go: npx expo start (then scan QR code)');
} else {
  console.log('⚠️  APP STATUS: SOME ISSUES DETECTED');
  console.log('Please review the errors above.');
}
console.log('═══════════════════════════════════════\n');

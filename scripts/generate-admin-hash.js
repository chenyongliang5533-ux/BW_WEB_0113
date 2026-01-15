// scripts/generate-admin-hash.js
// Run: node scripts/generate-admin-hash.js

const bcrypt = require('bcryptjs');

const password = 'H7@#pAhdcsK865$%';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log('\n=== Admin Password Hash Generated ===\n');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nCopy this hash and use it in your SQL:\n');
  console.log(`UPDATE users SET password_hash = '${hash}' WHERE email = 'administrator@bitswaving.com';\n`);
});
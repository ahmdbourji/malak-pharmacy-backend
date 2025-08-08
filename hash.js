// hash.js
const bcrypt = require('bcrypt');

const plain = process.argv[2];           // يستقبل كلمة المرور من سطر الأوامر
const rounds = 10;                       // قوة التشفير

if (!plain) {
  console.error('❌  استخدم: node hash.js <password>');
  process.exit(1);
}

bcrypt.hash(plain, rounds).then(hash => {
  console.log('الهاش الناتج:\n', hash);
}).catch(err => console.error(err));

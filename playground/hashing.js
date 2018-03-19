const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

console.log('\n------------------------------------------------\n');

let hashedpassword = '$2a$10$9nZFhA4wpABy8deRHlYQje8N9HBDJdU0djrQXIkvJAT0XqgzfSNvW';

bcrypt.compare(password, hashedpassword).then((res) => {
    console.log(res);
}).catch((e) => {
    console.log(e);
});




//#region encrypting tokens
/*
let message = 'this is the fifth user here';
let hash = SHA256(message).toString();

// // for practical purposes we use jwt================
let data = {
    id: 4,
    breakfast: 'eggs',
};
let token = jwt.sign(data, 'secret-salt');
// console.log(token);
let decoded = jwt.verify(token, 'secret-samt');
console.log(JSON.stringify(decoded, undefined, 2));


// =========================================================================
// // the request is made with this data===============
// let data = {
//     id: 4
// };
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'ourCustomSalt').toString()
// };

// // what a middleman would try to do=================
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data).toString());
// ////// but since the middleman doesnt know the salt, it wont work=======


// let resultHash = SHA256(JSON.stringify(token.data) + 'ourCustomSalt').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed.');
// } else {
//     console.log('Data was changed ! watch out!');
// }
// =========================================================================
*/
//#endregion
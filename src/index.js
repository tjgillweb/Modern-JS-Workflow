import {
    styleBody,
    addTitle,
    contact
} from './dom';
//we can use any name to import the default data e.g. import test from './data'
//import users from './data';

//importing both named export and default export
import users, {
    getPremiumUsers
} from './data';

const premUsers = getPremiumUsers(users);

console.log(users, premUsers);
// console.log('index file');
// addTitle('Hello');
// styleBody();
// console.log(contact);
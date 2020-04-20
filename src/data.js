const users = [
    { name: 'John', premium: true },
    { name: 'Elie', premium: false },
    { name: 'Adam', premium: true },
    { name: 'Eric', premium: true },
    { name: 'Caty', premium: false },
    { name: 'Sarah', premium: true }
];

//default value that we export from this file
//export default users;

// export const getPremiumUsers= (users) => {
//     return users.filter(user => user.premium);
// }

const getPremiumUsers= (users) => {
    return users.filter(user => user.premium);
}

//export both named and default export
export {getPremiumUsers, users as default};

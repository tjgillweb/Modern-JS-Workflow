console.log('dom file');

const body = document.querySelector('body');

export const styleBody = () => {
    body.style.background = "#BADA55";
};

export const addTitle = (text) => {
    const title = document.createElement('h1');
    title.textContent = text;
    body.appendChild(title);
}
export const contact = "tjgillweb@gmail.com";

//another way of exporting in bulk
//export{ styleBody, addTitle, contact };


// styleBody();
// addTitle("Hello from dom.js");
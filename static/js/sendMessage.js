import { typeText, resetFlags } from "./typeText.js";

const userImageURL = "./static/assets/user.webp";
const botImageURL = "./static/assets/bot.webp";

export function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;
    resetFlags();

    const chatLog = document.getElementById('chat-log');
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<img src="${userImageURL}" alt="User"> <div class="message"> ${userInput}</div>`;
    chatLog.appendChild(userMessage);
    chatLog.scrollTop = chatLog.scrollHeight;
    document.getElementById('user-input').value = '';
    document.getElementById('loader-wrapper').style.display = 'flex';
    chatLog.appendChild(document.getElementById('loader-wrapper'));

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loader-wrapper').style.display = 'none';
        if (data.response) {
            typeText(data.response, chatLog, botImageURL);
        } else {
            console.error("Error: 'response' field is missing in the server response", data);
            typeText("Sorry, there was an error with the response from the server.", chatLog, botImageURL);
        }
    })
    .catch(error => {
        document.getElementById('loader-wrapper').style.display = 'none';
        console.error('Error:', error);
        typeText("Sorry, there was an error processing your request.", chatLog, botImageURL);
    });
}
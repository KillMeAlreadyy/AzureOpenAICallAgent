import { typeText } from "./typeText.js";

const botImageURL = "./static/assets/bot.webp";

export function botGreeting() {
    const chatLog = document.getElementById('chat-log');
    const greeting = "Hello I am AVA V2. I am an AI-powered chatbot to help you with your research and configuration of DocuWare!";
    typeText(greeting, chatLog, botImageURL);
}

export function rateConversation(){
    const chatLog = document.getElementById('chat-log');
    const rateMessage = "How would you Rate the Answer I gave you";

}

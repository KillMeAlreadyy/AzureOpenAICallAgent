import { checkScrollPosition, scrollToBottom } from "./js/scroll.js";
import { sendMessage } from "./js/sendMessage.js";
import { botGreeting } from "./js/other.js";

window.onload = function () {
    botGreeting();
    const chatLog = document.getElementById('chat-log');
    chatLog.addEventListener('scroll', checkScrollPosition);

    document.getElementById('user-input').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
    document.getElementById('scroll-to-bottom').addEventListener('click', scrollToBottom);
}

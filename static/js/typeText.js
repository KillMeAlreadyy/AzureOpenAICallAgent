import { appendFeedbackForm } from "./feedback.js";
let botMessageCount = 0;
let feedbackAppended = false;
let feedbackAcknoledged = false;

export function typeText(text, container, imageURL) {
    if (!text) {
        console.error("Error: text is null or undefined");
        return;
    }

    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot';
    botMessage.innerHTML = `<img src="${imageURL}" alt="Bot"> <div class="message"></div>`;
    const messageText = botMessage.querySelector('.message');
    container.appendChild(botMessage);

    // Pre-process the text to include colons inside strong tags
    text = text.replace(/\*\*([^*]+)\*\*:/g, '**$1:**');

    // Convert markdown text to HTML
    const processedText = marked.marked(text);

    // Create a temporary container to hold the processed HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = processedText;

    const nodes = [...tempDiv.childNodes];
    let nodeIndex = 0;
    let charIndex = 0;
    let currentElement = null;

    function type() {
        if (nodeIndex < nodes.length) {
            const currentNode = nodes[nodeIndex];

            if (currentNode.nodeType === Node.TEXT_NODE) {
                if (!currentElement) {
                    currentElement = document.createTextNode('');
                    messageText.appendChild(currentElement);
                }

                if (charIndex < currentNode.textContent.length) {
                    currentElement.textContent += currentNode.textContent[charIndex];
                    charIndex++;
                    setTimeout(type, 20); // Typing speed
                } else {
                    charIndex = 0;
                    currentElement = null;
                    nodeIndex++;
                    setTimeout(type, 20);
                }
            } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
                if (currentNode.tagName === 'LI') {
                    // If it's an <li> element, ensure it is correctly appended
                    currentElement = document.createElement('li');
                    messageText.appendChild(currentElement);

                    const childNodes = [...currentNode.childNodes];
                    nodes.splice(nodeIndex + 1, 0, ...childNodes);
                } else {
                    const elementClone = currentNode.cloneNode(false);
                    if (currentElement) {
                        currentElement.appendChild(elementClone);
                    } else {
                        messageText.appendChild(elementClone);
                    }

                    if (currentNode.childNodes.length > 0) {
                        const childNodes = [...currentNode.childNodes];
                        nodes.splice(nodeIndex + 1, 0, ...childNodes);
                    }

                    currentElement = elementClone;
                }

                nodeIndex++;
                setTimeout(type, 20);
            }

            container.scrollTop = container.scrollHeight; // Auto-scroll to bottom
        } else {
            botMessageCount++;

            if (botMessageCount > 1 && !feedbackAppended && !feedbackAcknoledged){
                appendFeedbackForm(container);
                feedbackAppended = true;
            }
        }
    }

    type();
}
export function setAck(){
    feedbackAcknoledged = true;
}
export function resetFlags(){
    feedbackAcknoledged =false;
    feedbackAppended = false;
}
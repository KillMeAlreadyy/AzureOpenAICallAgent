export function scrollToBottom() {
    const chatLog = document.getElementById('chat-log');
    chatLog.scrollTop = chatLog.scrollHeight;

    const scrollBtn = document.getElementById('scroll-to-bottom');
    scrollBtn.classList.remove('show');
    scrollBtn.classList.add('hide');

    // Reset the position to ensure it stays at the center
    scrollBtn.style.transform = 'translateX(-50%) translateY(0)';
}


export function checkScrollPosition(){
    const chatLog = document.getElementById('chat-log');
    const scrollBtn = document.getElementById('scroll-to-bottom');
    const threshold = 10;
    const isAtBottom = chatLog.scrollHeight -chatLog.scrollTop <= chatLog.clientHeight + threshold;

    if(isAtBottom){
        scrollBtn.classList.add('hide');
    }
    else {
        scrollBtn.classList.remove('hide');
        scrollBtn.classList.add('show');
    }
}


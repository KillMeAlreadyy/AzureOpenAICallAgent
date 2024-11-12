import { typeText, setAck } from "./typeText.js";
const botImageURL = "./static/assets/bot.webp";
let feedbackFormCounter = 0;

export function appendFeedbackForm(container) {
   feedbackFormCounter++;

   const feedbackFormHTML = `
    <div class="feedback-form">
         <form id="feedbackfrom">
            <div class="rating">
               <input type="radio" id="star5-${feedbackFormCounter}" name="rating-${feedbackFormCounter}" value="5">
               <label for="star5-${feedbackFormCounter}">&#9733;</label>
               <input type="radio" id="star4-${feedbackFormCounter}" name="rating-${feedbackFormCounter}" value="4">
               <label for="star4-${feedbackFormCounter}">&#9733;</label>
               <input type="radio" id="star3-${feedbackFormCounter}" name="rating-${feedbackFormCounter}" value="3">
               <label for="star3-${feedbackFormCounter}">&#9733;</label>
               <input type="radio" id="star2-${feedbackFormCounter}" name="rating-${feedbackFormCounter}" value="2">
               <label for="star2-${feedbackFormCounter}">&#9733;</label>
               <input type="radio" id="star1-${feedbackFormCounter}" name="rating-${feedbackFormCounter}" value="1">
               <label for="star1-${feedbackFormCounter}">&#9733;</label>
            </div>
         </form>
      </div>
    `;
   const chatLog = document.getElementById('chat-log');
   const greeting = "How would you rate the Answer?";
   typeText(greeting, chatLog, botImageURL);

   const feedbackForm = document.createElement('div');
   feedbackForm.innerHTML = feedbackFormHTML;
   container.appendChild(feedbackForm);
   container.scrollTop = container.scrollHeight;

   const ratingsInput = feedbackForm.querySelectorAll(`input[name="rating-${feedbackFormCounter}"]`);
   ratingsInput.forEach(input => {
      input.addEventListener('change', ()=> {
         handleFeedback(container, ratingsInput);
      });
   });
}
function handleFeedback(container, ratingsInput){
   
   const thankYouMessage = "Thank you for your feedback!";
   typeText(thankYouMessage, container, botImageURL);
   setAck();

   ratingsInput.forEach(input => {
      input.disabled = true;
   });
}
// For pupils move
document.addEventListener('mousemove', (event) => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        const eyeRect = eye.getBoundingClientRect();
        const pupilRect = pupil.getBoundingClientRect();

        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        const distance = Math.min(eyeRect.width / 2 - pupilRect.width / 2, 10); // adjust 10 to control how far the pupil can move

        const pupilX = distance * Math.cos(angle);
        const pupilY = distance * Math.sin(angle);

        pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
    });
});

// For blink Animation
document.addEventListener("DOMContentLoaded", function() {
    const eyelids = document.querySelectorAll('.eyelid');
    const blinkInterval = 1.5; // Duration of the blink animation (in seconds)
    const delayInterval = 12; // Duration of the delay between blinks (in seconds)

    function triggerBlink() {
        eyelids.forEach(eyelid => {
            eyelid.style.animation = `blink ${blinkInterval}s ease-in-out`;
        });

        setTimeout(() => {
            eyelids.forEach(eyelid => {
                eyelid.style.animation = `none`;
            });
        }, blinkInterval * 1000);

        setTimeout(triggerBlink, (delayInterval) * 1000); // Trigger the next blink after the delay
    }

    triggerBlink();
});

document.addEventListener('DOMContentLoaded', function () {
    const chatLog = document.getElementById('chat-log');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const backEmoji = document.getElementById('back-emoji');
    const chatContainer = document.getElementById('chat-container');
    const personalAssistant = document.getElementById('personal-assistant');
    const ellipsisBtn = document.getElementById('ellipsis-btn');
    const deletePopup = document.getElementById('delete-popup');

    const glowingBox = document.querySelector('.glowing-box');
    const angryEyes = document.querySelector('.angry-eyes');
    const angryMouth = document.querySelector('.angry-mouth');
    const happyMouth = document.querySelector('.happy-mouth');
    const sadMouth = document.querySelector('.sad-mouth');
    const sadEyes = document.querySelector('.sad-eyes');
    const confusedEyes = document.querySelector('.confused-eyes');
    const confusedMouth = document.querySelector('.confused-mouth');
    const eyebrows = document.querySelector('.eyebrows');
    const lovelyEyes = document.querySelector('.lovely-eyes');
    const lovelyMouth = document.querySelector('.lovely-mouth');
    const floatingHearts = document.querySelectorAll('.floating-heart');
    const defaultLeftEye = document.querySelector('.left-eye');
    const defaultRightEye = document.querySelector('.right-eye');
    const defaultPupils = document.querySelectorAll('.pupil');

    // Define sound files
    const userMessageSound = new Audio('userMessageSound.mp3'); // Replace with actual path
    const botMessageSound = new Audio('botMessageSound.mp3'); // Replace with actual path
    const typingSound = new Audio('typingSound.mp3'); // Replace with actual path

    let initialMessageSent = false; // Flag to track if the initial message has been sent

    // **New code starts here**

    // Select the popup message element
    const popupMessage = document.getElementById('popup-message');

    // Hide the chat container initially
    chatContainer.style.transform = 'scale(0)';
    chatContainer.style.opacity = '0';

    // Show the popup when the page loads
    popupMessage.style.display = 'block';

    // Handle popup message click
    popupMessage.addEventListener('click', function () {
        popupMessage.style.display = 'none'; // Hide the popup
        chatContainer.style.transition = 'transform 1s ease, opacity 1s ease';
        chatContainer.style.transform = 'scale(1)';
        chatContainer.style.opacity = '1';

        // Add initial message from bot when chat is opened for the first time
        if (!initialMessageSent) {
            setTimeout(function () {
                addMessageToLog('bot-message', 'Hi, I am your Mountain 🐻 Bear.\nHow can I help you?');
                initialMessageSent = true; // Update the flag
            }, 500);
        }
    });

    // **Existing code continues**

    // Handle "Personal Assistant" click for showing chat
    personalAssistant.addEventListener('click', function () {
        popupMessage.style.display = 'none'; // Hide the popup
        chatContainer.style.transition = 'transform 1s ease, opacity 1s ease';
        chatContainer.style.transform = 'scale(1)';
        chatContainer.style.opacity = '1';

        // Add initial message from bot when chat is opened for the first time
        if (!initialMessageSent) {
            setTimeout(function () {
                addMessageToLog('bot-message', 'Hi, I am your Mountain 🐻 Bear.\nHow can I help you?');
                initialMessageSent = true; // Update the flag
            }, 500);
        }
    });

    // Show the "Delete chat" popup when ellipsis is clicked
    ellipsisBtn.addEventListener('click', function () {
        deletePopup.style.display = 'block'; // Show the popup
        // Hide after 5 seconds if not clicked
        setTimeout(function () {
            deletePopup.style.display = 'none';
        }, 5000);
    });

    // Handle the delete chat click
    deletePopup.addEventListener('click', function () {
        chatLog.innerHTML = ''; // Clear the chat log
        initialMessageSent = false; // Reset the flag to allow message resend
        addMessageToLog('bot-message', 'Hi, I am your Mountain 🐻 Bear.\nHow can I help you?'); // Add bot message again
        deletePopup.style.display = 'none'; // Hide the popup
    });

    // Handle send button click
    sendBtn.addEventListener('click', function () {
        processUserInput();
    });

    // Handle Enter key press in chat input
    chatInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            processUserInput();
        }
    });

    // Function to process user input
    function processUserInput() {
        const userInput = chatInput.value.trim();
        if (userInput) {
            addMessageToLog('user-message', userInput);
            chatInput.value = '';
            adjustHeight();
            generateResponse(userInput);
            userMessageSound.play(); // Play sound when user sends a message
        }
    }

    // Function to add messages to the chat log
    function addMessageToLog(type, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = message;

        // Ensure the message container adjusts its width based on the content
        messageElement.style.width = 'auto'; // Allow automatic width adjustment
        messageElement.style.maxWidth = '70%'; // Maximum width for the message container

        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;

        if (type === 'bot-message') {
            botMessageSound.play(); // Play sound when bot sends a message
        }
    }

    // Function to convert numbers to words (1 to 100)
    function numberToWords(number) {
        const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if (number < 10) return ones[number];
        if (number < 20) return teens[number - 10];
        if (number < 100) {
            const ten = Math.floor(number / 10);
            const one = number % 10;
            return one === 0 ? tens[ten - 2] : `${tens[ten - 2]} ${ones[one]}`;
        }
        if (number === 100) return 'One Hundred';
        return 'Number out of range';
    }
     // Function to get the current day of the week
     function getDayOfWeek() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const now = new Date();
        return days[now.getDay()];
    }

    // Function to generate bot responses
    function generateResponse(userInput) {
        let response;
        const lowerInput = userInput.toLowerCase();

        if (lowerInput.includes('hello')) {
            response = 'Hello! How can I help you today?';
            setFace('happy');
        } else if (lowerInput.includes('bye')) {
            response = 'Goodbye! Have a great day!';
            setFace('happy');
        } else if (lowerInput.includes('thank') || lowerInput.includes('admire')) {
            response = 'Thank you for your kind words!';
            setFace('lovely');
        } else if (lowerInput.includes('sad') || lowerInput.includes('unhappy') || lowerInput.includes('upset')) {
            response = 'I\'m sorry to hear that you\'re feeling down. I\'m here for you.';
            setFace('sad');
        } else if (lowerInput.includes('how') || lowerInput.includes('what') || lowerInput.includes('why')) {
            // If the message is a question
            response = 'I\'ll do my best to answer that. Let me think...';
            setFace('happy'); // Happy because it's providing an answer
        } else if (lowerInput.includes('?')) {
            // If the message contains a question mark but the bot doesn't understand the question
            response = 'Sorry, I didn\'t understand that.';
            setFace('confused');
        } else if (lowerInput.includes('wrong') || lowerInput.includes('bad')) {
            // If the message contains negative feedback
            response = 'Oh no! I didn\'t mean to upset you. I\'ll try better.';
            setFace('angry');
        } else if (lowerInput.includes('time') || lowerInput.includes('current time')) {
            // Respond with the current time
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            response = `The current time is ${timeString}.`;
            setFace('happy');
        } else if (lowerInput.includes('date') || lowerInput.includes('current date')) {
            // Respond with the current date
            const now = new Date();
            const dateString = now.toLocaleDateString();
            response = `Today's date is ${dateString}.`;
            setFace('happy');
        } else if (lowerInput.includes('which day')) {
            // Respond with the current day of the week
            response = `Today is ${getDayOfWeek()}.`;
            setFace('happy');
        } else {
            // Handle mathematical expressions or numbers
            try {
                const sanitizedInput = userInput.replace(/\s+/g, '');

                if (/^\d+$/.test(sanitizedInput)) {
                    const number = parseInt(sanitizedInput, 10);
                    if (number >= 1 && number <= 100) {
                        response = numberToWords(number);
                    } else {
                        response = `The result is ${sanitizedInput}`; // Directly respond with the number
                    }
                    setFace('happy');
                } else if (/^[\d+\-*/().^]+$/.test(sanitizedInput)) {
                    // Evaluate the mathematical expression
                    const result = eval(sanitizedInput);
                    response = `The result is ${result}`;
                    setFace('happy');
                } else {
                    // For unrecognized input
                    response = 'Sorry, I didn\'t understand that.';
                    setFace('confused');
                }
            } catch (error) {
                // Handle any errors in evaluation
                response = 'Sorry, there was an error in evaluating the expression.';
                setFace('confused');
            }
        }

        // Add a delay before showing the response to simulate a more natural interaction
        setTimeout(function () {
            addMessageToLog('bot-message', response);
            typingSound.play(); // Play typing sound while bot is generating response
        }, 1500); // Adjust the delay as needed (e.g., 1500ms or 1.5 seconds)
    }

    // Function to adjust textarea height based on content
    function adjustHeight() {
        chatInput.style.height = 'auto';
        chatInput.style.height = chatInput.scrollHeight + 'px';
    }

    chatInput.addEventListener('input', function() {
        typingSound.play(); // Play typing sound when user types
        adjustHeight();
    });
    adjustHeight();

    // Handle back emoji click
    backEmoji.addEventListener('click', function () {
        addMessageToLog('bot-message', 'Bye! See you soon');

        setTimeout(function () {
            chatContainer.style.transition = 'transform 1s ease, opacity 1s ease';
            chatContainer.style.transform = 'scale(0)';
            chatContainer.style.opacity = '0';

            // **Show the popup again when the chatbox is closed**
            popupMessage.style.display = 'block';
        }, 2000);
    });

    function setFace(state) {
        // Helper function to reset all facial features
        const resetFace = () => {
            console.log("Resetting face...");
            happyMouth.style.display = 'none';
            sadMouth.style.display = 'none';
            angryMouth.style.display = 'none';
            sadEyes.style.display = 'none';
            angryEyes.style.display = 'none';
            confusedEyes.style.display = 'none';
            confusedMouth.style.display = 'none';
            lovelyEyes.style.display = 'none';
            lovelyMouth.style.display = 'none';
            floatingHearts.forEach(heart => heart.style.display = 'none'); // Hide hearts
            eyebrows.classList.remove('angry-eyebrows', 'sad-eyebrows', 'confused-eyebrows', 'happy-eyebrows', 'lovely-eyebrows');
            defaultLeftEye.style.display = 'block';
            defaultRightEye.style.display = 'block';
            defaultPupils.forEach(pupil => {
                pupil.style.display = 'block';
                pupil.innerHTML = ''; // Ensure pupils don't show "?" in any state except confused
            });
        };

        resetFace();

        switch (state) {
            case 'happy':
                console.log("Setting face to happy...");
                happyMouth.style.display = 'block';
                glowingBox.classList.add('happy');
                eyebrows.classList.add('happy-eyebrows');
                setTimeout(() => {
                    glowingBox.classList.remove('happy');
                    happyMouth.style.display = 'none';
                    eyebrows.classList.remove('happy-eyebrows');
                }, 2000);
                break;

            case 'sad':
                console.log("Setting face to sad...");
                sadMouth.style.display = 'block';
                sadEyes.style.display = 'flex';
                glowingBox.classList.add('sad');
                eyebrows.classList.add('sad-eyebrows');
                defaultLeftEye.style.display = 'none';
                defaultRightEye.style.display = 'none';
                defaultPupils.forEach(pupil => pupil.style.display = 'none');
                setTimeout(() => {
                    glowingBox.classList.remove('sad');
                    sadMouth.style.display = 'none';
                    sadEyes.style.display = 'none';
                    if (!glowingBox.classList.contains('confused')) {
                        defaultLeftEye.style.display = 'block';
                        defaultRightEye.style.display = 'block';
                        defaultPupils.forEach(pupil => pupil.style.display = 'block');
                    }
                    eyebrows.classList.remove('sad-eyebrows');
                }, 2000);
                break;

            case 'angry':
                console.log("Setting face to angry...");
                angryEyes.style.display = 'block';
                angryMouth.style.display = 'block';
                glowingBox.classList.add('angry');
                eyebrows.classList.add('angry-eyebrows');
                defaultLeftEye.style.display = 'none';
                defaultRightEye.style.display = 'none';
                defaultPupils.forEach(pupil => pupil.style.display = 'none');
                setTimeout(() => {
                    glowingBox.classList.remove('angry');
                    angryEyes.style.display = 'none';
                    angryMouth.style.display = 'none';
                    defaultLeftEye.style.display = 'block';
                    defaultRightEye.style.display = 'block';
                    defaultPupils.forEach(pupil => pupil.style.display = 'block');
                    eyebrows.classList.remove('angry-eyebrows');
                }, 2000);
                break;

            case 'confused':
                console.log("Setting face to confused...");
                confusedEyes.style.display = 'flex';
                confusedMouth.style.display = 'block';
                glowingBox.classList.add('confused');
                eyebrows.classList.add('confused-eyebrows');
                defaultLeftEye.style.display = 'none';
                defaultRightEye.style.display = 'none';
                defaultPupils.forEach(pupil => {
                    pupil.style.display = 'block';
                    pupil.innerHTML = '?'; // Show "?" for confused mode
                });
                setTimeout(() => {
                    glowingBox.classList.remove('confused');
                    confusedEyes.style.display = 'none';
                    confusedMouth.style.display = 'none';
                    defaultLeftEye.style.display = 'block';
                    defaultRightEye.style.display = 'block';
                    defaultPupils.forEach(pupil => {
                        pupil.style.display = 'block';
                        pupil.innerHTML = ''; // Remove "?" after confused state ends
                    });
                    eyebrows.classList.remove('confused-eyebrows');
                }, 2000);
                break;

            case 'lovely':
                console.log("Setting face to lovely...");
                lovelyMouth.style.display = 'block';
                lovelyEyes.style.display = 'block';
                floatingHearts.forEach(heart => heart.style.display = 'block');
                glowingBox.classList.add('lovely');
                eyebrows.classList.add('lovely-eyebrows');
                defaultLeftEye.style.display = 'none';
                defaultRightEye.style.display = 'none';
                defaultPupils.forEach(pupil => pupil.style.display = 'none');
                setTimeout(() => {
                    glowingBox.classList.remove('lovely');
                    lovelyMouth.style.display = 'none';
                    lovelyEyes.style.display = 'none';
                    floatingHearts.forEach(heart => heart.style.display = 'none');
                    defaultLeftEye.style.display = 'block';
                    defaultRightEye.style.display = 'block';
                    defaultPupils.forEach(pupil => pupil.style.display = 'block');
                    eyebrows.classList.remove('lovely-eyebrows');
                }, 5000);
                break;

            default:
                console.log("Unknown state:", state);
                break;
        }
    }
});

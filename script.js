document.addEventListener('DOMContentLoaded', function () {
    const riddleContainer = document.querySelector('.riddle-container');
    const submitButton = document.getElementById('submit-answer');
    const errorMessage = document.getElementById('error-message');
    const progressBar = document.querySelector('.progress-bar');

    const riddles = [
        { text: "This sacred gift begins your journey.", answer: "ISKON" },
        { text: "Riddle 2 text goes here.", answer: "ANSWER2" },
        { text: "Riddle 3 text goes here.", answer: "ANSWER3" }
    ];

    let currentRiddleIndex = 0;

    function createAnswerBoxes(answer) {
        const answerBox = document.querySelector('.answer-box');
        answerBox.innerHTML = '';
        for (let i = 0; i < answer.length; i++) {
            const input = document.createElement('input');
            input.setAttribute('maxlength', '1');
            input.addEventListener('input', handleInput);
            input.addEventListener('keydown', handleBackspace);
            answerBox.appendChild(input);
        }
    }

    createAnswerBoxes(riddles[currentRiddleIndex].answer);

    function handleInput(event) {
        const input = event.target;
        if (input.value) {
            const nextInput = input.nextElementSibling;
            if (nextInput) {
                nextInput.focus();
            } else {
                checkAnswer();
            }
        }
    }

    function handleBackspace(event) {
        const input = event.target;
        if (event.key === 'Backspace' && !input.value) {
            const prevInput = input.previousElementSibling;
            if (prevInput) {
                prevInput.value = '';
                prevInput.focus();
            }
        }
    }

    submitButton.addEventListener('click', checkAnswer);

    function checkAnswer() {
        const userAnswer = Array.from(document.querySelectorAll('.answer-box input')).map(input => input.value).join('').toUpperCase();

        if (userAnswer === riddles[currentRiddleIndex].answer) {
            riddleSolved();
        } else {
            errorMessage.style.display = 'block';
        }
    }

    function riddleSolved() {
        errorMessage.style.display = 'none';
        if (currentRiddleIndex < riddles.length - 1) {
            currentRiddleIndex++;
            createAnswerBoxes(riddles[currentRiddleIndex].answer);
            loadNextRiddle();
            updateProgressBar(currentRiddleIndex, riddles.length);
        } else {
            congratulations();
            updateProgressBar(currentRiddleIndex + 1, riddles.length);
        }
    }

    function loadNextRiddle() {
        riddleContainer.querySelector('h1').textContent = `Riddle ${currentRiddleIndex + 1}:`;
        riddleContainer.querySelector('p').textContent = riddles[currentRiddleIndex].text;
    }

    function congratulations() {
        riddleContainer.innerHTML = `<h1>Congratulations!</h1><p>You solved all the riddles!</p>`;
    }

    function updateProgressBar(solved, total) {
        const progressPercentage = (solved / total) * 100;
        progressBar.style.width = progressPercentage + '%';
    }
});

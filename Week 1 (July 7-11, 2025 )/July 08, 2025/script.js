let questions = [];
let current = 0;
let userAns = [];
let username = "";

const namePopup = document.getElementById("name-popup");
const usernameInput = document.getElementById("username-input");
const startBtn = document.getElementById("start-btn");

namePopup.style.display = "flex";

startBtn.addEventListener("click", () => {
    const inputName = usernameInput.value.trim();
    if (inputName !== "") {
        username = inputName;
        document.getElementById("user-name").textContent = username;
        namePopup.style.display = "none";
        fetchQuestions();
    }
});

function fetchQuestions() {
    fetch("questions.json")
        .then(res => res.json())
        .then(data => {
            questions = data.sort(() => Math.random() - 0.5);
            showQues();
        });
}

const showQues = () => {
    const box = document.querySelector('.question-box');
    const progressBar = document.querySelector('.progress-bar-fill');
    const ques = questions[current];
    const alreadyAnswered = userAns[current] !== undefined && userAns[current] !== '';

    let html = `<p class="question-text">${ques.question}</p>`;

    if (ques.type === "mcq") {
        ques.options.forEach(opt => {
            const selected = userAns[current] === opt ? 'selected' : '';
            const disabled = alreadyAnswered ? 'disabled' : '';
            html += `<label class="option-bar ${selected}"><input type="radio" class="option-input" name="option" value="${opt}" ${disabled}>${opt}</label>`;
        });
    } else if (ques.type === "boolean") {
        ["True", "False"].forEach(opt => {
            const selected = userAns[current] === opt ? 'selected' : '';
            const disabled = alreadyAnswered ? 'disabled' : '';
            html += `<label class="option-bar ${selected}"><input type="radio" class="option-input" name="option" value="${opt}" ${disabled}>${opt}</label>`;
        });
    } else if (ques.type === "short") {
        const disabled = alreadyAnswered ? 'readonly' : '';
        html += `<input type="text" class="input-text" value="${userAns[current] || ''}" ${disabled}>`;
    } else if (ques.type === "paragraph") {
        html += `<textarea class="textarea-answer" rows="4">${userAns[current] || ''}</textarea>`;
    } else if (ques.type === "image-mcq") {
        html += `<div class="image-options">`;
        ques.imageOptions.forEach(opt => {
            const selected = userAns[current] === opt.value ? 'selected' : '';
            const disabled = alreadyAnswered ? 'disabled' : '';
            html += `<label class="image-option ${selected}"><input type="radio" class="option-input image-radio" name="option" value="${opt.value}" ${disabled}><img src="${opt.src}" class="option-img" alt="${opt.value}"></label>`;
        });
        html += `</div>`;
    }

    box.innerHTML = html;
    progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
    document.getElementById("progress-text").textContent = `Question ${current + 1} of ${questions.length}`;

    if (!alreadyAnswered) {
        document.querySelectorAll('.option-bar').forEach(bar => {
            bar.addEventListener('click', () => {
                document.querySelectorAll('.option-bar').forEach(b => b.classList.remove('selected'));
                bar.classList.add('selected');
                bar.querySelector('input').checked = true;
            });
        });

        document.querySelectorAll('.image-option').forEach(opt => {
            opt.addEventListener('click', () => {
                document.querySelectorAll('.image-option').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                opt.querySelector('input').checked = true;
            });
        });
    }

    if (alreadyAnswered && ques.answer) {
        highlightFeedback(true);
    }
};

const saveAns = () => {
    const ques = questions[current];
    let ans = "";

    if (ques.type === "mcq" || ques.type === "boolean" || ques.type === "image-mcq") {
        const selected = document.querySelector('.option-input:checked');
        if (selected) ans = selected.value;
    } else {
        const input = document.querySelector('.input-text') || document.querySelector('.textarea-answer');
        if (input) ans = input.value.trim();
    }

    userAns[current] = ans;
    return ans;
};

const highlightFeedback = (isAlreadyAnswered = false) => {
    const ques = questions[current];
    const userAnswer = isAlreadyAnswered ? userAns[current] : saveAns();

    if (!ques.answer) return false;

    if (ques.type === "mcq" || ques.type === "boolean") {
        const options = document.querySelectorAll('.option-bar');
        options.forEach(opt => {
            const val = opt.querySelector('input').value;
            if (val === ques.answer) opt.classList.add("correct");
            if (val === userAnswer && val !== ques.answer) opt.classList.add("wrong");
        });
    } else if (ques.type === "image-mcq") {
        const options = document.querySelectorAll('.image-option');
        options.forEach(opt => {
            const val = opt.querySelector('input').value;
            if (val === ques.answer) opt.classList.add("correct");
            if (val === userAnswer && val !== ques.answer) opt.classList.add("wrong");
        });
    } else if (ques.type === "short") {
        const input = document.querySelector('.input-text');
        if (input) {
            const isCorrect = userAnswer === ques.answer;
            input.style.borderColor = isCorrect ? "green" : "red";
            const msg = document.createElement("div");
            msg.textContent = isCorrect ? "Correct" : `Wrong (Correct: ${ques.answer})`;
            msg.style.color = isCorrect ? "green" : "red";
            input.after(msg);
        }
    }

    return true;
};

const showResult = () => {
    const result = document.querySelector('.result-box');
    const box = document.querySelector('.question-box');
    const btns = document.querySelector('.buttons');
    const prog = document.querySelector('.progress-bar');

    box.innerHTML = "";
    box.classList.add("hidden");
    btns.classList.add("hidden");
    prog.classList.add("hidden");

    let score = 0;
    let html = "<h2>Quiz Results</h2>";
    const totalValidQuestions = questions.filter(q => q.answer !== null && q.answer !== undefined).length;

    questions.forEach((ques, i) => {
        const rawAns = userAns[i];
        const uAns = rawAns !== undefined && rawAns !== '' ? rawAns : 'No Answer';
        const cAns = ques.answer;
        let correct = false;

        if (cAns !== undefined && cAns !== null && uAns !== 'No Answer') {
            correct = uAns === cAns;
            if (correct) score++;
        }

        html += `<div class="result-question"><p class="result-ques"><b>Q${i + 1}:</b> ${ques.question}<br></p>`;

        if (ques.type === "mcq" || ques.type === "boolean") {
            const options = ques.type === "boolean" ? ["True", "False"] : ques.options;
            options.forEach(opt => {
                let classList = "option-bar";
                if (uAns !== 'No Answer') {
                    if (uAns === opt && opt !== cAns) classList += " wrong";
                    if (opt === cAns) classList += " correct";
                }
                html += `<div class="${classList}">${opt}</div>`;
            });
            if (uAns === 'No Answer') html += `<div class="option-bar">Your Answer: No Answer</div>`;
        } else if (ques.type === "image-mcq") {
            html += `<div class="image-options">`;
            ques.imageOptions.forEach(opt => {
                let classList = "image-option";
                if (uAns !== 'No Answer') {
                    if (uAns === opt.value && opt.value !== cAns) classList += " wrong";
                    if (opt.value === cAns) classList += " correct";
                }
                html += `<div class="${classList}"><img src="${opt.src}" class="option-img" alt="${opt.value}"></div>`;
            });
            html += `</div>`;
            if (uAns === 'No Answer') html += `<div class="option-bar">Your Answer: No Answer</div>`;
        } else if (ques.type === "short") {
            if (uAns === 'No Answer') {
                html += `<div class="option-bar">Your Answer: No Answer</div>`;
            } else {
                html += `<div class="option-bar ${correct ? 'correct' : 'wrong'}">Your Answer: ${uAns}</div>`;
                if (!correct && cAns !== undefined) html += `<div class="option-bar correct">Correct Answer: ${cAns}</div>`;
            }
        } else if (ques.type === "paragraph") {
            html += `<div class="option-bar">Your Answer: ${uAns}</div>`;
        }

        html += `</div>`;
    });

    html = `<h3>Your Score: ${score}/${totalValidQuestions}</h3>` + html;
    html += `<button class="restart-btn">Restart Quiz</button>`;

    result.innerHTML = html;
    result.classList.remove("hidden");

    document.querySelector('.restart-btn').addEventListener('click', restartQuiz);
};



const restartQuiz = () => {
    current = 0;
    userAns = [];
    document.querySelector('.result-box').classList.add("hidden");
    document.querySelector('.question-box').classList.remove("hidden");
    document.querySelector('.buttons').classList.remove("hidden");
    document.querySelector('.progress-bar').classList.remove("hidden");
    showQues();
};

document.querySelector('.btn-next').onclick = () => {
    const ques = questions[current];
    let hasAnswered = false;

    if (ques.type === "mcq" || ques.type === "boolean" || ques.type === "image-mcq") {
        const selected = document.querySelector('.option-input:checked');
        if (selected) hasAnswered = true;
    } else {
        const input = document.querySelector('.input-text') || document.querySelector('.textarea-answer');
        if (input && input.value.trim() !== "") hasAnswered = true;
    }

    if (hasAnswered) highlightFeedback();
    else saveAns();

    setTimeout(() => {
        current++;
        if (current >= questions.length) {
            showResult();
        } else {
            showQues();
        }
    }, hasAnswered ? 1000 : 0);
};


document.querySelector('.btn-prev').onclick = () => {
    if (current > 0) current--;
    showQues();
};

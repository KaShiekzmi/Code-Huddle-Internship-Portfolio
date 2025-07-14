var input = document.getElementById("task-input");
var btn = document.getElementById("add-task");
var list = document.getElementById("task-list");
var totalText = document.getElementById("total");
var doneText = document.getElementById("done");

var tasks = [];
var editIndex = -1;

function showTasks() {
    list.innerHTML = "";
    var done = 0;

    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");

        var check = document.createElement("input");
        check.type = "checkbox";
        check.checked = tasks[i].done;
        if (check.checked) done++;

        check.onchange = (function (i) {
            return function () {
                tasks[i].done = this.checked;
                save();
            };
        })(i);

        var span = document.createElement("span");
        span.innerText = tasks[i].text;
        if (tasks[i].done) {
            span.className = "done";
        }

        span.ondblclick = (function (i) {
            return function () {
                input.value = tasks[i].text;
                editIndex = i;
                btn.innerText = "Update";
            };
        })(i);

        var delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.onclick = (function (i) {
            return function () {
                tasks.splice(i, 1);
                save();
            };
        })(i);

        li.appendChild(check);
        li.appendChild(span);
        li.appendChild(delBtn);

        list.appendChild(li);
    }

    totalText.innerText = tasks.length;
    doneText.innerText = done;
}

function save() {
    localTasks = JSON.stringify(tasks)
    localStorage.setItem("tasks", localTasks);
    showTasks();
}

btn.onclick = function () {
    var val = input.value.trim();
    if (val === "") return;

    if (editIndex === -1) {
        tasks.push({ text: val, done: false });
    } else {
        tasks[editIndex].text = val;
        editIndex = -1;
        btn.innerText = "Add";
    }

    input.value = "";
    save();
};

input.onkeydown = function (e) {
    if (e.key === "Enter") {
        btn.click();
    }
};

var saved = localStorage.getItem("tasks");
if (saved) {
    tasks = JSON.parse(saved);
}
showTasks();

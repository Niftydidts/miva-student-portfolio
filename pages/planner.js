// ===========================
// Date & Greeting
// ===========================

const today = new Date();

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

document.getElementById("today").textContent =
today.toLocaleDateString("en-GB", options);

const hour = today.getHours();

let greeting = "";

if(hour < 12){

    greeting = "☀️ Good Morning";

}
else if(hour < 18){

    greeting = "🌤️ Good Afternoon";

}
else{

    greeting = "🌙 Good Evening";

}

document.getElementById("greeting").textContent = greeting;

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if(task.completed){
            completed++;
        }

        li.innerHTML = `

            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="buttons">

                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>

        `;

        li.querySelector(".complete-btn").addEventListener("click",()=>{

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            renderTasks();

        });

        li.querySelector(".delete-btn").addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(li);

    });

    document.getElementById("progress").innerHTML =
        `${completed} / ${tasks.length} Tasks Completed`;

    if(tasks.length > 0 && completed === tasks.length){

        document.getElementById("message").innerHTML =
        "🎉 Excellent! You've completed all your study tasks!";

    }else{

        document.getElementById("message").innerHTML = "";

    }

}

addTask.addEventListener("click",()=>{

    const value = taskInput.value.trim();

    if(value==="") return;

    tasks.push({

        text:value,

        completed:false

    });

    saveTasks();

    renderTasks();

    taskInput.value="";

});

renderTasks();

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn">Delete</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(li);

    });

}

addTask.addEventListener("click",()=>{

    const value = taskInput.value.trim();

    if(value==="") return;

    tasks.push(value);

    saveTasks();

    renderTasks();

    taskInput.value="";

});

renderTasks();

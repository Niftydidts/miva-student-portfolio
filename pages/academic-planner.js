/* ==========================================
   ACADEMIC PLANNER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       ELEMENTS
    =============================== */

    const plannerForm = document.getElementById("plannerForm");
    const taskContainer = document.getElementById("taskContainer");
    const searchInput = document.getElementById("searchTask");
    const filterSelect = document.getElementById("filterTasks");

    const emptyState = document.getElementById("emptyState");

    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");
    const pendingTasks = document.getElementById("pendingTasks");

    const statTotal = document.getElementById("statTotal");
    const statCompleted = document.getElementById("statCompleted");
    const statPending = document.getElementById("statPending");
    const statHigh = document.getElementById("statHigh");

    /* ===============================
       TASK ARRAY
    =============================== */

    let tasks = JSON.parse(localStorage.getItem("plannerTasks")) || [];

    /* ===============================
       SAVE TASKS
    =============================== */

    function saveTasks(){

        localStorage.setItem(
            "plannerTasks",
            JSON.stringify(tasks)
        );

    }

    /* ===============================
       ADD TASK
    =============================== */

    plannerForm.addEventListener("submit", function(e){

        e.preventDefault();

        const task = {

            id: Date.now(),

            title: document.getElementById("taskTitle").value,

            subject: document.getElementById("subject").value,

            priority: document.getElementById("priority").value,

            dueDate: document.getElementById("dueDate").value,

            description: document.getElementById("description").value,

            completed:false

        };

        tasks.push(task);

        saveTasks();

        plannerForm.reset();

        renderTasks();

    });

    /* ===============================
       RENDER TASKS
    =============================== */

    function renderTasks(){

        taskContainer.innerHTML="";

        if(tasks.length===0){

            emptyState.style.display="block";

        }

        else{

            emptyState.style.display="none";

        }

        tasks.forEach(task=>{

            const card=document.createElement("div");

            card.className="task-card";

            if(task.completed){

                card.classList.add("completed");

            }

            card.innerHTML=`

            <div class="task-header">

                <div>

                    <h3 class="task-title">${task.title}</h3>

                    <p class="task-subject">

                        ${task.subject}

                    </p>

                </div>

                <span class="priority ${task.priority.toLowerCase()}">

                    ${task.priority}

                </span>

            </div>

            <p class="task-description">

                ${task.description}

            </p>

            <div class="task-footer">

                <span class="due-date">

                    📅 ${task.dueDate || "No Due Date"}

                </span>

                <div class="task-actions">

                    <button
                    class="complete-btn"
                    data-id="${task.id}">

                    ✓

                    </button>

                    <button
                    class="edit-btn"
                    data-id="${task.id}">

                    Edit

                    </button>

                    <button
                    class="delete-btn"
                    data-id="${task.id}">

                    Delete

                    </button>

                </div>

            </div>

            `;

            taskContainer.appendChild(card);

        });

        updateStatistics();

    }

        /* ===============================
       COMPLETE TASK
    =============================== */

    taskContainer.addEventListener("click", function(e){

        if(e.target.classList.contains("complete-btn")){

            const id = Number(e.target.dataset.id);

            tasks = tasks.map(task => {

                if(task.id === id){

                    task.completed = !task.completed;

                }

                return task;

            });

            saveTasks();

            renderTasks();

        }

    });

    /* ===============================
       DELETE TASK
    =============================== */

    taskContainer.addEventListener("click", function(e){

        if(e.target.classList.contains("delete-btn")){

            const id = Number(e.target.dataset.id);

            if(confirm("Are you sure you want to delete this task?")){

                tasks = tasks.filter(task => task.id !== id);

                saveTasks();

                renderTasks();

            }

        }

    });

    /* ===============================
       EDIT TASK
    =============================== */

    taskContainer.addEventListener("click", function(e){

        if(e.target.classList.contains("edit-btn")){

            const id = Number(e.target.dataset.id);

            const task = tasks.find(task => task.id === id);

            if(!task) return;

            const newTitle = prompt("Edit Task Title", task.title);

            if(newTitle === null) return;

            const newDescription = prompt(
                "Edit Task Description",
                task.description
            );

            task.title = newTitle.trim() || task.title;
            task.description = newDescription ?? task.description;

            saveTasks();

            renderTasks();

        }

    });

    /* ===============================
       UPDATE STATISTICS
    =============================== */

    function updateStatistics(){

        const completed = tasks.filter(task => task.completed).length;

        const pending = tasks.length - completed;

        const highPriority = tasks.filter(task =>
            task.priority === "High"
        ).length;

        totalTasks.textContent = tasks.length;
        completedTasks.textContent = completed;
        pendingTasks.textContent = pending;

        statTotal.textContent = tasks.length;
        statCompleted.textContent = completed;
        statPending.textContent = pending;
        statHigh.textContent = highPriority;

        updateProgress();

    }

    /* ===============================
       UPDATE PROGRESS BAR
    =============================== */

    function updateProgress(){

        let percent = 0;

        if(tasks.length > 0){

            percent = Math.round(

                (tasks.filter(task => task.completed).length /
                tasks.length) * 100

            );

        }

        progressFill.style.width = percent + "%";

        progressText.textContent = percent + "%";

    }

        /* ===============================
       SEARCH TASKS
    =============================== */

    searchInput.addEventListener("input", function(){

        const searchValue = this.value.toLowerCase();

        document.querySelectorAll(".task-card").forEach(card => {

            const title = card.querySelector(".task-title")
                .textContent
                .toLowerCase();

            const description = card.querySelector(".task-description")
                .textContent
                .toLowerCase();

            if(title.includes(searchValue) ||
               description.includes(searchValue)){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

    /* ===============================
       FILTER TASKS
    =============================== */

    filterSelect.addEventListener("change", function(){

        const filter = this.value;

        document.querySelectorAll(".task-card").forEach(card => {

            const priority = card.querySelector(".priority")
                .textContent
                .toLowerCase();

            const completed = card.classList.contains("completed");

            switch(filter){

                case "completed":

                    card.style.display =
                        completed ? "block" : "none";

                    break;

                case "pending":

                    card.style.display =
                        completed ? "none" : "block";

                    break;

                case "high":

                    card.style.display =
                        priority === "high" ? "block" : "none";

                    break;

                case "medium":

                    card.style.display =
                        priority === "medium" ? "block" : "none";

                    break;

                case "low":

                    card.style.display =
                        priority === "low" ? "block" : "none";

                    break;

                default:

                    card.style.display = "block";

            }

        });

    });

    /* ===============================
       MOBILE MENU
    =============================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if(menuBtn){

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("show");

        });

    }

    /* ===============================
       SCROLL REVEAL
    =============================== */

    const revealItems = document.querySelectorAll(
        ".task-form, .summary-card, .task-card, .tip-card, .stat-card"
    );

    function revealOnScroll(){

        const trigger = window.innerHeight - 100;

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if(top < trigger){

                item.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

    /* ===============================
       INITIALIZE APPLICATION
    =============================== */

    renderTasks();

});
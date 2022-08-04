let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let clear = document.querySelector(".clear");
let tasksDiv = document.querySelector(".tasks");
let arrayOfTasks = [];

// if (localStorage.getItem("task")){
//     arrayOfTasks = JSON.parse(localStorage.getItem("task"));
//     addElementsToPage(arrayOfTasks);
// }

getElementFromLocalStorage();
// click on submit button (the main part):
submit.onclick = function(){
    if (input.value != ""){
        addTaskToArray(input.value);
        input.value = "";
    }
}

// Delete or done tasks
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")){
        deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    
    if (e.target.classList.contains("task")){
        toggleStatus(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
})

// addTasksToArray fuction :
function addTaskToArray(inputText){
    const task = {
        id : Date.now(),
        title : inputText,
        completed : false
    }

    arrayOfTasks.push(task);
    // add the task to the page
    addElementsToPage(arrayOfTasks);
    // add the tasks to the local storage
    addElementsToLocalStorage(arrayOfTasks);
}

// add elements to the page
function addElementsToPage(arrayOfTasks){
    tasksDiv.innerHTML = "";
    // create the elements add add it to the tasks
    arrayOfTasks.forEach((task) => {
        // create the div
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", task.id);
        if (task.completed){
            div.className = "task done";
        }
        div.appendChild(document.createTextNode(task.title));
        // create the spna
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // add the span to the div
        div.appendChild(span)
        // add the div to tasksDiv
        tasksDiv.appendChild(div);
    });
}

// add elements to the local storage fuction:
function addElementsToLocalStorage(arrayOfTasks){
    localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

function getElementFromLocalStorage(){
    let data = localStorage.getItem("task");
    if (data){
        arrayOfTasks = JSON.parse(data);
        addElementsToPage(arrayOfTasks);
    }
}

// Delete tasks using id
function deleteTaskWithId(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addElementsToLocalStorage(arrayOfTasks);
}

// toggle status fuction:
function toggleStatus (taskid){
    for (let i =0; i<arrayOfTasks.length; i++){
        if (arrayOfTasks[i].id == taskid){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addElementsToLocalStorage(arrayOfTasks);
}

// clear all
clear.onclick = function(){
    window.localStorage.clear();
    tasksDiv.innerHTML = "";
}
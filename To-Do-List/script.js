
document.addEventListener("DOMContentLoaded",()=>{
    const todoInput=document.getElementById("todo-input");
const addTaskButton=document.getElementById("add-task-btn");
const todoList=document.getElementById("todo-list");


let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => renderTask(task));


addTaskButton.addEventListener('click',()=>{
    const taskText=todoInput.value.trim()
    if(taskText=="") return;

    const newTask={
        id:Date.now(),
        text: taskText,
        completed:false
    }
    tasks.push(newTask);
    renderTask(newTask);   // Show on screen
        saveTask();            
    todoInput.value="";
    console.log(tasks);
});

function renderTask(task){
    // console.log(task.text);
    const li=document.createElement("li");
    li.setAttribute("data-id",task.id);
    if(task.completed) li.classList.add("completed");
    li.innerHTML=`
    <span>${task.text}</span>
    <button>delete</button>

    `;
    li.addEventListener('click',(e)=>{
        if(e.target.tagName ==='BUTTON') return;
        task.completed=!task.completed
        li.classList.toggle('completed')
        saveTask()
    });

    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation();
        task=tasks.filter(t=>t.id===task.id);
        li.remove();
        saveTask();
    })
    todoList.appendChild(li);
}

function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
})


/*  JSON.stringify() → Converts data into a string.
 JSON.parse() → Converts string back to data.

Part	                    Purpose
DOMContentLoaded ->	        Wait for page to load
localStorage	   ->         Save tasks permanently
renderTask(task)	 ->       Show task on screen
addTaskButton.onclick	->    Add a new task
saveTask()	             ->   Save tasks to localStorage



 */

// storing the task or saving the task
// empty array to store all the tasks
let TaskList = [];

// to retrieve the data when the browser is loaded
document.addEventListener('DOMContentLoaded',()=>{
    datastore=localStorage.getItem('taskname')
    if(datastore != null){
        TaskList=JSON.parse(datastore)
        Rendering()
    }
    
})
// function to save task

function SaveTask() {
  // debugger
  let TaskName = document.getElementById("input_val").value;
  let TaskData = {
    taskId: TaskList.length + 1,
    taskName: TaskName,
  };
  TaskList.push(TaskData);
  localStorage.setItem('taskname',JSON.stringify(TaskList))
  Rendering()
  // to clear the data in input field
  document.getElementById("input_val").value = "";
  
}

// rendering the list items dynamically
function Rendering() {
    // debugger
    document.querySelector(".task_list").innerHTML=''
  for (i = 0; i < TaskList.length; i++) {
    const Dynamiclis = document.createElement("li");
    Dynamiclis.classList.add("task");
    const para = document.createElement("p");
    para.innerHTML = TaskList[i].taskName;
    // appending the paragraph to list
    Dynamiclis.appendChild(para);
    // appending list to ul
    document.querySelector(".task_list").appendChild(Dynamiclis);

    // creating the div element to add edit, delete and list items
    const DivEle = document.createElement("div");
    DivEle.classList.add("create");
    // to add icons like delete and retrieve icons
    const Editicon = document.createElement("i");
    Editicon.classList.add("bi");
    Editicon.classList.add("bi-pencil-square");

    // adding functionality for editicon
    Editicon.addEventListener('click',EditTask)
    Editicon.taskId=TaskList[i].taskId
    // delete icon
    const Delicon = document.createElement("i");
    Delicon.classList.add("bi");
    Delicon.classList.add("bi-trash");
    // adding functionality for deleteicon
    Delicon.addEventListener('click',DelTask)
    Delicon.taskId=TaskList[i].taskId

    // apppending icons to the div element

    DivEle.appendChild(Editicon);
    DivEle.appendChild(Delicon);

    // appending divelement to ul list
    Dynamiclis.appendChild(DivEle);
  }
}

// editicon functionality
function EditTask(e){
    var edi = TaskList.find((d)=>d.taskId == e.target.taskId)
    document.getElementById("input_val").value=edi.taskName;
}

// deleteicon functionality
function DelTask(e){
    var index=TaskList.findIndex((d)=>d.taskId == e.target.taskId)
    TaskList.splice(index,1)
    Rendering()
}

// removeall the data from the ul and local storage

function removeall(){
    TaskList.splice(0)
    localStorage.removeItem('taskname')
    Rendering()
}
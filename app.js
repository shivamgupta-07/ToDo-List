let inputForm = document.querySelector('#input-form');

inputForm.addEventListener('submit',function(event){
    event.preventDefault();
    let flag=0;
    let task = document.querySelector('#item').value.trim();
    //getting task list from local storage
    let taskList = localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')): []; 
    
    for(let item of taskList){
        if(task===item && task!==''){
            alert("You already have this item");
            flag=1;
            break;
        }
    }
    if(flag==0 && task!=''){
        taskList.unshift(task);
    }
    //set to local storage;
    localStorage.setItem('tasks',JSON.stringify(taskList));
    displayTask();
    inputForm.reset();    
});


//displaying tasks
let displayTask = () =>{
    let itemFrame = document.querySelector('#item-frame');
    let taskList = localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')): []; 
    let eachTask = '';
    if(taskList.length!==0){
        
        for(let task of taskList){
            if(task!==''){
                eachTask+=` 
                        <div>
                        <li class="list-group-item text-light item-list">
                        <span class="text-list">${task}</span>
                        <button id="close-btn" class="close"><i class="fas fa-times-circle icon"></i></button>
                        <button id="close-btn" class="close"><i class="fas fa-check-circle icon"></i></button>
                        </li>
                        </div>`;
            }   
        }
    }
    itemFrame.innerHTML = eachTask;
}
displayTask();

//clearing the FULL list
let clearList = document.querySelector('#clear-list');
clearList.addEventListener('click',function(){
    if(confirm("Do you really want to clear the list?")){
        localStorage.clear();
    }
    displayTask();
});

//deleting a specific item

let closeButton = document.querySelector('#item-frame');
let liItem = closeButton.children;
closeButton.addEventListener('click',function(event){
    let targetEl = event.target;
    if(targetEl.classList.contains('fa-times-circle')){
        let selectedItem = targetEl.parentElement.parentElement.innerText;
        
        let taskList = localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')): []; 

        taskList=taskList.filter(function(task){
            return task.trim() !== selectedItem.trim();
        });
        localStorage.setItem('tasks',JSON.stringify(taskList));
    }
    if(targetEl.classList.contains('fa-check-circle')){
        alert('This option is not yet added');
        /*
        let selectedItem = targetEl.parentElement.parentElement.parentElement.parentElement;
        selectedItem.classList.toggle("highlightItem");
        console.log(selectedItem);
        */
    }
    displayTask();

    //crossing out a item when completed
});         

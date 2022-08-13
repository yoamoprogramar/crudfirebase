import {saveTask, getTaskList, onGetTasks,deleteTask,getTask} from './firebase.js';

const divTasks=document.querySelector("#task-container");
window.addEventListener('DOMContentLoaded', async ()=>{
    console.log("works!!")
    onGetTasks((querySnapshot)=>{
       // querySnapshot=await getTaskList();
    //console.log(querySnapshot);
    let html='';
    querySnapshot.forEach((doc) => {
       // console.log(`${doc.id} => Titulo: ${doc.data().title}, Descripción:${doc.data().description}`);
        const tarea=doc.data();
        html+=`
            <div>
                <h3>Titulo: ${tarea.title}</h3>
                <p>Descripción:  ${tarea.description} </p>
                <button class="btn-update" data-id="${doc.id}">Update</button>
                <button class="btn-delete" data-id="${doc.id}">Delete</button>
            </div>
        `;
      });
      divTasks.innerHTML=html; 
      const btnsDelete=divTasks.querySelectorAll(".btn-delete")   
      btnsDelete.forEach(btn=>{
        btn.addEventListener('click',({target:{dataset}})=>{
            Swal.fire({
                title: 'Estas seguro de eliminar esta Tarea?',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteTask(dataset.id);
                } 
            })
        })
      });

      const btnsUpdate=divTasks.querySelectorAll(".btn-update")   
      btnsUpdate.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            Swal.fire({
                title: 'Estas seguro de eliminar esta Tarea?',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    await getTask(e.target.dataset.id);
                } 
            })
        })
      });
})
})

const taskForm=document.querySelector("#task-form");

taskForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=taskForm['task-title'];
    const description=taskForm['task-description'];
    saveTask(title.value,description.value );
    taskForm.reset();
})
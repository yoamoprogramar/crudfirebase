
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
  import { 
    getDocs,
    addDoc, 
    deleteDoc,
    getFirestore, 
    collection,
    onSnapshot,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js"

  
  const firebaseConfig = {
    apiKey: "AIzaSyCg9hz1LJ6KPK-KUuJagBfPSwsi_HYCbQo",
    authDomain: "crudjs-60dbe.firebaseapp.com",
    databaseURL: "https://crudjs-60dbe.firebaseio.com",
    projectId: "crudjs-60dbe",
    storageBucket: "crudjs-60dbe.appspot.com",
    messagingSenderId: "734997165024",
    appId: "1:734997165024:web:84877be2d71e2983177185"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const db=getFirestore();
 export const saveTask=(title, description)=>{
    console.log(title,description)
    addDoc(collection(db,'tasks'),{title,description})
  }

  export const getTaskList=()=>{
    return getDocs(collection(db,"tasks"));
  }

  export const onGetTasks=(callback)=> onSnapshot(collection(db,'tasks'),callback);

  export {onSnapshot, collection,db}

  export const deleteTask=(id)=> deleteDoc(doc(db,'tasks',id))


  export const getTask=(id)=>getDoc(doc(db,'tasks',id))
"use client"

import { auth } from "@/firebase/config"
import {getAuth} from "firebase/auth"
import { useState } from "react";


export default function AdminPage(){

    const auth = getAuth();
    const user = auth.currentUser;

    //tasks

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const [tasks, setTasks] = useState([]);

    //projects

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectTechStack, setProjectTechStack] = useState("");
    const [projects, setProjects] = useState([]);
    const [isProjectCompleted, setIsProjectCompleted] = useState(false);
    const [projectProgress, setProjectProgress] = useState("");

    //users

    const [users, setUsers] = useState([]);

    if(!user){
       return( <h1>Loading...</h1>)
    }

    return(
        <main>
            <h1>Admin Page</h1>
            <p>Welcome {user.displayName}</p>
        </main>
    )
}
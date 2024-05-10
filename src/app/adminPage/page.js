"use client"

import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config"
import {getAuth} from "firebase/auth"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export default function AdminPage(){

    const auth = getAuth();
    const user = auth.currentUser;

    //logout
    const logout = () => {
        auth.signOut();
        router.push("/auth");
    }

    //tasks

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [isTaskCompleted, setIsTaskCompleted] = useState(false);
    const [tasks, setTasks] = useState([]);
    const taskId = Math.random().toString(36).substring(2);

    //projects

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectTechStack, setProjectTechStack] = useState("");
    const [projects, setProjects] = useState([]);
    const [isProjectCompleted, setIsProjectCompleted] = useState(false);
    const [projectDuration, setProjectDuration] = useState("");
    const [projectProgress, setProjectProgress] = useState("");

    //users

    const [users, setUsers] = useState([]);

    const [showProfile, setShowProfile] = useState(false);
    const router = useRouter();

    //database functions for tasks

        //createTasks
    const createTask = async(e) => {
        e.preventDefault();

        const newTask = {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            createdBy: user?.email,
            isTaskCompleted: isTaskCompleted,
            taskId: taskId ,
        }

        tasks.push(newTask);

        try {
            await addDoc(collection(db,"tasks"),newTask);
            alert("task successfully added to firestore database")
            setTaskTitle("");
            setTaskDescription("");
            setIsTaskCompleted(false);
        } catch (error) {
            console.log(error);
        }

        setTasks(tasks);
    }
        //getCurrentUserTasks
    const getCurrentUserTasks = async() => {
        if(!user){
            return <h1>Loading...</h1>
        }
        const q = query(collection(db,"tasks"),where("createdBy","==",user?.email));

        try {
            const querySnapshot = await getDocs(q);
            const newTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            setTasks(newTasks);
        } catch (error) {
            console.log(error);
        }  
    }
        //updateStateOnTaskCompletion
    const updateStateOnTaskCompletion = async() => {

    }
    //databse functions for projects
        //createProject
    const createProject = async(e) => {
        e.preventDefault();

        const newProject = {
            projectTitle: projectTitle,
            projectDescription: projectDescription,
            projectDuration:projectDuration,
            projectTechStack: projectTechStack,
            createdBy: user?.email,
            projectId: Math.random().toString(36).substring(2),
        }

        projects.push(newProject);

        try {
            await addDoc(collection(db,"projects"),newProject);
            alert("new project added to firestore database");
            setProjectTitle("");
            setProjectDescription("");
            setProjectDuration("");
            setProjectTechStack("");
        } catch (error) {
            console.log(error);
        }

        setProjects(projects);
    }
        //getCurrentUserProjects
    const getCurrentUserProjects = async() => {
        if(!user){
            return <h1>Loading...</h1>
        }
        const q = query(collection(db,"projects"),where("createdBy","==",user?.email));

        try {
            const querySnapshot = await getDocs(q);
            const newProject = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            setProjects(newProject);
        } catch (error) {
            console.log(error);
        }  
    }

    useEffect(() => {
        getCurrentUserTasks();
        getCurrentUserProjects();
    },[])

    if(!user){
      router.push("/auth")
    }

    return(
        <div className="flex h-screen dark select-none">
        {/* Sidebar */}
        <div className="w-60 bg-slate-950 min-h-screen p-5">
            <ul className="space-y-4 mt-20">
                <li className="hover:bg-slate-950 cursor-pointer duration-300 px-4 py-2 text-center border-2 rounded-xl border-slate-700 font-bold text-blue-500">Tasks</li>
                <li className="hover:bg-slate-950 px-4 py-2 text-center font-bold text-blue-500 border-2 rounded-xl border-slate-700 cursor-pointer duration-300">Projects</li>
                <li className="hover:bg-slate-950 px-4 py-2 text-center font-bold text-blue-500 border-2 rounded-xl border-slate-700 cursor-pointer duration-300">Pendings</li>
            </ul>
            <ul className="space-y-4 mt-4">
                <Popover>
                    <PopoverTrigger>
                        <li className="hover:bg-slate-950 px-12 py-2 text-center font-bold text-blue-500 border-2 rounded-xl border-slate-700 cursor-pointer duration-300">Create tasks</li>
                    </PopoverTrigger>
                    <PopoverContent>
                    <div className="space-y-5">
                    <Input placeholder="Task Name" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                    <Input placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>
                    <Button onClick={createTask}>Create Task</Button>
                    </div>
                </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger>
                        <li className="hover:bg-slate-950 px-10 py-2 text-center font-bold text-blue-500 border-2 rounded-xl border-slate-700 cursor-pointer duration-300">Create project</li>
                    </PopoverTrigger>
                    <PopoverContent>
                    <div className="space-y-5">
                        <Input placeholder="Project Name" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}/>
                        <Input placeholder="Project Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>
                        <Input placeholder="Tech Stack" value={projectTechStack} onChange={(e) => setProjectTechStack(e.target.value)}/>
                        <Input placeholder="Expected Duration" value={projectDuration} onChange={(e) => setProjectDuration(e.target.value)}/>
                        <Button onClick={createProject}>Create Project</Button>
                    </div>
                    </PopoverContent>
                </Popover>
                
                <Popover>
                    <PopoverTrigger>
                        <li className="hover:bg-slate-950 px-16 py-2 text-center font-bold text-red-700 border-2 rounded-xl border-slate-700 cursor-pointer duration-300">Logout</li>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="space-y-5">
                        <h1>Are you sure?</h1>
                        <Button variant="destructive" onClick={logout}>Logout</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
            <div className="block">
            <div className="flex justify-between">
            <Popover>
                <PopoverTrigger><div className="py-2 px-4 rounded-lg bg-lime-950">Create Task</div></PopoverTrigger>
                <PopoverContent>
                    <div className="space-y-5">
                    <Input placeholder="Task Name" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                    <Input placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>
                    <Button onClick={createTask}>Create Task</Button>
                    </div>
                </PopoverContent>
            </Popover>
            
            <Popover>
                <PopoverTrigger><div className="py-2 px-4 rounded-lg bg-teal-950">Create Project</div></PopoverTrigger>
                <PopoverContent>
                    <div className="space-y-5">
                        <Input placeholder="Project Name" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}/>
                        <Input placeholder="Project Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/>
                        <Input placeholder="Tech Stack" value={projectTechStack} onChange={(e) => setProjectTechStack(e.target.value)}/>
                        <Input placeholder="Expected Duration" value={projectDuration} onChange={(e) => setProjectDuration(e.target.value)}/>
                        <Button onClick={createProject}>Create Project</Button>
                    </div>
                </PopoverContent>
            </Popover>
            </div>
            <div className="mt-5">
                <h1 className="text-center text-2xl">Yours Tasks 🎯</h1>
                <div className="grid grid-cols-2 gap-3 mt-5">
                    {tasks.map((task) => (
                        <div key={task.taskId} className="bg-gray-950 border-2 border-slate-800 py-3 px-4 rounded-xl">
                            <h1 className="bg-lime-800 px-4 py-3 rounded-xl">{task.taskTitle}</h1>
                            <p className="text-lime-800 mt-4 px-4 py-3 rounded-xl">{task.taskDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-16">
                <h1 className="text-center text-2xl">Yours projects 👩‍💻</h1>
                <div className="grid grid-cols-2 gap-3 mt-5">
                    {projects.map((project) => (
                        <div key={project.projectId} className="bg-gray-950 border-2 border-slate-800 py-3 px-4 rounded-xl">
                            <h1 className="bg-sky-800 px-4 py-3 rounded-xl">{project.projectTitle}</h1>
                            <p className="text-sky-800 mt-4 px-4 py-3 rounded-xl">{project.projectDescription}</p>
                            <p className="text-sky-800 mt-4 px-4 py-3 rounded-xl">{`Tech stack: ${project.projectTechStack}`}</p>
                            <p className="text-sky-800 mt-4 px-4 py-3 rounded-xl">{`Project Duration: ${project.projectDuration}`}</p>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
        {/* User Profile */}
        <div className="w-60 p-5">
        <Popover>
            <PopoverTrigger>
            <img src={user?.photoURL} className="w-12 h-12 rounded-full cursor-pointer"/>
            </PopoverTrigger>
            <PopoverContent>
                <div className="space-y-6">
                    <h1>{user?.displayName}</h1>
                    <p>{user?.email}</p>
                    <Button onClick={logout} variant="destructive">Logout</Button>
                </div>
            </PopoverContent>
        </Popover>
        </div>
    </div>
    )
}
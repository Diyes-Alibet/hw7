import {useEffect, useState} from 'react';
import TaskItem from "../../components/TaskItem/TaskItem.jsx";

const URL = "http://localhost:8000/tasks";


function TasksPage() {

    const [input , setInput] = useState("");
    const [tasks, setTasks] = useState([]);

    async function createTasks(event) {
        event.preventDefault();
        const newTask ={
            isCompleted: false,
            description: input
        };

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask)
        });
        if(response.status === 201){
            fetchTasks();
        }
    }

    async function fetchTasks() {
        const response = await fetch(URL);
        const data = await response.json();
        setTasks(data);
    }

    async function deleteTasks(taskId) {
        const response = await fetch(`${URL}/${taskId}`, {
            method: "DELETE",
        });
        if(response.status === 200){
            fetchTasks();
        }
    }

    async function updateTaskStatus(taskId, isCompleted) {
        const updatedTask = {isCompleted};
        const response = await fetch(`${URL}/${taskId}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask)
        });
        if(response.status === 200){
            fetchTasks();
        }
    }

    async function updateTaskDescription(newDescription, taskId) {
        const updatedTask = {description: newDescription};
        const response = await fetch(`${URL}/${taskId}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask)
        });
        if(response.status === 200){
            fetchTasks();
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <h2>Tasks</h2>
            <form onSubmit={createTasks}>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit">A D D</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={deleteTasks}
                        onUpdateStatus={updateTaskStatus}
                        onUpdateDescription={updateTaskDescription}
                    />
                ))}
            </ul>
        </>
    );
}

export default TasksPage;

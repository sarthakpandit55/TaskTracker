import { useState, useEffect } from "react";
import Form from "./Form.jsx";
import { getTasks, createTask, updateTask, deleteTaskApi } from "../api/taskApi";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        status: "All",
        priority: "All",
        date: ""
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const addTask = async (task) => {
        const newTask = await createTask(task);
        setTasks(prev => [...prev, newTask]);
    };

    const toggleStatus = async (id, currentStatus) => {
        const updatedTask = await updateTask(id, {
            status: currentStatus === "Pending" ? "Done" : "Pending"
        });

        setTasks(prev =>
            prev.map(task =>
                task._id === id ? updatedTask : task
            )
        );
    };

    const deleteTask = async (id) => {
        await deleteTaskApi(id);
        setTasks(prev => prev.filter(task => task._id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        const statusMatch =
            filters.status === "All" || task.status === filters.status;

        const priorityMatch =
            filters.priority === "All" || task.priority === filters.priority;

        const dateMatch =
            !filters.date || task.dueDate === filters.date;

        return statusMatch && priorityMatch && dateMatch;
    });

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
    };

    return (
        <>
        <div className=" min-h-screen lg:px-60 py-8 md:px-30 px-10 ">
            <h1 className=" lg:text-6xl md:text-4xl text-3xl font-bold text-center my-10">
                🗓️ Task Tracker
            </h1>

            <Form addTask={addTask} />

            {/* Filters */}
            <div className="flex gap-4 my-8 flex-col md:flex-row">
                <select
                    className="p-2 rounded text-black border"
                    value={filters.status}
                    onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                    }
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                </select>

                <select
                    className="p-2 rounded text-black border"
                    value={filters.priority}
                    onChange={(e) =>
                        setFilters({ ...filters, priority: e.target.value })
                    }
                >
                    <option value="All">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <input
                    type="date"
                    className="p-2 rounded text-black border"
                    value={filters.date}
                    onChange={(e) =>
                        setFilters({ ...filters, date: e.target.value })
                    }
                />
            </div>

        </div>
            {/* Task List */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 md:px-20 gap-5 pb-20">
                {filteredTasks.map(task => (
                    <div
                        key={task._id}
                        className={`border p-4  rounded-md transition-all
                        ${task.status === "Done" ? "bg-green-700 opacity-80" : "bg-gray-200"}`}
                    >
                        <h2 className={task.status === "Done" ? "" : ""}>
                            Title: {task.title}
                        </h2>
                        <p>Description: {task.description}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Due Date: {formatDate(task.dueDate)}</p>
                        <p>Status: {task.status}</p>

                        <div className="mt-3 flex gap-4">
                            <button
                                onClick={() => toggleStatus(task._id, task.status)}
                                className={`px-3 py-1 rounded ${task.status === "Done" ? "bg-yellow-500" : "bg-green-500"}`}>
                                {task.status === "Done" ? "Mark Pending" : "Mark Done"}
                            </button>

                            <button
                                onClick={() => deleteTask(task._id)}
                                className="bg-red-500 px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            </>
    );
};

export default Home;

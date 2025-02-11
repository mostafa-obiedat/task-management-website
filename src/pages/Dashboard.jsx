import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { Search, Bell, UserCircle, Moon, Sun } from "lucide-react";
import { database, ref, get } from "../firebase/firebaseConfig";
import image from "../images/image (2).png";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("User");
    const [searchQuery, setSearchQuery] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const userDataFromLocalStorage = JSON.parse(localStorage.getItem("userData"));
        if (userDataFromLocalStorage) {
            setUserData(userDataFromLocalStorage);
            setUsername(userDataFromLocalStorage.username);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            const userTasksRef = ref(database, "tasks");
            get(userTasksRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const allTasks = snapshot.val();
                        const filteredTasks = Object.keys(allTasks).filter(taskId => {
                            return allTasks[taskId].assigned_user === `${userData.username} <${userData.email}>`;
                        }).map(taskId => allTasks[taskId]);

                        setTasks(filteredTasks);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching tasks:", error);
                });
        }
    }, [userData]);

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-500";
            case "medium":
                return "bg-green-500";
            case "low":
                return "bg-blue-500";
            default:
                return "bg-gray-500";
        }
    };

    const getStatusFill = (status) => {
        switch (status) {
            case "done":
                return 100;
            case "in_progress":
                return 50;
            case "todo":
                return 25;
            default:
                return 0;
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`flex h-screen w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Sidebar */}
            <aside className={`w-1/4 p-6 flex flex-col justify-between shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-700 to-purple-500'}`}>
                <div>
                    <h1 className="mb-8 text-3xl font-extrabold text-white">TickDone</h1>
                    <nav className="space-y-4">
                        <Link to="/dashboard" className="block px-5 py-3 text-white bg-purple-700 rounded-lg font-medium transition hover:bg-purple-600">Dashboard</Link>
                        <Link to="/tasks/create" className="block px-5 py-3 text-white hover:bg-blue-500 hover:text-gray-800 rounded-lg transition">Task Management</Link>
                        <Link to="/tasks" className="block px-5 py-3 text-white hover:bg-blue-500 hover:text-gray-800 rounded-lg transition">Tasks</Link>
                        <Link to="/Article" className="block px-5 py-3 text-white hover:bg-blue-500 hover:text-gray-800 rounded-lg transition">Articles</Link>
                        <Link to="/About" className="block px-5 py-3 text-white hover:bg-blue-500 hover:text-gray-800 rounded-lg transition">About Us</Link>
                        <Link to="/Contact" className="block px-5 py-3 text-white hover:bg-blue-500 hover:text-gray-800 rounded-lg transition">Contact Us</Link>
                    </nav>
                </div>
                <Link to="/" className="mx-auto flex items-center text-red-600 px-2 py-2 rounded-full font-semibold hover:bg-red-600 hover:text-white transition">
                    <FiLogOut className="w-5 h-5" />
                    <span className="px-2">Log Out</span>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <header className="flex items-center justify-between mb-8">
                    <div className="relative w-1/2 flex items-center">
                        <input
                            type="text"
                            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className={`absolute right-2 top-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex space-x-4 items-center">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 bg-transparent border-0 rounded-full hover:bg-gray-200 transition ${darkMode ? 'hover:bg-gray-700' : ''}`}
                        >
                            {darkMode ? (
                                <Sun className="w-6 h-6 text-yellow-400" />
                            ) : (
                                <Moon className="w-6 h-6 text-gray-800" />
                            )}
                        </button>
                        <Bell className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <Link to="/profile">
                            <img
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                className="w-10 h-10 rounded-full border text-gray-500 cursor-pointer hover:text-blue-600 transition"
                            />
                        </Link>
                    </div>
                </header>

                <section className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-600 to-white'} p-6 rounded-lg shadow-lg flex items-center justify-between`}>
                    <div>
                        <h1 className="text-xl font-bold text-white">Welcome, {username}!</h1>
                        <p className="text-gray-200">Keep track of your progress and achieve your goals!</p>
                        <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800">Today's Schedule</button>
                    </div>
                    <img
                        src={image}
                        alt="Illustration"
                        className="w-48 h-40 object-cover rounded-lg"
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredTasks.map((task, index) => {
                        const statusColor = getStatusFill(task.status);
                        const priorityColor = getPriorityColor(task.priority);

                        return (
                            <Card key={index} className={`p-4 transition hover:scale-105 hover:shadow-xl cursor-pointer rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-purple-700'} hover:border-purple-500`}>
                                <CardHeader
                                    title={task.title}
                                    className={`text-xl font-extrabold ${darkMode ? 'text-black' : 'text-gray-800'} mb-2 transition-all transform hover:scale-105 hover:text-purple-700 hover:shadow-lg`}
                                />
                                <CardContent>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{task.status}</span>
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{task.priority}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${priorityColor}`}
                                            style={{ width: `${statusColor}%` }}
                                        ></div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </section>
            </main>
        </div>
    );
}
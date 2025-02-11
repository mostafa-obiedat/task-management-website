import { useEffect, useState } from "react";
import { database, ref, get, remove } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // استيراد مكتبة SweetAlert2

export default function TasksCard() {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ حالة البحث
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const snapshot = await get(ref(database, "tasks"));
                if (snapshot.exists()) {
                    const tasksData = snapshot.val();
                    setTasks(Object.keys(tasksData).map((key) => ({
                        id: key,
                        ...tasksData[key]
                    })));
                } else {
                    console.log("No tasks found");
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // ✅ فلترة المهام بناءً على البحث
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        // عرض رسالة تأكيد باستخدام SweetAlert2
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                await remove(ref(database, `tasks/${id}`));
                setTasks(tasks.filter((task) => task.id !== id));
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting task:", error);
                Swal.fire("Error", "There was a problem deleting the task.", "error");
            }
        } else {
            Swal.fire("Cancelled", "Your task is safe :)", "info");
        }
    };

    return (
        <div className="container mt-4 px-4 my-5">
            <h2 className="text-2xl font-bold mb-4">Task List</h2>

            {/* ✅ مربع البحث */}
            <input
                type="text"
                placeholder="Search by task name..."
                className="w-full p-3 mb-6 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* عمود To Do */}
                <div className="bg-blue-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">To Do</h3>
                    {filteredTasks.filter(task => task.status === 'todo').length > 0 ? (
                        filteredTasks.filter(task => task.status === 'todo').map((task) => (
                            <div key={task.id} className="card bg-sky-200 shadow-lg rounded-lg overflow-hidden mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl border-2 border-purple-600">
                                <div className="p-4">
                                    <h5 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h5>
                                    <p className="text-gray-600 mb-2">{task.description}</p>
                                    <p className="text-sm text-gray-500"><strong>Status:</strong> {task.status}</p>
                                    <p className="text-sm text-gray-500"><strong>Deadline:</strong> {task.deadline || "No deadline"}</p>
                                    <div className="mt-4 flex space-x-3">
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all"
                                            onClick={() => navigate(`/task/${task.id}`)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all"
                                            onClick={() => navigate(`/edit-task/${task.id}`)}
                                        >
                                            Edit Task
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No tasks found.</p>
                    )}
                </div>

                {/* عمود Doing */}
                <div className="bg-green-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Doing</h3>
                    {filteredTasks.filter(task => task.status === 'in_progress').length > 0 ? (
                        filteredTasks.filter(task => task.status === 'in_progress').map((task) => (
                            <div key={task.id} className="card bg-sky-200 shadow-lg rounded-lg overflow-hidden mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl border-2 border-purple-600">
                                <div className="p-4">
                                    <h5 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h5>
                                    <p className="text-gray-600 mb-2">{task.description}</p>
                                    <p className="text-sm text-gray-500"><strong>Status:</strong> {task.status}</p>
                                    <p className="text-sm text-gray-500"><strong>Deadline:</strong> {task.deadline || "No deadline"}</p>
                                    <div className="mt-4 flex space-x-3">
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all"
                                            onClick={() => navigate(`/task/${task.id}`)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all"
                                            onClick={() => navigate(`/edit-task/${task.id}`)}
                                        >
                                            Edit Task
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No tasks found.</p>
                    )}
                </div>

                {/* عمود Done */}
                <div className="bg-pink-200 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Done</h3>
                    {filteredTasks.filter(task => task.status === 'done').length > 0 ? (
                        filteredTasks.filter(task => task.status === 'done').map((task) => (
                            <div key={task.id} className="card bg-sky-200 shadow-lg rounded-lg overflow-hidden mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl border-2 border-purple-600">
                                <div className="p-4">
                                    <h5 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h5>
                                    <p className="text-gray-600 mb-2">{task.description}</p>
                                    <p className="text-sm text-gray-500"><strong>Status:</strong> {task.status}</p>
                                    <p className="text-sm text-gray-500"><strong>Deadline:</strong> {task.deadline || "No deadline"}</p>
                                    <div className="mt-4 flex space-x-3">
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all"
                                            onClick={() => navigate(`/task/${task.id}`)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all"
                                            onClick={() => navigate(`/edit-task/${task.id}`)}
                                        >
                                            Edit Task
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No tasks found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
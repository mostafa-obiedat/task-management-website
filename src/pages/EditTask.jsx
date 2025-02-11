import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database, ref, get, set } from "../firebase/firebaseConfig";
import Swal from "sweetalert2"; // ✅ استيراد SweetAlert2

export default function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "",
        assigned_user: "",
        deadline: ""
    });
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const snapshot = await get(ref(database, `tasks/${id}`));
                if (snapshot.exists()) {
                    setTask(snapshot.val());
                } else {
                    console.log("Task not found");
                    navigate("/tasks");
                }
            } catch (error) {
                console.error("Error fetching task details:", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const snapshot = await get(ref(database, "users"));
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    setUsersList(Object.keys(usersData).map((key) => ({
                        id: key,
                        ...usersData[key]
                    })));
                } else {
                    console.log("No users found");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchTaskDetails();
        fetchUsers();
    }, [id, navigate]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await set(ref(database, `tasks/${id}`), task);

            // ✅ عرض رسالة نجاح مع زر "OK"
            Swal.fire({
                title: "Success!",
                text: "Task updated successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            }).then(() => {
                navigate(`/task/${id}`); // ✅ إعادة التوجيه بعد الضغط على OK
            });

        } catch (error) {
            console.error("Error updating task:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update task.",
                icon: "error",
                confirmButtonColor: "#d33",
                confirmButtonText: "Try Again"
            });
        }
    };

    return (
        <div className="container mt-4 px-4 my-6">
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                value={task.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                rows="4"
                                value={task.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Status</label>
                            <select
                                name="status"
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                value={task.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="todo">Todo</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Assigned User</label>
                            <select
                                name="assigned_user"
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                value={task.assigned_user}
                                onChange={handleChange}
                            >
                                <option value="">Select a user</option>
                                {usersList.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {`${user.username} <${user.email}>`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                                value={task.deadline}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                            >
                                Update Task
                            </button>
                            <button
                                type="button"
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                                onClick={() => navigate(`/task/${id}`)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import {
    onAuthStateChanged,
    child,
    get,
    ref,
    set,
    auth,
    database
} from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

export default function TasksManagment() {
    const [user, setUser] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "",
        assigned_user: "",
        deadline: "",
        priority: ""
    });

    // استرجاع بيانات المستخدم مع الدور (role)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userRef = ref(database, `users/${currentUser.uid}`);
                get(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            setUser({ uid: currentUser.uid, ...snapshot.val() });
                        } else {
                            setUser(currentUser);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // جلب قائمة المستخدمين من قاعدة البيانات
    useEffect(() => {
        get(child(ref(database), "users"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUsersList(Object.values(snapshot.val()));
                } else {
                    console.log("No users found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    // تحديث القيم عند التغيير في الحقول
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // إرسال المهمة إلى قاعدة البيانات
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire("Error", "You must be logged in to create a task.", "error");
            return;
        }

        const taskId = uuidv4();
        const newTask = { ...formData, created_by: user.uid };

        set(ref(database, "tasks/" + taskId), newTask)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Task created successfully!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                }).then(() => {
                    setFormData({
                        title: "",
                        description: "",
                        status: "",
                        assigned_user: "",
                        deadline: "",
                        priority: ""
                    });
                });
            })
            .catch((error) => {
                console.error("Error creating task:", error);
                Swal.fire("Error", "Failed to create task.", "error");
            });
    };

    return (
        <div className="container mx-auto mt-6 px-4 flex">
            {/* نموذج إنشاء مهمة جديدة */}
            <div className="w-2/3 pr-4">
                <h2 className="text-2xl font-bold mb-4 text-purple-600">Create New Task</h2>
                {user ? (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full p-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-600"
                                    placeholder="Task title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    className="w-full p-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-600"
                                    rows="4"
                                    placeholder="Task description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700">Status</label>
                                    <select
                                        name="status"
                                        className="w-full p-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-600"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="todo">TODO</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>

                                {/* حقل Assign User يظهر فقط إذا كان المستخدم مديرًا */}
                                {user?.role === "manager" && (
                                    <div>
                                        <label className="block text-gray-700">Assigned User</label>
                                        <select
                                            name="assigned_user"
                                            className="w-full p-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-600"
                                            value={formData.assigned_user}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a user</option>
                                            {usersList.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {`${item.username} <${item.email}>`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-gray-700">Deadline</label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        className="w-full p-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-600"
                                        min={new Date().toISOString().split("T")[0]}
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Priority</label>
                                    <select
                                        name="priority"
                                        className="w-full p-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-600"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition"
                            >
                                Create New Task
                            </button>
                        </form>
                    </div>
                ) : (
                    <p className="text-red-500 text-center mt-4">You must be logged in to create a task.</p>
                )}
            </div>

            {/* الصورة الجانبية */}
            <div className="w-1/3 pl-4 mt-40">
                <img
                    src="https://i.pinimg.com/736x/5f/ca/61/5fca61b7d81b917eb72fbd109727bf23.jpg"
                    alt="Focus Mode"
                    className="w-full rounded-lg shadow-md"
                />
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database, ref, get, remove } from "../firebase/firebaseConfig";
import Swal from "sweetalert2"; // استيراد مكتبة SweetAlert2

export default function TaskDetails() {
    const { id } = useParams();  // ✅ استخراج معرف المهمة من الرابط
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const snapshot = await get(ref(database, `tasks/${id}`));
                if (snapshot.exists()) {
                    setTask(snapshot.val());
                } else {
                    console.log("Task not found");
                    navigate("/tasks"); // إذا لم تكن المهمة موجودة، أعد المستخدم لقائمة المهام
                }
            } catch (error) {
                console.error("Error fetching task details:", error);
            }
        };

        fetchTaskDetails();
    }, [id, navigate]);

    const handleDelete = async () => {
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
            await remove(ref(database, `tasks/${id}`));
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
            navigate("/tasks"); // إعادة التوجيه إلى قائمة المهام بعد الحذف
        } else {
            Swal.fire("Cancelled", "Your task is safe :)", "info");
        }
    };

    if (!task) {
        return <p className="text-center text-lg">Loading task details...</p>;
    }

    return (
        <div className="container mt-4 px-4 my-6">
            <h2 className="text-2xl font-bold mb-4">Task Details</h2>
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <div className="card-body">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{task.title}</h3>
                    <p className="text-gray-700 mb-2"><strong>Description:</strong> {task.description}</p>
                    <p className="text-gray-700 mb-2">
                        <strong>Status:</strong>
                        <span
                            className={`badge ${task.status === "done"
                                    ? "bg-green-500 text-white"
                                    : task.status === "in_progress"
                                        ? "bg-yellow-400 text-white"
                                        : "bg-gray-500 text-white"
                                } py-1 px-3 rounded-full text-sm ml-2`}
                        >
                            {task.status.replace("_", " ").toUpperCase()}
                        </span>
                    </p>
                    <p className="text-gray-700 mb-2"><strong>Assigned User:</strong> {task.assigned_user || "Unassigned"}</p>
                    <p className="text-gray-700 mb-2"><strong>Deadline:</strong> {task.deadline || "No deadline"}</p>
                    <p className="text-gray-700 mb-4"><strong>Priority:</strong> {task.priority || "Medium"}</p>

                    <div className="flex space-x-4 mt-6">
                        <button
                            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all"
                            onClick={() => navigate(`/edit-task/${id}`)}
                        >
                            Edit Task
                        </button>
                        <button
                            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                            onClick={handleDelete}
                        >
                            Delete Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Tasks() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );
  
    return () => unsubscribe();
  }, []);
  const fetchTasks = async (currentUser) => {
    if (!currentUser) return;
  
    const q = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId),
      where("userId", "==", currentUser.uid)
    );
  
    const querySnapshot = await getDocs(q);
  
    const data = querySnapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  
    setTasks(data);
  };

  useEffect(() => {
    if (user) {
      fetchTasks(user);
    }
  }, [user]);

  const addTask = async () => {
    if (!taskName) {
      alert("Enter Task Name");
      return;
    }

    if (!user) {
      alert("Please login first");
      return;
    }
    
    await addDoc(collection(db, "tasks"), {
      name: taskName,
      projectId: projectId,
      status: "Pending",
      createdAt: new Date(),
      userId: user.uid,
      userEmail: user.email,
    });

    setTaskName("");
    fetchTasks(user);
  };
<button
  onClick={() => toggleStatus(task)}
  className="bg-green-500 px-3 py-1 rounded mr-2"
>
  Complete
</button>
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks(user);
  };
  const toggleStatus = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      status:
        task.status === "Completed"
          ? "Pending"
          : "Completed",
    });
  
    fetchTasks(user);
  };

  return (
    <div className="p-10 text-white min-h-screen bg-slate-900">
      <h1 className="text-4xl font-bold mb-6">
        Tasks
      </h1>

      <p className="mb-6">
        Project ID: {projectId}
      </p>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="p-3 rounded text-black w-80"
        />

        <button
          onClick={addTask}
          className="bg-cyan-500 px-5 py-3 rounded"
        >
          Add Task
        </button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p>No Tasks Found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-slate-800 p-4 rounded flex justify-between items-center"
            >
              <div>
  <h3>{task.name}</h3>

  <p
    className={
      task.status === "Completed"
        ? "text-green-400"
        : "text-yellow-400"
    }
  >
    {task.status || "Pending"}
  </p>
</div>

<div className="flex gap-2">


  <button
    onClick={() => deleteTask(task.id)}
    className="bg-red-500 px-3 py-1 rounded"
  >
    Delete
  </button>
</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;
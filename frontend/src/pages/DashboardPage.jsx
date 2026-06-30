import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function DashboardPage() {
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [recentProjects, setRecentProjects] = useState([]);
useEffect(() => {
  const user = auth.currentUser;

  if (user) {
    setUserEmail(user.email);
  }

  fetchDashboardData();
}, []);


const fetchDashboardData = async () => {
  try {
    const user = auth.currentUser;

    if (!user) return;

    // User Projects
    const projectQuery = query(
      collection(db, "projects"),
      where("userId", "==", user.uid)
    );

    const projectsSnapshot = await getDocs(projectQuery);

    setProjectCount(projectsSnapshot.size);
    const projects = projectsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    setRecentProjects(projects);
    // User Tasks
    const taskQuery = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const tasksSnapshot = await getDocs(taskQuery);

    setTaskCount(tasksSnapshot.size);

    let completed = 0;

    tasksSnapshot.forEach((doc) => {
      if (doc.data().status === "Completed") {
        completed++;
      }
    });

    setCompletedCount(completed);
    if (tasksSnapshot.size > 0) {
      setProgress(
        Math.round((completed / tasksSnapshot.size) * 100)
      );
    } else {
      setProgress(0);
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6">
          Dashboard
        </h1>

        {/* Profile Card */}
        <div className="bg-slate-800 p-4 rounded-xl mb-6">
  <h3 className="text-xl font-bold">
  {userEmail || "User"}
  </h3>

  <p className="text-slate-400">
    Firebase Authenticated User
  </p>
</div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Projects</h3>

            <p className="text-5xl font-bold">
              {projectCount}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Total Tasks</h3>

            <p className="text-5xl font-bold">
              {taskCount}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Completed Tasks</h3>

            <p className="text-5xl font-bold">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-slate-800 p-6 rounded-xl mt-6">
          <h3 className="text-xl font-bold">
            Project Progress
          </h3>

  
          <div className="w-full bg-slate-700 h-4 rounded mt-4">
       <div                    className="bg-cyan-400 h-4 rounded"
       style={{ width: `${progress}%` }}
     ></div>
   </div>

<p className="mt-3">
  {progress}% Complete
</p>  
        </div>

        {/* Recent Projects */}
        <div className="mt-6 bg-slate-800 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            Recent Projects
          </h2>

          <div className="space-y-3">
  {recentProjects.length === 0 ? (
    <p className="text-slate-400">
      No Projects Found
    </p>
  ) : (
    recentProjects.map((project) => (
      <div
        key={project.id}
        className="bg-slate-700 p-4 rounded flex justify-between items-center"
      >
        <div>
          <h3 className="font-semibold text-lg">
            {project.name}
          </h3>

          <p className="text-sm text-slate-400">
            Created by {project.userEmail}
          </p>
        </div>

        <span className="bg-cyan-500 px-3 py-1 rounded text-sm">
          Active
        </span>
      </div>
    ))
  )}
</div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
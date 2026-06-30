import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Projects Count
      const projectsSnapshot = await getDocs(collection(db, "projects"));
      setProjectCount(projectsSnapshot.size);

      let totalTasks = 0;
      let completedTasks = 0;

      for (const projectDoc of projectsSnapshot.docs) {
        const tasksSnapshot = await getDocs(
          collection(db, "projects", projectDoc.id, "tasks")
        );

        totalTasks += tasksSnapshot.size;

        tasksSnapshot.forEach((task) => {
          if (task.data().status === "Completed") {
            completedTasks++;
          }
        });
      }

      setTaskCount(totalTasks);
      setCompletedCount(completedTasks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-32 px-10">
      <h2 className="text-4xl font-bold text-center mb-12">
        Dashboard Preview
      </h2>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Projects</h3>
            <p className="text-4xl font-bold">{projectCount}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Total Tasks</h3>
            <p className="text-4xl font-bold">{taskCount}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3>Completed Tasks</h3>
            <p className="text-4xl font-bold">{completedCount}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
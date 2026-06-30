import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);
  
        if (currentUser) {
          await fetchProjects(currentUser);
        } else {
          setProjects([]);
        }
      }
    );
  
    return () => unsubscribe();
  }, []);

  const fetchProjects = async (currentUser) => {
    try {
      if (!currentUser) return;
  
      const q = query(
        collection(db, "projects"),
        where("userId", "==", currentUser.uid)
      );
  
      const querySnapshot = await getDocs(q);
  
      const data = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
  
      setProjects(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  

  const addProject = async () => {
    try {
      if (!projectName.trim()) {
        alert("Enter Project Name");
        return;
      }

      if (!user) {
        alert("Please login first");
        return;
      }

      await addDoc(collection(db, "projects"), {
        name: projectName,
        createdAt: new Date(),
        userId: user.uid,
        userEmail: user.email,
      });

      setProjectName("");
      
     await fetchProjects(user);

      alert("Project Added Successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      await fetchProjects(user);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const updateProject = async (id) => {
    const newName = prompt("Enter New Project Name");

    if (!newName) return;

    try {
      await updateDoc(doc(db, "projects", id), {
        name: newName,
      });

      await fetchProjects(user);

      alert("Project Updated Successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Projects
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) =>
            setProjectName(e.target.value)
          }
          style={{
            width: "300px",
            padding: "12px",
            fontSize: "16px",
            color: "black",
            background: "white",
            border: "1px solid gray",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />

        <button
          onClick={addProject}
          style={{
            padding: "12px 20px",
            background: "#06b6d4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p>No Projects Found</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "#1e293b",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span>{project.name}</span>

              <button
                onClick={() =>
                  navigate(`/tasks/${project.id}`)
                }
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Open
              </button>
            </div>

            <div>
              <button
                onClick={() =>
                  updateProject(project.id)
                }
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteProject(project.id)
                }
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;
import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import api from "../configs/api";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );

      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resume);

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );

      setTitle("");
      setResume(null);
      setShowUploadResume(false);

      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }

    setIsLoading(false);
  };

  const editTitle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        "/api/resumes/update",
        {
          resumeId: editResumeId,
          resumeData: { title },
        },
        { headers: { Authorization: token } }
      );

      setAllResumes(
        allResumes.map((r) =>
          r._id === editResumeId ? { ...r, title } : r
        )
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (id) => {
    try {
      if (window.confirm("Delete this resume?")) {
        const { data } = await api.delete(
          `/api/resumes/delete/${id}`,
          { headers: { Authorization: token } }
        );

        setAllResumes(allResumes.filter((r) => r._id !== id));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) loadAllResumes();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6">
        Welcome, {user?.name || "User"}
      </h1>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-40 h-40 border border-dashed flex flex-col items-center justify-center rounded-lg"
        >
          <PlusIcon />
          Create
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className="w-40 h-40 border border-dashed flex flex-col items-center justify-center rounded-lg"
        >
          <UploadCloudIcon />
          Upload
        </button>
      </div>

      {/* RESUME LIST */}
      <div className="grid grid-cols-2 gap-4">
        {allResumes.map((resume, i) => {
          const color = colors[i % colors.length];

          return (
            <div
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="p-4 border rounded cursor-pointer"
              style={{ borderColor: color }}
            >
              <p>{resume.title}</p>

              <div className="flex gap-2 mt-2">
                <TrashIcon onClick={(e) => {
                  e.stopPropagation();
                  deleteResume(resume._id);
                }} />

                <PencilIcon onClick={(e) => {
                  e.stopPropagation();
                  setEditResumeId(resume._id);
                  setTitle(resume.title);
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {showCreateResume && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={createResume} className="bg-white p-6 rounded">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border p-2 mb-3 w-full"
            />
            <button className="bg-green-500 text-white px-4 py-2">
              Create
            </button>
          </form>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadResume && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={uploadResume} className="bg-white p-6 rounded">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border p-2 mb-3 w-full"
            />

            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className="mb-3"
            />

            <button className="bg-green-500 text-white px-4 py-2">
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      )}

      {/* EDIT MODAL */}
      {editResumeId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={editTitle} className="bg-white p-6 rounded">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 mb-3 w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2">
              Update
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
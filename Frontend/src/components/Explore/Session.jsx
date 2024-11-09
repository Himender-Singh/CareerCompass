import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "@/redux/authSlice";
import useGetSuggestedUser from "@/hooks/useGetSuggestedUser";

const Session = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.auth.tasks); // Access tasks from Redux state
  const [sessions, setSessions] = useState([]); // Define sessions state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [input, setInput] = useState({
    mentorEmail: "",
    task: "",
    dateTime: "",
  });

  // Fetch suggested users
  const { suggestedUsers } = useGetSuggestedUser() || { suggestedUsers: [] }; // Ensure suggestedUsers is an array
  const { user } = useSelector(state => state.auth);
  const userId = user?._id;

  // Update sessions state with tasks from Redux
  useEffect(() => {
    console.log("tasks fetched from dispatch", tasks);
    const formattedSessions = tasks
      .filter(task => task.author === userId) // Filter tasks where author matches logged-in user
      .map((task) => ({
        id: task._id, // Adjust this according to your task data structure
        mentor: task.mentor ? (task.mentor?.username || "Mentor not found") : "Mentor not found",
        dateTime: task.dateTime,
        isTaskDone: task.isTaskDone,
        task: task.task,
      }));
    console.log("after", formattedSessions); 
    setSessions(formattedSessions); 
  }, [tasks, userId]); 
  
  // Function to determine task status
  const getTaskStatus = (isTaskDone, dateTime) => {
    const currentDate = new Date();
    const taskDate = new Date(dateTime);

    if (isTaskDone) {
      return "Completed";
    } else if (taskDate > currentDate) {
      return "Upcoming";
    } else {
      return "Pending"; // or "Canceled", depending on your logic
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const sessionHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://careercompass-1dh2.onrender.com/task/addTask",
        input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setTasks([...tasks, res.data.task])); // Add new task to Redux state
        setInput({
          mentorEmail: "",
          task: "",
          dateTime: "",
        });
        console.log(input);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="w-full font-poppins text-white h-full">
      <div className="border-b border-gray-400 h-14 bg-[#0e082b]" />
      <div className="container max-w-screen-lg mx-auto mt-6 px-4">
        <h2 className="text-3xl font-bold mb-2">
          Explore Your Session History
        </h2>
        <p className="text-md text-gray-400 font-semibold">
          Discover a comprehensive timeline of all your sessions with CareerCompass.
        </p>
        <button
          onClick={openDialog}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4"
        >
          Schedule a Session
        </button>
      </div>

      <div className="container max-w-screen-lg mx-auto mt-10 px-4">
        {sessions.map((session) => ( // Use sessions instead of tasks
          <div
            key={session.id}
            className="bg-[#0f172a] border border-gray-500 p-4 rounded-lg mb-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="md:flex-1">
              <h3 className="text-xl font-semibold">{session.task}</h3>
              <p className="text-gray-400 mt-2">
                <strong>Mentor:</strong> {session.mentor}
              </p>
              <p className="text-gray-400">
                <strong>Date:</strong> {new Date(session.dateTime).toLocaleString()}
              </p>
            </div>
            <span
              className={`mt-2 md:mt-0 md:ml-4 px-3 py-1 rounded-full text-sm ${
                getTaskStatus(session.isTaskDone, session.dateTime) === "Completed"
                  ? "bg-green-600"
                  : getTaskStatus(session.isTaskDone, session.dateTime) === "Upcoming"
                  ? "bg-blue-600"
                  : "bg-red-600"
              }`}
            >
              {getTaskStatus(session.isTaskDone, session.dateTime)}
            </span>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1f2937] p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Schedule a New Session</h3>
            <form onSubmit={sessionHandler}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Mentor Email</label>
                <select
                  name="mentorEmail"
                  value={input.mentorEmail}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 bg-[#374151] rounded-lg text-white"
                  required
                >
                  <option value="" disabled>Select a mentor</option>
                  {suggestedUsers.map((user) => (
                    <option key={user._id} value={user.email}>{user.username}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Date</label>
                <input
                  type="date" // Allow date and time input
                  name="dateTime"
                  value={input.dateTime}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 bg-[#374151] rounded-lg text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="task"
                  value={input.task}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 bg-[#374151] rounded-lg text-white"
                  rows="3"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeDialog}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Session;

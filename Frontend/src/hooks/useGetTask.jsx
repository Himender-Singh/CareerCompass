import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setTasks } from "@/redux/authSlice";

const useGetTask = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await axios.get('https://careercompass-1-sq77.onrender.com/api/v1/task/getUserTask', {
                    withCredentials: true,
                });
                // console.log(res);
                if (res.data.success) {
                    dispatch(setTasks(res.data.tasks)); // Dispatch tasks to Redux store
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                toast.error("Failed to fetch tasks");
            }
        };

        fetchTask();
    }, [dispatch]); // Add dispatch to the dependency array
};

export default useGetTask;

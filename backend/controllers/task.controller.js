import { sendEmail } from "../middlewares/emailService.js";
import { scheduleSessionEmail } from "../middlewares/templates.js";
import {Task} from "../models/task.model.js";
import {User} from "../models/user.model.js";

export const addTask = async (req, res) => {
  try {
    const { mentorEmail, task, dateTime } = req.body;
    const authorId = req.id; // Adjust based on how you store logged-in user ID
    
    // Find mentor by email
    const mentor = await User.findOne({ email: mentorEmail });
    if (!mentor) {
      return res.status(404).json({
        message: "Mentor not found",
        success: false,
      });
    }
    // Find the author
    const author = await User.findById(authorId);

    // Prepare and send emails to mentor and author
    const message = scheduleSessionEmail(task, dateTime);
    sendEmail(mentor.email, 'New Session Scheduled', message);   // Send email to mentor
    sendEmail(author.email, 'Session Confirmation', message);    // Send email to author

    // Create the new task
    const newTask = await Task.create({
      task,
      dateTime,
      author: authorId,
      mentor: mentor,
      isTaskDone:false,
    });

    return res.status(201).json({
      message: "New Task added",
      task: newTask,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while adding the task",
      error: error.message,
      success: false,
    });
  }
};


export const getTaskById = async (req, res) => {
  try {
    // Extract the task ID from request parameters
    const { id } = req.params;

    // Get the logged-in user's ID from the request (assuming it's stored in req.id)
    const authorId = req.id;
    console.log(authorId);

    // Find the task by ID and ensure it belongs to the logged-in user
    const task = await Task.findOne({ _id: id, author: authorId })
      .populate("mentor", "username email") // Populate mentor details
      .populate("author", "username email"); // Populate author details

    // If no task is found, return a 404 status
    if (!task) {
      return res.status(404).json({
        message: "Task not found or you do not have permission to access it.",
        success: false,
      });
    }

    // Return the task details
    return res.status(200).json({
      message: "Task retrieved successfully",
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving the task. Please try again later.",
      success: false,
    });
  }
};

export const getAllUserTasks = async (req, res) => {
  try {
    const authorId = req.id; // Access the user ID from req.user

    if (!authorId) {
      return res.status(401).json({
        message: "Unauthorized: No user ID found",
        success: false,
      });
    }

    const tasks = await Task.find({ author: authorId })
      .populate("mentor", "username email")
      .populate("author", "username email");

    console.log("Fetched tasks:", tasks); // Log the tasks here

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        message: "No tasks found for this user.",
        success: true,
        tasks: [], // Return an empty array to indicate no tasks
      });
    }

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving tasks.",
      success: false,
      error: error.message,
    });
  }
};


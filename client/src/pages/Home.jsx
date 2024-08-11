import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import gsap from "gsap";
import { VscLayersActive } from "react-icons/vsc";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import { MdSpaceDashboard } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../state/api/todoApis";
import CustomizedTodos from "../components/CustomizedTodos";
const Home = () => {
  const createTodoFormRef = useRef();
  const container = useRef();
  const responsePopupRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [createTodoResponse, setCreateTodoResponse] = useState("");
  const { data: todos, isError, isLoading } = useGetTodosQuery();
  const [taskcategory, setTaskCategory] = useState("recentTasks");
  const [addTodo, { isLoading: isAdding, isError: isAddError }] =
    useAddTodoMutation();
  const [updateTodo, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting, isError: isDeleteError }] =
    useDeleteTodoMutation();
  const [recentTodos, setRecentTodos] = useState([]);
  const [focusedTodos, setFocusedTodos] = useState([]);
  const [favoritedTodos, setFavoriteTodos] = useState([]);
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await addTodo({ title, description });
      if (response.error) {
        setCreateTodoResponse(
          response.error.data.message || response.error.error
        );
      } else {
        setCreateTodoResponse(response.data.message);
        setIsActive(false);
        setTitle("");
        setDescription("");
        activeTodos.push(response.data.todo);
      }
      responsePopupRef.current.classList.remove("hide");
    } catch (error) {
      new Error(error.error);
    }
  };

  useEffect(() => {
    setActiveTodos(
      todos?.filter((todo) => {
        return todo.completed !== true;
      })
    );
    setCompletedTodos(
      todos?.filter((todo) => {
        return todo.completed === true;
      })
    );

    // Recent Tasks
    if (Array.isArray(todos)) {
      const sortedTodos = [...todos].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentTodos(sortedTodos?.filter((todo, index) => index <= 4));
    }
  }, [todos]);

  // GSAP Animation in showcase
  const showcaseRef = useRef();
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(showcaseRef.current, {
        delay: 0.3,
        x: -50,
        duration: 0.5,
        opacity: 0,
        stagger: 0.1,
      });
    },
    { scope: container }
  );

  const handleSetCustomizedTodos = (e) => {
    setTaskCategory(e.target.dataset.taskcategory);
  };

  // Animation on
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".todos", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.2,
      });
    },
    [taskcategory],
    { scope: container }
  );

  return (
    <>
      <div
        ref={container}
        className="main relative overflow-hidden min-h-screen"
      >
        <div
          ref={responsePopupRef}
          className={`hide rounded-md add-message fixed top-10 left-[50%] -translate-x-[50%] z-20`}
        >
          <span
            className={`px-4 py-2 shadow-md ${
              createTodoResponse === "Created"
                ? "text-green-700 bg-green-300"
                : "text-red-700 bg-red-300"
            } rounded-md flex items-center gap-4`}
          >
            <span>{createTodoResponse}</span>
            <span
              onClick={() => responsePopupRef.current.classList.add("hide")}
              className="text-xl cursor-pointer"
            >
              <IoCloseSharp />
            </span>
          </span>
        </div>
        <div
          ref={showcaseRef}
          className="cotents overflow-hidden flex items-center justify-center flex-col md:w-[70%] mx-auto p-8 bg-[rgba(255,255,255,.2)]"
        >
          <h1 className="text-6xl text-center mb-4 font-bold text-color">
            Welcome to Todoism
          </h1>
          <h3 className="text-4xl my-4 font-bold text-color">
            Get Things Done, One Task at a Time
          </h3>
          <p>
            Stay organized and boost your productivity with TaskMaster, the
            all-in-one to-do list app designed to help you manage your tasks
            effortlessly. Whether you're planning your day, focusing on priority
            projects, or tracking your progress, TaskMaster offers a clean and
            intuitive interface to keep you on top of everything. Categorize,
            prioritize, and conquer your tasks with ease. TaskMaster is your
            go-to tool for turning your goals into accomplishments.
          </p>
          <button
            onClick={() => setIsActive(true)}
            className="button-create px-4 py-2 rounded-md mt-4"
          >
            Create Todo
          </button>
        </div>
        {/* Todos */}

        <div className="dashboard md:w-[70%] mx-auto md:py-16">
          <div className="header mb-8">
            <h1 className="text-3xl font-bold text-color flex items-center gap-1">
              <MdSpaceDashboard />
              <span>Dashboard</span>
            </h1>
          </div>
          <div className="content gap-6 grid grid-cols-4">
            <div className="active-todos">
              {isLoading ? (
                "Loading..."
              ) : (
                <div className="flex justify-center flex-col gap-4 bg-active-todo">
                  <span className="text-6xl font-bold text-gray-900">
                    {activeTodos?.length}
                  </span>
                  <span className="flex items-center text-2xl gap-2">
                    <VscLayersActive className="text-color" />
                    <span>Active Tasks</span>
                  </span>
                </div>
              )}
            </div>
            <div className="completed-todos">
              {isLoading ? (
                "Loading..."
              ) : (
                <div className="flex justify-center flex-col gap-4 bg-active-completed">
                  <span className="text-6xl font-bold text-gray-900">
                    {completedTodos?.length}
                  </span>
                  <span className="flex items-center text-2xl gap-2">
                    <IoCheckmarkDoneCircleSharp className="text-color" />
                    <span>Completed Tasks</span>
                  </span>
                </div>
              )}
            </div>
            <div className="todos-container col-span-2 w-full bg-[rgba(0,0,0,.05)] rounded-md">
              <div className="nav w-full">
                <ul className="grid grid-cols-3 w-full text-center bg-dark-blue rounded-t-md text-white">
                  <li>
                    <button
                      onClick={(e) => handleSetCustomizedTodos(e)}
                      data-taskcategory="recentTasks"
                      className="p-2 w-full hover:bg-[rgba(0,0,0,.2)] active:scale-95"
                    >
                      Recent Tasks
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => handleSetCustomizedTodos(e)}
                      data-taskcategory="focusedTasks"
                      className="p-2 w-full hover:bg-[rgba(0,0,0,.2)] active:scale-95"
                    >
                      Focused Tasks
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => handleSetCustomizedTodos(e)}
                      data-taskcategory="favoriteTasks"
                      className="p-2 w-full hover:bg-[rgba(0,0,0,.2)] active:scale-95"
                    >
                      Favorite Tasks
                    </button>
                  </li>
                </ul>
              </div>
              <div className="todos-contents customzed-scrollbar overflow-auto h-[500px]">
                <div className="todos">
                  <CustomizedTodos
                    customizedTodos={
                      taskcategory == "recentTasks"
                        ? recentTodos
                        : taskcategory === "focusedTasks"
                        ? focusedTodos
                        : favoritedTodos
                    }
                    title={
                      taskcategory == "recentTasks"
                        ? "Recent Tasks"
                        : taskcategory === "focusedTasks"
                        ? "Focused Tasks"
                        : "Favorite Tasks"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Todo Model */}
      <div
        className={`create-todo fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] ${
          isActive ? "visible" : "invisible"
        }`}
      >
        <form
          ref={createTodoFormRef}
          className={`${
            isActive ? "active" : "inactive"
          } flex rounded-md gap-6 flex-col absolute top-[50%] left-[50%] -translate-x-[50%] p-4 -translate-y-[50%] w-[400px] bg-global`}
        >
          <h1 className="text-3xl p-4 text-center text-gray-600">
            Create Todo
          </h1>
          <input
            type="text"
            className="px-4 py-2 bg-[rgba(0,0,0,.1)] outline-none text-gray-950 rounded-md placeholder:text-gray-950 relative z-0 focus:ring-2 ring-[#006989] input-placeholder"
            id="title"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="px-4 py-2 bg-[rgba(0,0,0,.1)] outline-none rounded-md text-gray-950 placeholder:text-gray-950 focus:ring-2 ring-[#006989] input-placeholder"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={(e) => handleAddTodo(e)}
            className="button-create px-4 py-2 rounded-md mt-4"
          >
            {isAdding ? "Adding Todo" : "Add Todo"}
          </button>
          <span
            onClick={() => {
              setIsActive(false);
              responsePopupRef.current.classList.add("hide");
            }}
            className="absolute w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-[rgba(0,0,0,.1)] rounded-full top-6 right-6"
          >
            <IoCloseSharp
              size={20}
              className=" text-gray-950 active:scale-95 transition-transform duration-150"
            />
          </span>
        </form>
      </div>
    </>
  );
};

export default Home;

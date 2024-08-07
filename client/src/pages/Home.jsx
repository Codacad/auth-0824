import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="main min-h-screen">
        <div className="cotents flex items-center justify-center flex-col md:w-[70%] mx-auto p-8 bg-[rgba(255,255,255,.2)]">
          <h1 className="text-4xl mb-4">Welcome to Todoism</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum fuga
            consequuntur ab veritatis officiis architecto suscipit aliquid
            provident? Iste officia consequuntur ipsam magni, perferendis
            voluptatem rerum, quisquam veniam nam ducimus dolores aperiam aut
            vero expedita. Obcaecati quisquam, in hic nihil cum dolorum officia
            minus enim neque fugiat doloribus vero dolorem delectus quidem
            cumque eligendi molestias. Aliquid deserunt quibusdam sed nulla,
            adipisci itaque laborum quis doloremque voluptatem cum minima id
            alias quae expedita corrupti eius fuga. Possimus alias, harum
            sapiente sit nobis exercitationem obcaecati officiis dolor non vitae
            suscipit laborum porro aut ratione architecto libero corrupti. Eos
            dolor soluta architecto reprehenderit!
          </p>
          <button className="button-create px-4 py-2 rounded-md mt-4">
            Create Todo
          </button>
        </div>
      </div>

      {/* Create Todo Model */}
      <div className="create-todo fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)]">
        <form className="flex rounded-md gap-6 flex-col absolute top-[50%] left-[50%] -translate-x-[50%] p-4 -translate-y-[50%] w-[400px] bg-global">
          <h1 className="text-3xl p-4 text-center text-gray-600">Create Todo</h1>
          <input
            type="text"
            className="px-4 py-2 bg-[rgba(0,0,0,.1)] outline-none text-gray-950 rounded-md placeholder:text-gray-950 text-gray-500 focus:ring-2 ring-[#006989]"
            id="title"
            placeholder="Title"
          /> 
          <input
            type="text"
            className="px-4 py-2 bg-[rgba(0,0,0,.1)] outline-none rounded-md text-gray-950 placeholder:text-gray-950 focus:ring-2 ring-[#006989]"
            id="description"
            placeholder="Description"
          />
          <button className="button-create px-4 py-2 rounded-md mt-4">
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;

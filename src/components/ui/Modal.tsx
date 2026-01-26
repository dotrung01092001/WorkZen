const Modal = ({ setIsOpenModal }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
      <h1 className="text-center font-semibold text-lg">Add New Employee</h1>
      <button onClick={() => setIsOpenModal(false)} className="absolute top-2 right-2 px-2 py-1 rounded-md bg-red-500 hover:bg-red-400 font-semibold cursor-pointer">X</button>
      <form action="">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Type Name"
          className="mt-1 w-full border rounded px-3 py-2"
        />
        <label className="block text-sm font-medium my-1">Email</label>
        <input
          type="text"
          placeholder="Type Email"
          className="mt-1 w-full border rounded px-3 py-2"
        />

        <div>
          <label className="block text-sm font-medium my-1">Role</label>
          <select className="mt-1 border rounded px-3 py-2 w-full">
            <option className="text-black">Admin</option>
            <option className="text-black">Manager</option>
            <option className="text-black">Employee</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium my-1">Status</label>
          <select className="mt-1 border rounded px-3 py-2 w-full">
            <option className="text-black">Active</option>
            <option className="text-black">Inactive</option>
          </select>
        </div>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        
      </form>
    </div>
  );
};

export default Modal;

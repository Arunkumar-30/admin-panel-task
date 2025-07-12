import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../servies/userapi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaEye, FaTrashAlt, FaFileExcel } from "react-icons/fa";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login.");
        return;
      }
      const res = await getUsers(token);
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("Error loading users.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login.");
        return;
      }
      await deleteUser(id, token);
      loadUsers();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Error deleting user.");
    }
  };

  const handleView = (user: User) => {
    alert(
      `User Details:\n\nID: ${user.id}\nName: ${user.name}\nEmail: ${user.email}`
    );
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "users.xlsx");
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-blue-700 font-semibold">User List</h2>
        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow"
        >
          <FaFileExcel /> Download Excel
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2 text-center space-x-3">
                  <button
                    onClick={() => handleView(u)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <FaEye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          to="/"
          className="flex items-center gap-2 bg-gray-900  text-white font-medium py-2 px-4 rounded-md shadow"
        >
          back to login
        </Link>
      </div>
    </div>
  );
}

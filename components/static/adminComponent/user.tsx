"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface User {
  _id: string;
  username: string;
  phoneNumber: string;
  role: string;
}
interface EditModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, newRole: string) => void;
}

export const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handleSaveRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/auth`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          id: userId,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        // Update users list
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/auth";
      return;
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/auth", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token")!,
        },
      });
      const data = await response.json();
      setUsers(data.users);

      setResponse(data.message);

      if (data.message === "Unauthorized") {
        window.location.href = "/";
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };
  if (response === "Unauthorized") {
    return (
      <div className="fixed inset-0 bg-black/5 z-50">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-600 border-t-transparent" />
          <p className="text-gray-50 animate-pulse">
            در حال بارگذاری کاربران...
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/5 z-50">
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-600 border-t-transparent" />
          <p className="text-gray-50 animate-pulse">
            در حال بارگذاری کاربران...
          </p>
        </div>
      </div>
    );
  }
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm)
  );
  return (
    <div className="p-6 mt-28">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجو بر اساس نام کاربری یا شماره تلفن..."
            className="w-full p-3 pr-10 rounded-lg border focus:outline-none focus:border-rose-500"
            value={searchTerm}
            dir="rtl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow rounded" dir="rtl">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 text-right">نام کاربری</th>
              <th className="px-4 py-2 text-right">شماره تلفن</th>
              <th className="px-4 py-2 text-right">نقش</th>
              <th className="px-4 py-2 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.phoneNumber}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditModalOpen(true);
                    }}
                    className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-600 transition-colors"
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <EditModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          onSave={handleSaveRole}
        />
      )}
    </div>
  );
};
const EditModal: React.FC<EditModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [role, setRole] = useState(user.role);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96" dir="rtl">
        <h2 className="text-xl font-bold mb-4">ویرایش نقش کاربر</h2>
        <div className="mb-4">
          <p className="mb-2">نام کاربر: {user.username}</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="user">کاربر عادی</option>
            <option value="admin">ادمین</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            انصراف
          </button>
          <button
            onClick={() => {
              onSave(user._id, role);
              onClose();
            }}
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

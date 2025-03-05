import { ChangeEvent, FormEvent, useState } from "react";

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string>("نام_کاربری_فعلی");
  const [phoneNumber, setPhoneNumber] = useState<string>("123-456-7890");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("اطلاعات به‌روز شده:", { username, phoneNumber });
    alert("پروفایل با موفقیت به‌روز شد!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">بروزرسانی پروفایل</h2>
      <form
        onSubmit={handleSubmit}
        className="md:mx-24 bg-white p-6 shadow rounded"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            نام کاربری
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            className="w-full border px-3 py-2 text-black/70 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
            شماره تلفن
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            className="w-full border px-3 py-2 rounded text-black/70 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          بروزرسانی
        </button>
      </form>
    </div>
  );
};

export default Profile;

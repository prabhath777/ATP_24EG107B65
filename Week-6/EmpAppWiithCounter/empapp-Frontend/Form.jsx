import { useForm } from "react-hook-form"
import { useState } from "react";

export default function FormDemo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = useState([]);

  const onSubmit = (data) => {
    setUsers((prev) => [...prev, data]); // store data
    reset(); // clear form
  };

  return (
    
    <div className="bg-blue-200">
    <div className="max-w-2xl mx-auto mt-10 ">
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4">User Form</h2>

        {/* Username */}
        <div className="mb-4">
          <input
            placeholder="Username"
            className="border w-full p-2 rounded"
            {...register("username", {
              required: "Username required",
              minLength: { value: 6, message: "Min 6 chars" },
            })}
          />
          <p className="text-red-500 text-sm">
            {errors.username?.message}
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="border w-full p-2 rounded"
            {...register("email", {
              required: "Email required",
            })}
          />
          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>

      {/* TABLE */}
      {users.length > 0 && (
        <div className="mt-8 bg-amber-400">
          <h2 className="text-lg font-semibold mb-2">Submitted Data</h2>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}
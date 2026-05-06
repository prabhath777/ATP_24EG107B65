import { useLocation } from "react-router"
import { motion } from "framer-motion";
import { useState } from "react";
import TiltCard from "./TiltCard";
import Counter from "./Counter"

// function Employees() {
//  const {state} = useLocation()
//  console.log(state)
// }

// export default Employees
// import { useLocation } from "react-router";

function Employees() {
  const { state } = useLocation();

  if (!state) {
    return <p className="text-center mt-10">No data available</p>;
  }

  return (
    <div className="space-y-8">
      <TiltCard className="max-w-3xl mx-auto mt-10 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-3xl mx-auto mt-10 p-6"
      >
        {/* 🔹 Main Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold">{state.name}</h1>
            <p className="text-gray-500">
              {state.companyName || state.companyname}
            </p>
          </motion.div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Contact Info */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 p-4 rounded-xl"
            >
              <h2 className="text-lg font-semibold mb-2">Contact Info</h2>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {state.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Mobile:</span> {state.mobile}
              </p>
            </motion.div>

            {/* Company Info */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 p-4 rounded-xl"
            >
              <h2 className="text-lg font-semibold mb-2">Company Info</h2>
              <p className="text-gray-700">
                <span className="font-medium">Company:</span>{" "}
                {state.companyName || state.companyname}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Employee ID:</span> {state._id}
              </p>
            </motion.div>

          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500"
            >
              Edit
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </motion.button>
          </div>

        </motion.div>
      </motion.div>
      </TiltCard>

      {/* Counter Demo on Employees Page */}
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📊 Counter (Employees Page)</h2>
        <Counter />
      </div>
    </div>
  );
}

export default Employees;
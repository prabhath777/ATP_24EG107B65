import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"

import axios from "axios"
import Counter from "./Counter"


function EditEmp() {
    const {register, handleSubmit, formState: { errors }, setValue} = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {state} = useLocation()

    console.log(state)

    useEffect(() => {
        if (state) {
            setValue("name", state.name)
            setValue("email", state.email)
            setValue("mobile", state.mobile)
            setValue("companyname", state.companyName || state.companyname)
        }
    }, [state, setValue])

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            await axios.put(`http://localhost:1005/edit/${state._id}`, data)
            console.log("Employee updated:", data)
            alert("Employee updated successfully!")
            navigate("/list")
        } catch (error) {
            console.error("Error:", error)
            alert("Failed to update employee. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="p-4 space-y-6">
            <div className="max-w-md mx-auto border-2 shadow-2xl rounded-4xl p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Edit Employee</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-2xl"
                            placeholder="Enter name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-2xl"
                            placeholder="Enter email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Mobile</label>
                        <input
                            {...register("mobile", {
                                required: "Mobile is required",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "Mobile must be 10 digits"
                                }
                            })}
                            type="tel"
                            className="w-full p-2 border border-gray-300 rounded-2xl"
                            placeholder="Enter mobile number"
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Company Name</label>
                        <input
                            {...register("companyname", { required: "Company name is required" })}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-2xl"
                            placeholder="Enter company name"
                        />
                        {errors.companyname && <p className="text-red-500 text-sm">{errors.companyname.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-500 text-white p-2  hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-2xl"
                    >
                        {isLoading ? "Creating..." : "Edit"}
                    </button>
                </form>
            </div>

            {/* Counter Demo on Edit Page */}
            <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">📊 Counter (Edit Page)</h2>
                <Counter />
            </div>
        </div>
    )
}

export default EditEmp

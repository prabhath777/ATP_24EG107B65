import axios from 'axios';
import  { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import Counter from './Counter'


function List(){

    const[emps,setEmps] = useState([])
    const [deletingId, setDeletingId] = useState(null)
    const navigate = useNavigate();

    const gotoemp = (empObj) =>{

        navigate("/employees",{state:empObj})
    }
    const gotoedit = (empObj) =>{
        navigate("/edit-emp",{state:empObj})
    }
    const deleteEmp = async (id) => {
        try {
            setDeletingId(id);
            // Optimistically remove from UI immediately
            setEmps(prevEmps => prevEmps.filter(emp => emp._id !== id));
            
            const res = await axios.delete(`https://eems-app.onrender.com/remove/${id}`);
            
            if (res.status === 200) {
                console.log("Employee deleted successfully");
                // Data is already removed from UI, but let's refresh to ensure consistency
                getEmps();
            } else {
                // If delete failed, restore the employee in the UI
                console.error("Delete failed, restoring employee in UI");
                getEmps();
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
            // Restore the employee in UI on error
            getEmps();
            alert("Failed to delete employee. Please try again.");
        } finally {
            setDeletingId(null);
        }
    }
   
    async function getEmps() {
      let res = await fetch("https://eems-app.onrender.com/emps");
      if (res.status === 200) {
        let resObj = await res.json();
        setEmps(resObj.payload);
         console.log(resObj)
      }
    }
    

    useEffect(()=>{
        getEmps()
    },[])
 return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Your Employees</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {emps.map((empObj) => (
            <div key={empObj._id} className=" bg-white p-5">
             
              <div className="bg-white rounded-4xl border p-5 flex flex-col gap-2 hover:shadow-md transition">

    <h2 className="text-lg font-bold">{empObj.name}</h2>
    
    <p className="text-gray-600 text-sm">{empObj.email}</p>
   

    <div className="flex gap-2 mt-3">
      <button onClick={()=>gotoemp(empObj)} className="px-3 py-1 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600">
        View
      </button>
      
      <button  onClick={()=>gotoedit(empObj)} className="px-3 py-1 rounded-lg bg-yellow-400 text-white text-sm hover:bg-yellow-500">
        Edit
      </button>
      
      <button 
          onClick={()=>deleteEmp(empObj._id)} 
          disabled={deletingId === empObj._id}
          className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
          {deletingId === empObj._id ? "Deleting..." : "Delete"}
      </button>
    </div>

  </div>
            </div>
          ))}
        </div>
      </div>

      {/* Counter Demo on List Page */}
      <div className="max-w-md mx-auto">
        <Counter />
      </div>
    </div>
  );

}

export default List
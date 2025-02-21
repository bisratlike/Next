import { createUser, getUsers, updateUser, deleteUser } from "@/lib/actions";
import { useState, useEffect } from "react";


export default function Home() {
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    getUsers().then(setUsers);

  },[]);
  return (
   <div>
    <button onClick={()=> createUser("John Doe","john@example.com" )}> Add User</button>

    <ul>
      {users.map((user)=>(
        <li key={user.id}>{user.name}( {user.email} )<button onClick={()=> updateUser(user.id,user.name,user.email)}> Update</button> <button onClick={()=> deleteUser(user.id)}> Delete</button></li>))}
    </ul>
   </div>
  );
}

import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetAllBookingQuery } from "../../features/bookings/bookings";
import { useUserDeleteMutation } from "../../features/auth/auth";

const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const { data, isLoading, isError, error } = useGetAllBookingQuery();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setUsers(data.data);
    }
  }, [data, isLoading, isError, error]);
  const [deleteUser] = useUserDeleteMutation();

  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    if (res) {
      toast.success("Successfully delete user");
    }
  };

  // const [editUserData] = useEditUserDataMutation();

  // const handleUserEdit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     Name: name,
  //     Email: email,
  //     role: role,
  //   };
  //   console.log("info", userId);
  //   const res = await editUserData({ id: userId, data });
  //   if (res) {
  //     toast.success("Successfully update user");
  //   }
  // };

  return (
    <div className="overflow-x-auto table_container">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <h3 className="text-center">Loading...</h3>
          ) : users ? (
            users.map((user) => (
              <tr className="bg-base-200" key={user.User_ID}>
                <th>{user.User_ID}</th>

                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="4"
                        viewBox="0 0 128 512"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu rounded-box w-20 mt-(16) gap-2"
                    >
                      
                      <li>
                        <button
                          className="bg-white"
                          onClick={() => handleDelete(user.User_ID)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="14"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <h3 className="text-center">No user found</h3>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;

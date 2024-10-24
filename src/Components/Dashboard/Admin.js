import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDeleteRoomMutation, useGetAllRoomQuery, useUpdateRoomMutation, useCreateRoomMutation } from "../../features/rooms/rooms";

const Admin = () => {
  const [roomId, setRoomId] = useState('');
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [facilities, setFacilities] = useState("");
  const [showAddModal, setShowAddModal] = useState(false); // State to control the add modal visibility

  const facilitiesArray = facilities.split(',').map(facility => facility.trim());

  const { data, isLoading, isError, error } = useGetAllRoomQuery();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setRooms(data.data);
    }
  }, [data, isLoading, isError, error]);

  const [deleteRoom] = useDeleteRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [createRoom] = useCreateRoomMutation();

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Handle Room Creation
  const handleRoomCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("rent", rent);
    formData.append("picture", image);
    formData.append("facilities", JSON.stringify(facilitiesArray));

    try {
      const res = await createRoom(formData);
      if (res) {
        toast.success("Room successfully added");
        setTitle("");
        setRent("");
        setImage("");
        setFacilities("");
        setShowAddModal(false); // Close the modal after successful submission
      }
    } catch (error) {
      toast.error("Failed to add room");
      console.error("Error creating room:", error);
    }
  };

  // Handle Room Deletion
  const handleDelete = async (id) => {
    const res = await deleteRoom(id);
    if (res) {
      toast.success("Successfully deleted room");
    }
  };

  // Handle Room Edit
  const handleRoomEdit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      rent,
      picture: image,
      facilities: facilitiesArray
    };
    const res = await updateRoom({ id: roomId, data });
    if (res) {
      toast.success("Successfully updated room");
    }
  };

  return (
    <div className="overflow-x-auto table_container px-4 sm:px-6 lg:px-8">
      {/* Add Button */}
      <button 
        onClick={() => setShowAddModal(true)} 
        className="btn mb-4 bg-green-500 text-white hover:bg-green-600 mt-4"
      >
        Add Room
      </button>

      {/* Popup Form for Adding a Room */}
      {showAddModal && (
        <dialog 
          open 
          className="modal modal-bottom sm:modal-middle"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-2">Add New Room</h3>
            <form onSubmit={handleRoomCreate}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="input border border-black w-full mb-2"
                required
              />
              <input
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder="Rent"
                className="input border border-black w-full mb-2"
                required
              />
              <input
                type="text"
                value={facilities}
                onChange={(e) => setFacilities(e.target.value)}
                placeholder="Facilities (comma separated)"
                className="input mb-2 border border-black w-full"
                required
              />
              <input
                className="mt-2 block w-full"
                style={{ cursor: "pointer" }}
                accept="image/*"
                type="file"
                onChange={handleChange}
                required
              />
              <input className="btn mt-4 w-full bg-blue-500 text-white hover:bg-blue-600" type="submit" value="Submit" />
            </form>
            <div className="modal-action">
              <button 
                className="btn" 
                onClick={() => setShowAddModal(false)} // Close the modal
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Existing Room Details Table */}
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Rent</th>
            <th>Facilities</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <h3 className="text-center">Loading...</h3>
          ) : rooms.length > 0 ? (
            rooms.map((room) => (
              <tr className="bg-base-200" key={room._id}>
                <td>{room._id}</td>
                <td>{room.title}</td>
                <td><img src={`http://localhost:5000/${room.picture}`} alt="" width={100} height={100} /></td>
                <td>{room.rent}</td>
                <td>
                  <ul>
                    {room.facilities.map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="4" viewBox="0 0 128 512">
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu rounded-box w-20 mt-(16) gap-2">
                      <li>
                        <button
                          onClick={() => {
                            setRoomId(room._id);
                            document.getElementById("my_modal_5").showModal();
                          }}
                        >
                          Edit
                        </button>
                        <dialog
                          id="my_modal_5"
                          style={{ display: "flex", justifyContent: "center" }}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <h3 className="font-bold text-xl mb-2">Edit room info</h3>
                            <form onSubmit={handleRoomEdit}>
                              <input
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="input border border-black w-full mb-2"
                              />
                              <input
                                type="number"
                                onChange={(e) => setRent(e.target.value)}
                                placeholder="Rent"
                                className="input mb-2 border border-black w-full"
                              />
                              <input
                                type="text"
                                onChange={(e) => setFacilities(e.target.value)}
                                placeholder="Wifi, Fan, Aircondition"
                                className="input mb-2 border border-black w-full"
                              />
                              <input
                                className="mt-2"
                                style={{ cursor: "pointer" }}
                                accept="image/*"
                                type="file"
                                onChange={handleChange}
                              />
                              <input className="btn mt-4 border border-black" type="submit" value="Submit" />
                            </form>
                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </li>
                      <li>
                        <button className="bg-white" onClick={() => handleDelete(room._id)}>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <h3 className="text-center">No rooms found</h3>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;

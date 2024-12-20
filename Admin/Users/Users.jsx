// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Box,
//   Button,
//   Spinner,
//   Text,
//   Image,
//   Switch,
// } from "@chakra-ui/react";
// import { post } from "../../../middleware/api";
// import endpoints from "../../../middleware/endpoint";
// import UserDrawer from "./UserDrawer";
// import { BOLoading, TecButton } from "../../elements/elements";

// const Users = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modifiedFields, setModifiedFields] = useState({});
//   const [isDrawerOpen, setDrawerOpen] = useState(false);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await post(endpoints?.getallUserDetails, {});
//       setUserDetails(response);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setModifiedFields({});
//     setDrawerOpen(true);
//   };

//   const handleDelete = (id) => {
//     console.log(`Delete user with ID: ${id}`);
//   };

//   const handleToggle = (id) => {
//     setUserDetails((prevState) => {
//       const updatedData = prevState.data.data.map((user) =>
//         user.id === id ? { ...user, is_active: !user.is_active } : user
//       );
//       return {
//         ...prevState,
//         data: {
//           ...prevState.data,
//           data: updatedData,
//         },
//       };
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
//     setModifiedFields((prevFields) => ({ ...prevFields, [name]: value }));
//   };

//   const handleFormSubmit = async () => {
//     const payload = { uuid: selectedUser.uuid, ...modifiedFields };
//     try {
//       const response = await post(endpoints?.updateBussUserProfile, payload);
//       if (response.success) {
//         setUserDetails((prevState) => {
//           const updatedData = prevState.data.data.map((user) =>
//             user.id === selectedUser.id ? { ...user, ...modifiedFields } : user
//           );
//           return {
//             ...prevState,
//             data: {
//               ...prevState.data,
//               data: updatedData,
//             },
//           };
//         });
//         setDrawerOpen(false);
//       } else {
//         console.error("Failed to update user:", response.message);
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <Box p="6">
//       <Box overflowX="auto">
//         {userDetails?.data?.data?.length > 0 ? (
//           <Table variant="striped" colorScheme="gray" size="sm" minWidth="1000px">
//             <Thead>
//               <Tr>
//                 <Th>Profile</Th>
//                 <Th>Email</Th>
//                 <Th>Name</Th>
//                 <Th>Role</Th>
//                 <Th>isActive</Th>
//                 <Th>Login Type</Th>
//                 <Th>Email Verified</Th>
//                 <Th>Register Date</Th>
//                 <Th>Action</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {userDetails.data.data.map((user) => (
//                 <Tr key={user.id}>
//                   <Td>
//                     <Image
//                       boxSize="50px"
//                       borderRadius="full"
//                       src={user.profile_url || "https://via.placeholder.com/50"}
//                       alt="User Profile"
//                     />
//                   </Td>
//                   <Td>{user.bus_email}</Td>
//                   <Td>{`${user.first_name} ${user.last_name}`}</Td>
//                   <Td>{user.roles}</Td>
//                   <Td>
//                     <Switch
//                       isChecked={user.is_active}
//                       onChange={() => handleToggle(user.id)}
//                       colorScheme="teal"
//                     />
//                   </Td>
//                   <Td>{user.login_type}</Td>
//                   <Td>{user.email_verified ? "True" : "False"}</Td>
//                   <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
//                   <Td>
//                     {/* <TecButton size="sm" mr="2" className="tecSecondaryButton" onClick={() => handleEdit(user)}> Edit </TecButton>
//                     <TecButton size="sm" className="tecPrimaryButton" onClick={() => handleDelete(user.id)}> Delete </TecButton>
//  */}

//                     <Button colorScheme="blue" size="sm" mr="2" onClick={() => handleEdit(user)}>
//                       Edit
//                     </Button>
//                     <Button colorScheme="red" size="sm" onClick={() => handleDelete(user.id)}>
//                       Delete
//                     </Button>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         ) : (
//           <Box textAlign="center">
//             <BOLoading></BOLoading>
//           </Box>
//         )}
//       </Box>
//       <UserDrawer
//         isOpen={isDrawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         selectedUser={selectedUser}
//         handleFormChange={handleFormChange}
//         handleFormSubmit={handleFormSubmit}
//       />
//     </Box>
//   );
// };

// export default Users;











// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Box,
//   Button,
//   Spinner,
//   Text,
//   Image,
//   Switch,
// } from "@chakra-ui/react";
// import { post } from "../../../middleware/api";
// import endpoints from "../../../middleware/endpoint";
// import UserDrawer from "./UserDrawer";
// import { BOLoading, TecButton } from "../../elements/elements";

// const Users = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modifiedFields, setModifiedFields] = useState({});
//   const [isDrawerOpen, setDrawerOpen] = useState(false);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await post(endpoints?.getallUserDetails, {});
//       setUserDetails(response);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setModifiedFields({});
//     setDrawerOpen(true);
//   };

//   const handleDelete = (id) => {
//     console.log(`Delete user with ID: ${id}`);
//   };

//   const handleToggle = async (userId, currentStatus) => {
//     try {
//       // Toggle the 'is_active' status
//       const updatedStatus = !currentStatus;

//       // Send the toggle request to the endpoint
//       const response = await post(endpoints?.updateBussUserProfile, {
//         uuid: userId,
//         is_active: updatedStatus,
//       });

//       if (response.success) {
//         // If the update is successful, update the local state
//         setUserDetails((prevState) => {
//           const updatedData = prevState.data.data.map((user) =>
//             user.id === userId ? { ...user, is_active: updatedStatus } : user
//           );
//           return {
//             ...prevState,
//             data: {
//               ...prevState.data,
//               data: updatedData,
//             },
//           };
//         });
//       } else {
//         console.error("Failed to update isActive status:", response.message);
//       }
//     } catch (error) {
//       console.error("Error toggling user status:", error);
//     }
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
//     setModifiedFields((prevFields) => ({ ...prevFields, [name]: value }));
//   };

//   const handleFormSubmit = async () => {
//     const payload = { uuid: selectedUser.uuid, ...modifiedFields };
//     try {
//       const response = await post(endpoints?.updateBussUserProfile, payload);
//       if (response.success) {
//         setUserDetails((prevState) => {
//           const updatedData = prevState.data.data.map((user) =>
//             user.id === selectedUser.id ? { ...user, ...modifiedFields } : user
//           );
//           return {
//             ...prevState,
//             data: {
//               ...prevState.data,
//               data: updatedData,
//             },
//           };
//         });
//         setDrawerOpen(false);
//       } else {
//         console.error("Failed to update user:", response.message);
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <Box p="6">
//       <Box overflowX="auto">
//         {userDetails?.data?.data?.length > 0 ? (
//           <Table variant="striped" colorScheme="gray" size="sm" minWidth="1000px">
//             <Thead>
//               <Tr>
//                 <Th>Profile</Th>
//                 <Th>Email</Th>
//                 <Th>Name</Th>
//                 <Th>Role</Th>
//                 <Th>isActive</Th>
//                 <Th>Login Type</Th>
//                 <Th>Email Verified</Th>
//                 <Th>Register Date</Th>
//                 <Th>Action</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {userDetails.data.data.map((user) => (
//                 <Tr key={user.id}>
//                   <Td>
//                     <Image
//                       boxSize="50px"
//                       borderRadius="full"
//                       src={user.profile_url || "https://via.placeholder.com/50"}
//                       alt="User Profile"
//                     />
//                   </Td>
//                   <Td>{user.bus_email}</Td>
//                   <Td>{`${user.first_name} ${user.last_name}`}</Td>
//                   <Td>{user.roles}</Td>
//                   <Td>
//                     <Switch
//                       isChecked={user?.is_active}
//                       onChange={() => handleToggle(user.uuid, user.is_active)}
//                       colorScheme="teal"
//                     />
//                   </Td>
//                   <Td>{user.login_type}</Td>
//                   <Td>{user.email_verified ? "True" : "False"}</Td>
//                   <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
//                   <Td>
//                     <Button colorScheme="blue" size="sm" mr="2" onClick={() => handleEdit(user)}>
//                       Edit
//                     </Button>
//                     <Button colorScheme="red" size="sm" onClick={() => handleDelete(user.id)}>
//                       Delete
//                     </Button>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         ) : (
//           <Box textAlign="center">
//             <BOLoading></BOLoading>
//           </Box>
//         )}
//       </Box>
//       <UserDrawer
//         isOpen={isDrawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         selectedUser={selectedUser}
//         handleFormChange={handleFormChange}
//         handleFormSubmit={handleFormSubmit}
//       />
//     </Box>
//   );
// };

// export default Users;









import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Image,
  Switch,
} from "@chakra-ui/react";
import { post } from "../../../middleware/api";
import endpoints from "../../../middleware/endpoint";
import UserDrawer from "./UserDrawer";
import { BOLoading, TecButton } from "../../elements/elements";

const Users = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modifiedFields, setModifiedFields] = useState({});
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false); 
console.log('updateTrigger', updateTrigger)
  const fetchUserDetails = async () => {
    try {
      const response = await post(endpoints?.getallUserDetails, {});
      setUserDetails(response);
      console.log('response', response)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [updateTrigger]); 

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModifiedFields({});
    setDrawerOpen(true);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
  };


  const handleToggle = async (userId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      console.log("Updating status for user:", userId, "to", updatedStatus);
  
      const response = await post(endpoints?.updateBussUserProfile, {
        uuid: userId,
        is_active: updatedStatus,
      });
  
      console.log("API response:", response);
  
      if (response ) {
        setUserDetails((prevState) => {
          const updatedData = prevState.data.data.map((user) =>
            user.id === userId ? { ...user, is_active: updatedStatus } : user
          );
          return {
            ...prevState,
            data: {
              ...prevState.data,
              data: updatedData,
            },
          };
        });
        setUpdateTrigger((prev) => !prev); 
      } else {
        console.error("Failed to update isActive status:", response?.message || "No success message");
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({ ...prevUser, [name]: value }));
    setModifiedFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleFormSubmit = async () => {
    const payload = { uuid: selectedUser.uuid, ...modifiedFields };
    try {
      const response = await post(endpoints?.updateBussUserProfile, payload);
      if (response.status===200) {
        setUserDetails((prevState) => {
          const updatedData = prevState.data.data.map((user) =>
            user.id === selectedUser.id ? { ...user, ...modifiedFields } : user
          );
          return {
            ...prevState,
            data: {
              ...prevState.data,
              data: updatedData,
            },
          };
        });
        setDrawerOpen(false);
        setUpdateTrigger((prev) => !prev); 
      } else {
        console.error("Failed to update user:", response.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box p="6">
      <Box overflowX="auto">
        {userDetails?.data?.data?.length > 0 ? (
          <Table variant="striped" colorScheme="gray" size="sm" minWidth="1000px">
            <Thead>
              <Tr>
                <Th>Profile</Th>
                <Th>Email</Th>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>isActive</Th>
                <Th>Login Type</Th>
                <Th>Email Verified</Th>
                <Th>Register Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userDetails.data.data.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Image
                      boxSize="50px"
                      borderRadius="full"
                      src={user.profile_url || "https://via.placeholder.com/50"}
                      alt="User Profile"
                    />
                  </Td>
                  <Td>{user.bus_email}</Td>
                  <Td>{`${user.first_name} ${user.last_name}`}</Td>
                  <Td>{user.roles}</Td>
                  <Td>
                    <Switch
                      isChecked={user?.is_active}
                      onChange={() => handleToggle(user.uuid, user.is_active)}
                      colorScheme="teal"
                    />
                  </Td>
                  <Td>{user.login_type}</Td>
                  <Td>{user.email_verified ? "True" : "False"}</Td>
                  <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Button colorScheme="blue" size="sm" mr="2" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Box textAlign="center">
            <BOLoading></BOLoading>
          </Box>
        )}
      </Box>
      <UserDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedUser={selectedUser}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Users;

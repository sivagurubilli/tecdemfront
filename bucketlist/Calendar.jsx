// // import React from "react";
// // import { Calendar, momentLocalizer } from "react-big-calendar";
// // import moment from "moment";
// // import "react-big-calendar/lib/css/react-big-calendar.css";

// // const localizer = momentLocalizer(moment);

// // const MyCalendar = ({ sessions, onSelectSlot }) => {
// //   return (
// //     <div style={{ height: 500 }}>
// //       <Calendar
// //         localizer={localizer}
// //         startAccessor="start"
// //         endAccessor="end"
// //         selectable
// //         onSelectSlot={onSelectSlot}
// //       />
// //     </div>
// //   );
// // };

// // export default MyCalendar;

// import React, { useState } from "react";
// import moment from "moment";
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   useDisclosure,
// } from "@chakra-ui/react";

// const MyCalendar = () => {
//   const [startDate, setStartDate] = useState(moment().startOf("day"));
//   const [selectedDate, setSelectedDate] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [data, setData] = useState("");

//   const handleSelectSlot = ({ start }) => {
//     setSelectedDate(start);
//     onOpen();
//   };

//   const handleSave = () => {
//     localStorage.setItem("Queries", data);
//     setData("");
//   };

//   const handleCloseModal = () => {
//     setSelectedDate(null);
//     onClose();
//   };

//   const handleScroll = (direction) => {
//     const scrollAmount = 10; // Number of days to scroll
//     setStartDate(
//       direction === "left"
//         ? startDate.clone().subtract(scrollAmount, "days")
//         : startDate.clone().add(scrollAmount, "days")
//     );
//   };

//   const dates = [];

//   // Generate 10 consecutive dates starting from the current start date
//   for (let i = 0; i < 10; i++) {
//     dates.push(startDate.clone().add(i, "days"));
//   }

//   return (
//     <div
//       style={{
//         overflowX: "hidden",
//         whiteSpace: "nowrap",
//         position: "relative",
//         width: "750px",
//       }}
//     >
//       <button
//         onClick={() => handleScroll("left")}
//         style={{
//           position: "absolute",
//           left: "0",
//           top: "50%",
//           transform: "translateY(-50%)",
//           cursor: "pointer",
//           fontSize: "20px",

//           marginLeft: "10px",
//         }}
//       >
//         {"<"}
//       </button>
//       <div style={{ backgroundColor: "grey" }}>
//         {dates.map((date, index) => (
//           <div
//             key={index}
//             style={{
//               display: "inline-block",
//               padding: "10px",
//               cursor: "pointer",
//               borderBottom: "2px solid transparent",
//             }}
//             onClick={() =>
//               handleSelectSlot({ start: date.clone(), end: date.clone() })
//             }
//           >
//             {date.format("MMM DD")}
//           </div>
//         ))}
//         <button
//           onClick={() => handleScroll("right")}
//           style={{
//             position: "absolute",
//             right: "0",
//             top: "50%",
//             transform: "translateY(-50%)",
//             cursor: "pointer",
//             fontSize: "20px",

//             marginRight: "10px",
//           }}
//         >
//           {">"}
//         </button>
//       </div>
//       <Modal isOpen={isOpen} onClose={handleCloseModal}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add your Task</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Activity</FormLabel>
//               <Input
//                 placeholder="Add the Task"
//                 value={data}
//                 onChange={(e) => setData(e.target.value)}
//               />
//             </FormControl>

//             {/* <FormControl mt={4}>
//               <FormLabel>Last name</FormLabel>
//               <Input placeholder="Last name" />
//             </FormControl> */}
//           </ModalBody>

//           <ModalFooter>
//             <Button
//               colorScheme="blue"
//               mr={3}
//               onClick={() => {
//                 handleSave();
//               }}
//             >
//               Add to BucketList
//             </Button>
//             <Button onClick={handleCloseModal}>Mentors</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default MyCalendar;

// // import React, { useState } from "react";
// // import moment from "moment";
// // import {
// //   Button,
// //   FormControl,
// //   FormLabel,
// //   Input,
// //   Modal,
// //   ModalBody,
// //   ModalCloseButton,
// //   ModalContent,
// //   ModalFooter,
// //   ModalHeader,
// //   ModalOverlay,
// //   useDisclosure,
// // } from "@chakra-ui/react";

// // const MyCalendar = ({ onSelectSlot }) => {
// // const [selectedDate, setSelectedDate] = useState(null);
// //   const { isOpen, onOpen, onClose } = useDisclosure();

// //   const handleSelectSlot = ({ start }) => {
// //     setSelectedDate(start);
// //     onOpen();
// //   };

// //   const handleCloseModal = () => {
// //     setSelectedDate(null);
// //     onClose();
// //   };

// //   return (
// //     <div>
// //       <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
// //         {[...Array(10)].map((_, index) => (
// //           <div
// //             key={index}
// //             style={{
// //               display: "inline-block",
// //               padding: "10px",
// //               cursor: "pointer",
// //               borderBottom: "2px solid transparent",
// //             }}
// //             onClick={() =>
// //               handleSelectSlot({ start: moment().add(index, "days") })
// //             }
// //           >
// //             {moment().add(index, "days").format("MMM DD")}
// //           </div>
// //         ))}
// //       </div>
// //       <Modal isOpen={isOpen} onClose={handleCloseModal}>
// //         <ModalOverlay />
// //         <ModalContent>
// //           <ModalHeader>Create your account</ModalHeader>
// //           <ModalCloseButton />
// //           <ModalBody pb={6}>
// //             <FormControl>
// //               <FormLabel>First name</FormLabel>
// //               <Input placeholder="First name" />
// //             </FormControl>

// //             <FormControl mt={4}>
// //               <FormLabel>Last name</FormLabel>
// //               <Input placeholder="Last name" />
// //             </FormControl>
// //           </ModalBody>

// //           <ModalFooter>
// //             <Button colorScheme="blue" mr={3}>
// //               Save
// //             </Button>
// //             <Button onClick={handleCloseModal}>Cancel</Button>
// //           </ModalFooter>
// //         </ModalContent>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default MyCalendar;

import React, { useRef, useEffect, useState } from "react";
import Calendar from "react-awesome-calendar";

function MyCalendar() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    // Simulated data for events
    const eventData = [
      {
        id: 1,
        color: "#fd3153",
        from: "2024-03-12T18:00:00+00:00",
        to: "2024-03-12T19:00:00+00:00",
        title: "This is an event",
      },
      {
        id: 2,
        color: "#1ccb9e",
        from: "2024-03-12T13:00:00+00:00",
        to: "2024-03-12T14:00:00+00:00",
        title: "This is another event",
      },
      {
        id: 3,
        color: "#3694DF",
        from: "2024-03-12T13:00:00+00:00",
        to: "2024-03-12T20:00:00+00:00",
        title: "This is also another event",
      },
    ];

    setEvents(eventData);
  }, []);

  const handleDayClick = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleTaskSubmit = () => {
    if (newTask.trim() !== "" && selectedDate && startTime && endTime) {
      const newEvent = {
        id: events.length + 1,
        color: "#000000",
        from: `${selectedDate}T${startTime}:00`,
        to: `${selectedDate}T${endTime}:00`,
        title: newTask,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setNewTask("");
      setStartTime("");
      setEndTime("");
    }
  };

  return (
    <div>
      <Calendar ref={calendarRef} events={events} onDayClick={handleDayClick} />
      {selectedDate && (
        <Popup
          selectedDate={selectedDate}
          newTask={newTask}
          startTime={startTime}
          endTime={endTime}
          onTaskChange={(e) => setNewTask(e.target.value)}
          onStartTimeChange={(e) => setStartTime(e.target.value)}
          onEndTimeChange={(e) => setEndTime(e.target.value)}
          onTaskSubmit={handleTaskSubmit}
        />
      )}
    </div>
  );
}

function Popup({
  selectedDate,
  newTask,
  startTime,
  endTime,
  onTaskChange,
  onStartTimeChange,
  onEndTimeChange,
  onTaskSubmit,
}) {
  return (
    <div className="popup">
      <h3>Add Task for {selectedDate}:</h3>
      <input
        type="text"
        value={newTask}
        onChange={onTaskChange}
        placeholder="Enter task description"
      />
      <input type="time" value={startTime} onChange={onStartTimeChange} />
      <input type="time" value={endTime} onChange={onEndTimeChange} />
      <button onClick={onTaskSubmit}>Add Task</button>
    </div>
  );
}

export default MyCalendar;

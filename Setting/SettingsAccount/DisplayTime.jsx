// // import React, { useState, useEffect } from "react";
// // import moment from "moment-timezone";

// // const DisplayTime = ({ selectedTimeZone }) => {
// //   const [time, setTime] = useState("");

// //   const updateTime = () => {
// //     const now = moment().tz(selectedTimeZone);
// //     setTime(now.format("MMMM D, YYYY h:mm:ss A"));
// //   };

// //   useEffect(() => {
// //     updateTime();
// //     const interval = setInterval(updateTime, 1000);
// //     return () => clearInterval(interval);
// //   }, [selectedTimeZone]);

// //   return (
// //     <div>
// //       <h3>Current Time in {selectedTimeZone}:</h3>
// //       <p>{time}</p>
// //     </div>
// //   );
// // };

// // export default DisplayTime;


import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const DisplayTime = ({ timeZone }) => {
  const [time, setTime] = useState("");

  const updateTime = (timeZone) => {
    const now = moment().tz(timeZone);
    setTime(now.format("MMMM D, YYYY h:mm:ss A"));
  };

  useEffect(() => {
    updateTime(timeZone);
    const interval = setInterval(() => updateTime(timeZone), 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <span>{time}</span>;
};

export default DisplayTime;




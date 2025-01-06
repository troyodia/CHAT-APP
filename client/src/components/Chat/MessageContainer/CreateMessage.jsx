import React from "react";

import dayjs from "dayjs";
function CreateMessage({ showDate, timeStamps, children }) {
  return (
    <div>
      <div>
        {showDate ? (
          <div className="flex justify-center text-lg  mb-6 mt-4 text-[#F5DEB3] ">
            {dayjs(timeStamps).format("dddd, MMMM D")}
          </div>
        ) : (
          ""
        )}
      </div>
      {children}
    </div>
  );
}
export default React.memo(CreateMessage);

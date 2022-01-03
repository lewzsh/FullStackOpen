import React from "react";

const Notification = ({ message }) => {
    if (message[0] === null) {
        return null
    }

    return (
        <div className={`msg ${message[1]}`}>
            {console.log(`msg ${message[1]}`)}
            {message[0]}
        </div>
    )
}

export default Notification
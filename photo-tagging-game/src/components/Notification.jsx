import React, { useEffect } from 'react';
import '../App.css'

const Notification = ({ notification, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 1000); // Auto-close the notification after 3 seconds

        return () => {
            clearTimeout(timer); // Cleanup the timer when the component is unmounted
        };
    }, [onClose]);

    return (
        // <div className="notification">
        //   <p>{message}</p>
        // </div>

        // <div className={`notification ${notification ? '' : 'hidden'}`}>
        //     <p>{notification && notification.message}</p>
        // </div>

        <div className={`notification ${notification ? '' : 'hidden'} ${notification?.slideOut ? 'slide-out' : ''}`}>
            {notification && <p>{notification.message}</p>}
        </div>

    );
};

export default Notification;

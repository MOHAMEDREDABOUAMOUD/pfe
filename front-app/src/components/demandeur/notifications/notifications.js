import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import './notifications.css';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    // const addNotification = () => {
    //     const newNotification = `New notification at ${new Date().toLocaleTimeString()}`+"\n  testttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttt";
    //     setNotifications([...notifications, newNotification]);
    // };

    const getNotifications = async () => {
        try {
          const response = await axios.post("/getNotifications", { id: 1 });
          return response.data;
        } catch (error) {
          console.error(error);
          return [];
        }
      };
    
      const getRows = async () => {
        const u = await getNotifications();
        console.log(u);
        if (u != null) {
          setNotifications(u);
        }
        else setNotifications([]);
      };
    
      useEffect(() => {
        getRows();
      }, []);

    return (
        <div className="cont">
            <div className="conte">
                <h1>Notifications</h1>
                {/* <Button variant="primary" onClick={addNotification}>Add Notification</Button> */}
                <div className="mt-4">
                    {notifications.map((notification, index) => (
                        <Alert key={index} variant="success" className="mb-2 alert">
                            {notification}
                        </Alert>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;

"use client"

import Pusher from 'pusher-js';
import React, { useEffect, useState} from 'react';

const app_id = "1731462"
const key = "487e489a938f24c744ac"
const secret = "790829dd69f5cd8ccd2b"
const cluster = "mt1"

const Notifications = () => {
    const pusher = new Pusher(key, {
        cluster: cluster,
    });
    const [notifications, setNotifications] = useState<any[]>([]);
  
    useEffect(() => {
      const channel = pusher.subscribe('test-channel');
  
      channel.bind('wild', (data: any) => {
        console.log(data);
        setNotifications([...notifications, data]);
      });
  
      return () => {
        pusher.unsubscribe('wild');
      };
    }, [notifications]);
  
    return (
      <div>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((item: any, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Notifications;
  


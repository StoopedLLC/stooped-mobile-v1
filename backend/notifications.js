/*
this file contains the notification service and related functions.
It contains the following methods:
    - scheduleNotification: schedule a notification
    - cancelNotification: cancel a notification
*/

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


export const scheduleNotification = async (title, body, time, data) => {
    /*
        This function schedules a notification.

        @params:
            title: the title of the notification
            body: the body of the notification
            time: the time to schedule the notification
            TODO: link: the link to open when the notification is clicked

        @return:
            the id of the notification

    */

    const token = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: data,
        },
        trigger: time,
    });

    return token;
}

export const cancelNotification = async (id) => {
    /*
        This function cancels a notification.

        @params:
            id: the id of the notification to cancel

    */
    await Notifications.cancelScheduledNotificationAsync(id);
}
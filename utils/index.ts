import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.APP_ID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: process.env.CLUSTER!,
});

export async function notificationHandler(type: 'deadline' | 'reply', zone: 'one-day' | 'one-hour' | 'reply', target:string, userId: string) {
  //TODO create actual notif column

  const response = await pusher.trigger(type, `${zone}-${userId}`, {
    message: notificationParser(type, zone, target),
    time: new Date(),
  });

}

async function notificationParser(type: 'deadline' | 'reply', zone: 'one-day' | 'one-hour' | 'reply', target: string) {
    if(type == 'deadline') {
        if(zone == 'one-day') {
            return `Heads up! ${target} is due in ONE day!`;
        } else {
            return `Heads up! ${target} is due in ONE hour!`;
        }
    } else {
        return "You have a new reply to a thread you're active in!"
    }
}

export const getCurrentDateTimeString = (): string => {
    const now: Date = new Date();
    const dateTimeString: string = now.toISOString().replace('T', ' ').slice(0, 19);

    return dateTimeString;
};

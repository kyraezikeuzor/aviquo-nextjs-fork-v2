import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.APP_ID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: process.env.CLUSTER!,
});

export async function notificationHandler(
  type: "deadline" | "reply",
  zone: "one-day" | "one-hour" | "reply",
  target: string,
  userId: string
) {
  //TODO create actual notif column

  const response = await pusher.trigger(type, `${zone}-${userId}`, {
    message: notificationParser(type, zone, target),
    time: new Date(),
  });
}

async function notificationParser(
  type: "deadline" | "reply",
  zone: "one-day" | "one-hour" | "reply",
  target: string
) {
  if (type == "deadline") {
    if (zone == "one-day") {
      return `Heads up! ${target} is due in ONE day!`;
    } else {
      return `Heads up! ${target} is due in ONE hour!`;
    }
  } else {
    return "You have a new reply to a thread you're active in!";
  }
}

export const getCurrentDateTimeString = (): string => {
  const now: Date = new Date();
  const dateTimeString: string = now
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);

  return dateTimeString;
};

export const toDateTimeString = (date: Date): string => {
  const dateTimeString: string = date
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);

  return dateTimeString;
};

export function formatRelativeTime(dateString: string, forward: boolean): string | boolean {
  const currentDate = new Date();
  const givenDate = new Date(dateString);

  const suffix = forward ? 'left' : 'ago';

  const timeDifferenceInSeconds = Math.floor((forward ? -1 : 1) * (currentDate.getTime() - givenDate.getTime()) / 1000);

  console.log(timeDifferenceInSeconds)

  if(timeDifferenceInSeconds < 0) {
    return false
  }
  
  if (timeDifferenceInSeconds < 60) {
    return timeDifferenceInSeconds === 1 ? `1 second ${suffix}` : `${timeDifferenceInSeconds} seconds ${suffix}`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return minutes === 1 ? `1 minute ${suffix}` : `${minutes} minutes ${suffix}`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return hours === 1 ? `1 hour ${suffix}` : `${hours} hours ${suffix}`;
  } else {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return days === 1 ? `1 day ${suffix}` : `${days} days ${suffix}`;
  }
}
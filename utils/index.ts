// import * as Pusher from "pusher"

// export const sendNotif = () => {
//     const pusher = new Pusher({
//         appId: "APP_ID",
//         key: "APP_KEY",
//         secret: "SECRET_KEY",
//         useTLS: USE_TLS, // optional, defaults to false
//         cluster: "CLUSTER", // if `host` is present, it will override the `cluster` option.
//         host: "HOST", // optional, defaults to api.pusherapp.com
//         port: PORT, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
//         encryptionMasterKeyBase64: ENCRYPTION_MASTER_KEY, // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
//     })
      
// }

export const getCurrentDateTimeString = (): string => {
    const now: Date = new Date();
    const dateTimeString: string = now.toISOString().replace('T', ' ').slice(0, 19);

    return dateTimeString;
};

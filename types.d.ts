type Post = {
    "userId": number,
    "id": number,
    "title": string,
    "body": string,
    "views": number,
    "likes": number,
    "comments": number,
    "tags": string[]
}

type User = {
    "id":number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
        "street": string,
        "suite": string,
        "city": string,
        "zipcode": string,
        "geo": {
            "lat": string,
            "lng": string
        }
    }
}
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address:Object;
}

type Post = {
    userId: number,
    id: number,
    type: string,
    title: string,
    body: string,
    views: number,
    likes: number,
    comments: number,
    tags: any[],
    date:string,

}
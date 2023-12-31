
import { getPageSession } from '@/auth/lucia';
import Post from './post'

type Params = {
  params: {
    id: string;
  };
};

export default async function ViewPage({ params: { id } }: Params) {
    const user = (await getPageSession())?.user;

    return (
        <>
        <Post user={user} postId={id}></Post>
        </>
    )
}
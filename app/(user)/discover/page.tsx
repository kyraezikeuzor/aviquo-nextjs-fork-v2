import { getPageSession } from '@/auth/lucia';
import Discover from './discover';

export default async function ForumPage() {
    const user = (await getPageSession())?.user;
    // console.log(user);

    return (
        <Discover user={user}></Discover>
    )
}
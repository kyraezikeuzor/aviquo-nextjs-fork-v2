//here for getting user

import { getPageSession } from '@/auth/lucia';
import Forum from './forum';

export default async function ForumPage() {
    const user = (await getPageSession())?.user;
    console.log(user);

    return (
        <Forum user={user}></Forum>
    )
}
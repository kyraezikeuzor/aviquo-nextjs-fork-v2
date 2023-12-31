import { getPageSession } from '@/auth/lucia';
import Profile from './profile';
import Navbar from '@/components/Navbar';

export default async function ProfilePage() {
    const user = (await getPageSession())?.user;

    return (
        <>
        <Profile user={user}></Profile>
        </>
    )
}
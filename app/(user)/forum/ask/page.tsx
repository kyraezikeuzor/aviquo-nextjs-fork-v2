
import { getPageSession } from '@/auth/lucia';
import Ask from './ask';
import Navbar from '@/components/Navbar';

export default async function AskPage() {
    const user = (await getPageSession())?.user;
    
    return (
        <>
        <Ask user={user}></Ask>
        </>
    )
}
import auth from '@/utils/auth';
import { Button } from '../ui/button';

export default function LogoutButton() {

    return (
		<form action={auth.logOut} className='flex flex-row gap-5'>
			<Button variant='outline'>Log out</Button>
		</form>
	);
}
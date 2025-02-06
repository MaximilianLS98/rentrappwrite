import auth from '@/utils/auth';
import { Button } from '../ui/button';

export default function LogoutButton() {

    return (
		<form action={auth.logOut}>
			<Button className='rounded' variant='outline'>Log out</Button>
		</form>
	);
}
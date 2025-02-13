import { verifyAccount } from "@/actions/verification";

type Props = {
    searchParams: {
        secret: string,
        userId: string,
        expire: string,
    }
}

export default async function Page(props: Props) {
    const { secret, userId, expire } = await props.searchParams;

    const response = await verifyAccount(userId, secret);

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-5xl'>Verify Account</h1>
            <p>Secret: {secret}</p>
            <p>userId: {userId}</p>
            <p>Expires: {expire}</p>
            {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
        </div>
    )
}

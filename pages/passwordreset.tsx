import Head from 'next/head';
import PasswordReset from '../components/PasswordReset';


export default function PasswordResetPage() {
    return (
        <>
            <Head>
                <title>Final Show - Reset Password</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex items-center justify-center'>
                <PasswordReset />
            </div>
        </>
    );
}

import Head from 'next/head';
import ResetForm from '../components/ResetForm';


export default function Reset() {
    return (
        <>
            <Head>
                <title>Final Show - Reset Password</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex items-center justify-center'>
                <ResetForm />
            </div>
        </>
    );
}

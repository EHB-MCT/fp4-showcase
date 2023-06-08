import Head from 'next/head';
import UnderConstruction from '../../components/UnderConstruction';
import UploadProjectForm from '../../components/UploadProjectForm';

export default function Upload() {
    return (
        <>
            <Head>
                <title>Final Show - Upload Project</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
            </Head>
           
            <div className='flex items-center justify-center'>
            <UploadProjectForm/>
            </div>
          
        </>
    );
}

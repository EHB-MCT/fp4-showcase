import EditProjectForm from "@/components/EditProjectForm";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import ButtonPink from "@/components/ButtonPink";



const edit = () => {
    const router = useRouter();

    const { id } = router.query;

 
  return (
    <>
      <Head>
        <title>Final Show - Edit Project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <div className="absolute" style={{right:"2%", width:"25vw", top:"50%", position: "fixed"}} >
          <div className="bg-black bg-opacity-50 p-4 rounded shadow-lg h-5">
            <h2>Info</h2>
            <ul >
              <li>- Updating the "other images" is currently under construction. Please check back later.</li>
              <li>- Please find and select your preview image again.</li>
            </ul>
           
          </div>
        </div>
   
      
      <div className="flex items-center justify-center">
        <EditProjectForm projectId={id} />
      </div>
    </>
  );
};

export default edit;

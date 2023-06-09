import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import UnderConstruction from "../../components/UnderConstruction";
import UploadAwardForm from "../../components/UploadAwardForm";
import { useRouter } from "next/router";

const Upload = () => {
  const router = useRouter();
  // go back route
  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Final Show - Upload Award</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>

      <div className="flex items-center justify-center">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 w-auto absolute left-5"
          onClick={handleGoBack}
        >
          Go Back
        </button>
        <UploadAwardForm />
      </div>
    </>
  );
};

export default Upload;

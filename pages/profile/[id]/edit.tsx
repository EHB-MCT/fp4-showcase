import Head from "next/head";
import { useRouter } from "next/router";
import UnderConstruction from "../../../components/UnderConstruction";

export default function EditProfile() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>Final Show - Edit Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UnderConstruction />;
    </>
  );
}

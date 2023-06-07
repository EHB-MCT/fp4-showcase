import Head from 'next/head';
import { useRouter } from 'next/router';
import UnderConstruction from '../../components/UnderConstruction';

export default function EditProfile() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>Final Show - Profile {id}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-6 py-8 sm:p-10">
            <div className="flex items-center justify-center">
              <img
                className="h-20 w-20 rounded-full object-cover"
                src="/profile-picture.jpg"
                alt="Profile"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                <p className="text-gray-600">Frontend Developer</p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-800">About Me</h2>
              <p className="mt-2 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet ligula nec
                cursus posuere. Mauris id orci ut lectus semper dapibus.
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-800">Contact Information</h2>
              <dl className="mt-2 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-600">Email</dt>
                  <dd className="mt-1 text-gray-800">johndoe@example.com</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-600">Phone</dt>
                  <dd className="mt-1 text-gray-800">+1 555-123-4567</dd>
                </div>
              </dl>
            </div>
<div className="mt-8">
<h2 className="text-lg font-medium text-gray-800">Final work</h2>
              <ul className="">
                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                  <div className="flex-1 flex flex-col p-8">
                    <h3 className="text-gray-900 text-lg font-medium">Final work</h3>
                    <p className="mt-4 text-gray-500">Description of Final work</p>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <a
                      href="#"
                      className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View Details
                    </a>
                  </div>
                </li>
              </ul>
            </div>


            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-800">Projects</h2>
              <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                  <div className="flex-1 flex flex-col p-8">
                    <h3 className="text-gray-900 text-lg font-medium">Project 1</h3>
                    <p className="mt-4 text-gray-500">Description of Project 1</p>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <a
                      href="#"
                      className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View Details
                    </a>
                  </div>
                </li>
                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                  <div className="flex-1 flex flex-col p-8">
                    <h3 className="text-gray-900 text-lg font-medium">Project 2</h3>
                    <p className="mt-4 text-gray-500">Description of Project 2</p>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <a
                      href="#"
                      className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View Details
                    </a>
                  </div>
                </li>
                <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                  <div className="flex-1 flex flex-col p-8">
                    <h3 className="text-gray-900 text-lg font-medium">Project 3</h3>
                    <p className="mt-4 text-gray-500">Description of Project 3</p>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <a
                      href="#"
                      className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View Details
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
        </>
    );
}

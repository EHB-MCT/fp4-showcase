import Head from 'next/head';
import { useRouter } from 'next/router';
import UnderConstruction from '../../components/UnderConstruction';
import { CardGroup } from 'react-bootstrap';
import Card  from '../../components/ProjectCard';
import { useState } from 'react';

export default function EditProfile() {
const project =  {
  "id": 0,
  "title": "Next.js Website Development",
  "description": "Learn how to build dynamic websites using Next.js",
  "links": ["https://example.com/tutorial1", "https://example.com/tutorial2"],
  "cluster": "Web & App",
  "tags": ["React", "Frontend", "TypeScript"],
  "videoFile": "",
  "imageFiles": [
      "https://w7.pngwing.com/pngs/408/212/png-transparent-project-management-body-of-knowledge-project-management-professional-project-manager-management-project-miscellaneous-text-logo-thumbnail.png"
  ],
  "likeCount": 10,
  "user_id": 1
}

    const router = useRouter();
    const { id } = router.query;
    const likes = 42;
    const author = "John Doe";
    const title = "Amazing Artwork";
    const tags = ["Art", "Design", "Creativity"];
    const img = "https://via.placeholder.com/300";
    const backimg="https://w7.pngwing.com/pngs/408/212/png-transparent-project-management-body-of-knowledge-project-management-professional-project-manager-management-project-miscellaneous-text-logo-thumbnail.png";
   const pfp="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
   const [showMore, setShowMore] = useState(false);

   const toggleShowMore = () => {
     setShowMore(!showMore);
   };
   const [expanded, setExpanded] = useState(false);

   const toggleExpand = () => {
     setExpanded(!expanded);
   };

   return (
        <>
            <Head>
                <title>Final Show - Profile {id}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-gray-900 text-white" style={{ backgroundImage: 'url(https://i.etsystatic.com/34466454/r/il/bd263a/4597882244/il_fullxfull.4597882244_70jz.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className=" grid max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 container md:flex-row items-center justify-between">
    <div className="flex items-center">
      <img className="h-11 mr-2" src={img} alt="Logo" />
      <div>
        <h1 className="text-2xl font-bold">{author}</h1>
        <span className="text-sm">2022-2023</span>
      </div>
    </div>   
  </div>
  <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 container items-center justify-between">
  <div className="flex flex-wrap justify-center md:justify-start">
    <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="mr-4 mb-2">
      Insta
    </a>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="mr-4 mb-2">
      LinkedIn
    </a>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="mb-2">
      Website
    </a>
  </div>
  <div className="flex flex-wrap justify-center md:justify-end">
    <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="mr-4 mb-2">
      Award1
    </a>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="mr-4 mb-2">
      Award2
    </a>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="mb-2">
      Award3
    </a>
  </div>
</div> 
</div>
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
    <header>
    <div className="about-me">
      <h1 className="py-6 text-3xl font-bold mb-4 text-gray-800 flex items-center">
        About Me
      </h1>
      <p
        className={`initial-text h-10 overflow-hidden ${expanded ? 'h-auto' : ''}`}
      >
        A long description is a way to provide long alternative text for non-text elements, such as images. Generally, alternative text exceeding 250 characters, which cannot be made more concise without making it less descriptive or meaningful, should have a long description. Examples of suitable use of long descriptions are charts, graphs, maps, infographics, and other complex images.

        As with alternative text, long descriptions should be descriptive and meaningful. It should also include all text that is incorporated into the image. A long description should provide visually impaired users with as much information as sighted users would understand from the image.
      </p>
      <div className="flex justify-center" onClick={toggleExpand}>
        {expanded ? 'Read less' : 'Read more'}
      </div>
    </div>
</header>
<div>
<h1 className="py-6 text-3xl font-bold mb-4 text-gray-800 flex items-center">
    Final work
    <a href="../projects/upload" className="ml-2">
      <svg className="w-6 h-6 text-gray-500 hover:text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3C13 2.44772 12.5523 2 12 2Z" fill="currentColor"/>
      </svg>
    </a>
  </h1>
<div className="w-full rounded overflow-hidden shadow-lg bg-white relative">
  
      <div className="h-48 w-full overflow-hidden">
        <img className="w-full h-full object-cover" src={img} alt="Banner" />
      </div>
      <span className="absolute top-0 right-0 m-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
        {likes} Likes
      </span>
      <div className="px-6 py-4">
        <div className="mt-4">
          <p className="text-gray-700 font-bold text-xl">{author}</p>
          <p className="text-gray-600 text-lg">{title}</p>
        </div>
        <hr className="my-4" />
        <h3 className="text-lg font-medium text-gray-800">Tags</h3>
        <div className="flex flex-wrap mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="mr-2 mb-2 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
</div>





<div>
  <h1 className="py-6 text-3xl font-bold mb-4 text-gray-800">Other</h1>
  <Card project={project}/> 
</div>

</main>
        </>
    );
}

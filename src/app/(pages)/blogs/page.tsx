/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Footer from '@/app/components/global/Footer';
import Navbar from '@/app/components/global/Navbar';
import { useRouter } from 'next/navigation';
import React, { useState , useEffect} from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

const page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blogs, setBlogs] : any = useState<any>([])
  const [loading ,setLoading] = useState(false)
  
  const router = useRouter()
    useEffect(() => {
      const getBlogs = async () => {
        try {
          setLoading(true)
          const response = await fetch('/api/blogs');
          const data = await response.json();
          setBlogs(Array.isArray(data.data) ? data.data : []);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };
      getBlogs();
    }, []);

    console.log(blogs)


    const openBlog = (id: string) => {
      router.push(`/blog/${id}`);
     
    };
  return (
    <>
   <Navbar/>
    <div className="p-3 m-2 mt-20">
    
    {loading ? (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color={"#2563eb"} size={60} />
      </div>
    ) : (

   <><div className='flex flex-wrap justify-center w-full'>
              <h2 className='text-3xl font-sans font-bold'> Blogs</h2>
            </div>
            
            <div className="p-6 pt-1 grid grid-cols-1  mt-8 sm:grid-cols-2 md:grid-cols-3 gap-6" >
                    
                 {blogs.map((item: {
                   _id: string;
                   tableOfContent: any;
                   tags: any; id: React.Key | null; category: string; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; avatar: string | undefined; author: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; readTime: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
           }) => (
                   <div
                     key={item.id}
                     onClick={() => openBlog(item._id)}
                     className="bg-gray-50 rounded-lg  cursor-pointer  shadow-md p-5 hover:shadow-lg transition" 
                   
                   >
           
                             <div className=' flex gap-4 flex-wrap'>
                                    {item.tags.map((cat: string, index: React.Key | null | undefined) => (
                                                                   <span 
                                                                     key={index} 
                                                                     className="text-sm  bg-blue-100 text-blue-600 px-2 py-1 rounded"
                                                                   >
                                                                     {cat}
                                                                   </span>
                                                                 ))}
                                           </div>
                     <h3 className="mt-4 text-lg font-bold text-gray-800">{item.title}</h3>
                     <p className="mt-2 text-sm text-gray-600">{item.tableOfContent[0].description}</p>
                     <div className="flex items-center mt-4">
                   
                       <div>
                         <p className="text-sm font-semibold text-gray-800">  {item.author}</p>
                      
                       </div>
                     
                     </div>
                     <div>
                
               </div>
                   </div>
                 ))}
                
    
               {
                blogs.length <= 0 ? (< p className='text-center h-screen w-full mt-44'> not published any blog yet</p>) : (console.log("blogs "))
               }
              </div></>

  )}</div>
   
 <Footer/>
 </>
  )
}

export default page



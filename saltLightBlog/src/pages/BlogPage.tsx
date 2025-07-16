import { useParams } from '@tanstack/react-router';
import { useState,useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { usePostBySlug } from '../hooks/usePosts';
import { Line } from "../components/helper/Line"
import { Spinner } from "../components/helper/Spinner"

import { EllipsisVertical } from 'lucide-react'


// function onClickMenu(){}

export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString)

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}


function estimateReadingTime(content) {
    const words = content?.split(/\s+/).length || 0;
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute);
}

export default function BlogDetail() {

  const { slug } = useParams({ strict: false });;
  const [comment, setComment] = useState("");


  // FETCH DATA FROM HOOK:
  const { data: postInfo, isLoading, error } = usePostBySlug(slug);


  if (isLoading) return <Spinner/>
  if (error) return (
    <div className="py-12 sm:py-16 text-center px-4">
      <div className="text-gray-800 text-xl sm:text-2xl mb-3 sm:mb-4">✝</div>
      <p className="text-sm sm:text-base text-gray-600 mb-2">Unable to load posts at this time</p>
      <p className="text-xs sm:text-sm text-gray-500">Please try again later</p>
    </div>
  );

    console.log(postInfo)

    return (
        <>
            <div className="flex flex-col mx-auto lg:w-10/12 text-black">

                <div className="mt-16 ">
                    <div className="flex justify-between items-center px-3">
                        <div className="flex font-geist text-xs gap-2">
                            <div className="">{formatDate(postInfo.publishedAt)}</div>
                            <div className=""> &#183;</div>
                            <div className="">{estimateReadingTime(postInfo.content)} min read</div>
                        </div>
                        {/* ADD FUNCTIONAILTY */}
                        <EllipsisVertical />
                    </div>
                    <div className="mt-8 px-3">
                        <div className="font-poppins text-2xl">{postInfo.title}</div>
                        <div className="text-sm font-inter font-bold py-6">
                          {postInfo.summary}
                        </div>
                        <div className="">
                            <img src={postInfo.pageImage} alt="blog Image" className="h-52 md:h-[400px] lg:h-[500px] w-12/12"/>    
                        </div>  

                        {/*CONTENT*/}
                        <div className="prose prose-lg max-w-none mt-12 font-mont">
                            <ReactMarkdown
                              components={{
                                h1: ({ node, ...props }) => (
                                  <h1 className="text-2xl lg:text-3xl font-poppins  mb-4 " {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                  <h2 className="text-xl lg:text-2xl font-poppins  mt-10 mb-4 " {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                  <p className="text-gray-800 leading-relaxed text-base lg:text-lg font-nunito" {...props} />
                                ),
                                li: ({ node, ...props }) => (
                                  <li className="ml-4 list-disc text-base text-gray-700 font-nunito" {...props} />
                                ),
                                blockquote: ({ node, ...props }) => (
                                  <blockquote className="border-l-4 pl-4  text-gray-600 font-lora py-3 my-10" {...props} />
                                ),
                              }}
                            >
                              {postInfo.content}
                            </ReactMarkdown>
                        </div>
                   

                    </div>
                </div>

                {/*TAGS*/}
              

                {/*ADD TO THE RIGHT*/}

                {/*<div className="flex px-3 py-7">
                    <SocialLinks marginTop="mt-0" postion="start" width="w-5"/>      
                </div>*/}

                <div className="pb-10 my-8">
                    <Line/>
                </div>

                {/*TODO*/}
                {/*CAROUSEL POST */}
                {/*<Carousel categoryIds={blogInfo.blog_category_id}/>*/}

                {/*COMMENTS*/}
                <div className="py-40">
                     <div className="flex flex-col gap-6">
                        <Line />  
                        {/* SHOW NUM OF COMMENTS AND FORMAT PLURAL*/}
                        <div className="px-3 font-lora">{postInfo.comments.length} Comment{postInfo.comments.length > 1 ? 's' : '' }</div>
                        <Line/>
                    </div>
                    <div className="px-3 py-6"> 
                        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Your comment..." className="w-full px-3 py-2 border border-black focus:border-none focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none" >  
                        </textarea>
                    </div>
                    {/*TODO*/}
                    {/*<div className='flex flex-col gap-16 px-10'>
                        {blogInfo.comments.comments.map(comment=>{
                            return (
                                <Comment key={comment.comment_id} obj={comment}/>
                            )
                        })}
                    </div>*/}
                </div>
            </div>
        </>
    )
  
}


// import React, { useState } from 'react';
// import { Calendar, Clock, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';

// const BlogPage = () => {
//   // Sample markdown content - replace this with your API data
//   const [markdownContent] = useState(`# The Renewing Power of the Holy Spirit

// ## Introduction
// The Holy Spirit renews us from within, breathing life and hope into every believer's heart. This renewal is not just emotional—it is a spiritual transformation that touches every part of our lives. From the moment we surrender to Christ, the Holy Spirit begins a lifelong work of shaping us into His likeness. In a world filled with confusion and chaos, the Spirit provides clarity, peace, and power.

// ---

// ## Experience of Grace
// Acts 2 vividly shows how the Spirit came upon the disciples on the Day of Pentecost. As they gathered in obedience, a sound like a mighty wind filled the house, and tongues of fire rested on them. They were filled with the Holy Spirit and began speaking in different languages as the Spirit enabled them. 

// This was not only a miraculous sign but a moment of deep spiritual empowerment. These once fearful and uncertain men were transformed into bold preachers and witnesses. Peter, who had denied Jesus three times, stood up and preached a powerful sermon that led to the conversion of 3,000 souls. 

// The Spirit gave them courage, clarity, and conviction. That same Spirit continues to work today in all who believe.

// ---

// ## Modern Testimony
// Today, countless believers testify to the renewing power of the Holy Spirit in their daily lives. From healing broken marriages to breaking chains of addiction, the Spirit works quietly and powerfully. 

// - A young woman overwhelmed by anxiety finds peace through daily prayer and surrender to the Spirit.
// - A man struggling with anger begins to experience patience and self-control as he yields to the Spirit's leading.
// - Churches around the world report revivals not because of programs but because people have humbled themselves and allowed the Holy Spirit to move.

// The Spirit continues to convict, comfort, empower, and guide believers—transforming ordinary lives into powerful testimonies of God's grace.

// ---

// ## Conclusion
// Let the Spirit of God renew your heart, mind, and soul every day. Don't rely on yesterday's experience; seek a fresh encounter daily. Ask Him to fill you anew, to empower your witness, and to guide your steps.

// > The same Spirit that raised Jesus from the dead now lives in you. Embrace His presence, trust His work, and allow His renewal to shape your life into a vessel of glory for the Kingdom of God.`);

//   // Markdown renderer component
//   const MarkdownRenderer = ({ content }) => {
//     const processMarkdown = (text) => {
//       // Split content by lines
//       const lines = text.split('\n');
//       const elements = [];
//       let currentElement = '';
//       let elementType = 'p';
//       let listItems = [];
//       let inList = false;
//       let inBlockquote = false;
      
//       for (let i = 0; i < lines.length; i++) {
//         const line = lines[i];
        
//         // Handle horizontal rules
//         if (line.trim() === '---') {
//           if (currentElement.trim()) {
//             elements.push(createElement(elementType, currentElement.trim()));
//             currentElement = '';
//           }
//           if (inList) {
//             elements.push(createList(listItems));
//             listItems = [];
//             inList = false;
//           }
//           elements.push(<hr key={i} className="my-8 border-t-2 border-gradient-to-r from-transparent via-blue-500 to-transparent" />);
//           continue;
//         }
        
//         // Handle headings
//         if (line.startsWith('# ')) {
//           if (currentElement.trim()) {
//             elements.push(createElement(elementType, currentElement.trim()));
//             currentElement = '';
//           }
//           if (inList) {
//             elements.push(createList(listItems));
//             listItems = [];
//             inList = false;
//           }
//           elements.push(<h1 key={i} className="text-4xl font-bold mb-6 mt-8 text-gray-800 border-b-4 border-blue-500 pb-2">{line.substring(2)}</h1>);
//           continue;
//         }
        
//         if (line.startsWith('## ')) {
//           if (currentElement.trim()) {
//             elements.push(createElement(elementType, currentElement.trim()));
//             currentElement = '';
//           }
//           if (inList) {
//             elements.push(createList(listItems));
//             listItems = [];
//             inList = false;
//           }
//           elements.push(<h2 key={i} className="text-3xl font-semibold mb-4 mt-6 text-gray-700 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-blue-500 before:to-purple-600">{line.substring(3)}</h2>);
//           continue;
//         }
        
//         if (line.startsWith('### ')) {
//           if (currentElement.trim()) {
//             elements.push(createElement(elementType, currentElement.trim()));
//             currentElement = '';
//           }
//           if (inList) {
//             elements.push(createList(listItems));
//             listItems = [];
//             inList = false;
//           }
//           elements.push(<h3 key={i} className="text-2xl font-semibold mb-3 mt-5 text-gray-700">{line.substring(4)}</h3>);
//           continue;
//         }
        
//         // Handle blockquotes
//         if (line.startsWith('> ')) {
//           if (currentElement.trim()) {
//             elements.push(createElement(elementType, currentElement.trim()));
//             currentElement = '';
//           }
//           if (inList) {
//             elements.push(createList(listItems));
//             listItems = [];
//             inList = false;
//           }
//           elements.push(<blockquote key={i} className="my-6 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 italic text-lg text-gray-700 rounded-r-lg">{line.substring(2)}</blockquote>);
//           continue;
//         }
        
//         // Handle list items
//         if (line.startsWith('- ')) {
//           if (currentElement.trim()) {
//             elements.push(createElement(elementType, currentElement.trim()));
//             currentElement = '';
//           }
//           listItems.push(line.substring(2));
//           inList = true;
//           continue;
//         }
        
//         // Handle empty lines
//         if (line.trim() === '') {
//           if (currentElement.trim()) {
//             elements.push(createElement(elementType, currentElement.trim()));
//             currentElement = '';
//           }
//           if (inList) {
//             elements.push(createList(listItems));
//             listItems = [];
//             inList = false;
//           }
//           continue;
//         }
        
//         // Regular paragraph content
//         if (!inList) {
//           if (currentElement) {
//             currentElement += ' ';
//           }
//           currentElement += line;
//           elementType = 'p';
//         }
//       }
      
//       // Handle remaining content
//       if (currentElement.trim()) {
//         elements.push(createElement(elementType, currentElement.trim()));
//       }
//       if (inList) {
//         elements.push(createList(listItems));
//       }
      
//       return elements;
//     };
    
//     const createElement = (type, content) => {
//       const key = Math.random().toString(36).substring(7);
//       if (type === 'p') {
//         return <p key={key} className="mb-6 text-lg leading-relaxed text-gray-600 text-justify">{content}</p>;
//       }
//       return <div key={key}>{content}</div>;
//     };
    
//     const createList = (items) => {
//       const key = Math.random().toString(36).substring(7);
//       return (
//         <ul key={key} className="mb-6 space-y-2">
//           {items.map((item, index) => (
//             <li key={index} className="flex items-start">
//               <span className="text-blue-500 mr-3 mt-1">•</span>
//               <span className="text-lg text-gray-600">{item}</span>
//             </li>
//           ))}
//         </ul>
//       );
//     };
    
//     return <div className="prose max-w-none">{processMarkdown(content)}</div>;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl">
//         {/* Hero Section */}
//         <div className="relative h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
//           <div className="absolute inset-0 bg-black opacity-20"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center text-white z-10">
//               <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Spiritual Insights</h1>
//               <p className="text-xl opacity-90 italic">Discovering Truth in Daily Life</p>
//             </div>
//           </div>
//           {/* Decorative elements */}
//           <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
//           <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
//           <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
//         </div>

//         {/* Content */}
//         <div className="px-8 py-12">
//           {/* Blog Meta */}
//           <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
//                 JD
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
//                 <div className="flex items-center text-gray-600 text-sm space-x-4">
//                   <div className="flex items-center">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     <span>July 15, 2025</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="w-4 h-4 mr-1" />
//                     <span>5 min read</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Markdown Content */}
//           <div className="prose prose-lg max-w-none">
//             <MarkdownRenderer content={markdownContent} />
//           </div>

"use client";

import Image from 'next/image'
import styles from './page.module.css'


import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import SongList from '@/components/SongList';



  // try {
  //   const docRef = await addDoc(collection(db, "users"), {
  //     first: "Ada",
  //     last: "Lovelace",
  //     born: 1815
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  





export default function Home() {
  return (

    // <Html>
    //   <Head>
    //   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
    //   </Head>
    //   <body>
      <main>
    <div>
      
     
      <SongList/>
      
    </div>
    </main>
  

   
  )
}


'use client';

import firebase from 'firebase/app';


import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

import React from 'react';
import Header from '@/shared/Header/Header';
import EditSong from './EditSong';

import { FileAddOutlined,EditOutlined, DeleteOutlined } from '@ant-design/icons'
import BackShadow from './BackShadow/BackShadow';
import AddSong from './EditSong copy';

let songList = [
	{
		Date: "8 days ago",
		SongLink: "https://www.youtube.com/embed/hLlcabNjeFM?start=345&end=622&enablejsapi=1",
		SongName: "Randi Yehovanu Gurchi"
	},
	{
		Date: "8 days ago",
		SongLink: "https://www.youtube.com/embed/hLlcabNjeFM?start=640&end=1005&enablejsapi=1",
		SongName: "Jayamichina Devuniki"
	},
	{
		Date: "8 days ago",
		SongLink: "https://www.youtube.com/embed/mJvEcW1bfGQ?start=884&end=1244",
		SongName: "Geetham Geetham "
	},
	{
		Date: "8 days ago",
		SongLink: "https://www.youtube.com/embed/vBYw64oIdlI?start=2180&end=2657",
		SongName: "Jaya Prabhu  "
	},
]

const firebaseConfig = {
	apiKey: "AIzaSyBTXyCeyzAH6yNJcP6Uc2amkM1zK9bkdSw",
	authDomain: "testingapp-41f3b.firebaseapp.com",
	databaseURL: "https://testingapp-41f3b-default-rtdb.firebaseio.com",
	projectId: "testingapp-41f3b",
	storageBucket: "testingapp-41f3b.appspot.com",
	messagingSenderId: "334951218090",
	appId: "1:334951218090:web:74ccbf15748ff95ae8c9d3",
	measurementId: "G-YYR4MJE9PD"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

function Test(){

  const [songs,setSongs] = React.useState(songList);
  const [addMode,setAddMode] = React.useState(false);
  const [editMode,setEditMode] = React.useState(false);
  const [editSongItem,setSongItem] = React.useState({});
  const [isLoggedIn,setLoggedIn] = React.useState({});

  React.useEffect(()=>{
    fetchSongs();
    getInfo(); 
  },[])


  const addUser = ()=>{
    createUserWithEmailAndPassword(auth, "prabhuchira@gmail.com", "youngwolf@143")
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user,"USER")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  

  }


  const getInfo = ()=>{
    console.log("Get Info is clicked");
    console.log(auth.currentUser)
    
    
  }

  
  const signOut = async()=>{
    console.log("Sign out is clicked");
    await auth.signOut().then(res=>{
        console.log(res)
        setLoggedIn("")
    })

    
  }

  const loginUser = ()=>{
    console.log("Login  is clicked");
    signInWithEmailAndPassword(auth, "prabhuchira@gmail.com", "youngwolf@143")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user,"User after logged in")
    setLoggedIn(auth.currentUser)
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  }


  const addSong = async()=>{
    setAddMode(true);
  }

  const saveAddSong = async(item)=>{

    const myString = item.SongLink;

let newString = myString.replaceAll("youtu.be", "youtube.com/embed");
let part1=newString.split("?")
let part2 = part1[1].replace("t","start");

 newString = [part1[0],part2].join('?');
console.log(newString);
  
    await addDoc(collection(db,"songs"),{...item,SongLink:newString}).then(res=>{
        console.log(res.id,"Added Id")
        setAddMode(false);
        fetchSongs();
    }).catch(e=>{
      e ==  "FirebaseError: Missing or insufficient permissions." ? confirm("You should be logged in") : confirm("Error while adding song") 
      setAddMode(false)
    })
  }



  const deleteSong = async(id) => {
    console.log(id)
    try{
      let getConfirmation= confirm("Do you want to delete this song") 
      
      getConfirmation && await deleteDoc(doc(db, "songs", id)).then(res=>{
        fetchSongs()
      }).catch(e=>{
         console.log(e)
       });
    }
    catch(e){
      console.log(e,"ERROR")
    }

  }

  const editSong=(item)=>{
    console.log(item);
    setSongItem(item);
    setEditMode(true);

    
    // console.log(editSongId,"SONG ID")
    // console.log(item);
  }

  const saveEditSong= async(item,newBody)=>{
    console.log(item,"Item from saveEditSong")
    
      await setDoc(doc(db,"songs",item.id),newBody).then(res=>{
        console.log(res,"Successfully modified")
        setEditMode(false);
        fetchSongs();
      }).catch(e=>{
        console.log(typeof(e),"THE ERROR")
        String(e) ==  "FirebaseError: Missing or insufficient permissions" ? confirm("You should be logged in") : confirm("Error while saving song") 
        setEditMode(false)
        console.log(e,"WJAT")
      })
  
   
  }

  const closeEditMode = ()=>{
    setEditMode(false)
  }

  const closeAddMode = ()=>{
    setAddMode(false)
  }

	const fetchSongs = async()=>{
		await getDocs(collection(db,"songs")).then((querySnapshot)=>{
			const newData = querySnapshot.docs
			.map((doc) => ({...doc.data(), id:doc.id }));	
			setSongs(newData)
			console.log(newData,"NEW DATA")
	
		})
	}

    return (
  

                  <div>
                 
    {/* <button onClick={()=>addUser()}>Add User</button>
    <button onClick={()=>loginUser()}>Login User</button>
    <button onClick={()=>signOut()}>Sign out</button>
    <button onClick={()=>getInfo()}>Get Info</button>
    <button onClick={()=>addSong()}> Add Item</button> */}


      <Header signOut={signOut} signIn={loginUser} isLoggedIn={isLoggedIn}/>

      <br />
			<br />
			<br />
			<br />
		

    <div className=" custom_bg">
			
				<div className="container" >
					<div className="search_bar">
						<div className="d-flex  align-items-center justify-content-between w-100">
							<div className="mx-2 px-3 ">
								<h3 style={{ color: "white" }}>
									Worship 
								</h3>
                
								{/* <BreadCrumb/> */}
							</div>
              <div>
                 <button className="btn btn-primary d-flex align-items-center"
                 
                  onClick={addSong}
                 ><FileAddOutlined className="mx-2"></FileAddOutlined>Add Song</button> 
                </div>

						</div>
						
					</div>
				</div>
			</div>
    <div className='container'>
    <div className="row text-center" >
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    {
							songs.map(i => {

         return <div key={i.id} className="col-lg-5 ">
										<div className="m-3 song_item">

											<div className="my-3">
												<div className="mx-2 text-start h4 text-red song_title position-relative">{i.SongName} 
                        
                        <span className='deleteSong'>
                        <button className=' btn btn-primary mx-2' onClick={()=>editSong(i)} > <i class="bi bi-pencil-square"></i><EditOutlined className="align-middle" /> </button>
                        <button className=' btn btn-danger' onClick={()=>deleteSong(i.id)}><DeleteOutlined className='align-middle'></DeleteOutlined></button>
                        </span>
                         </div>
												<div className="mx-4  text-start text-uppercase sermon_speaker">LLC Choir</div>
											</div>
											{/* <iframe width={"500px"} height={"250px"}  src={i.yt_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
											<div className="frame-container" >
												<iframe className="responsive-iframe" src={i.SongLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
											</div>
											<br />
											<div className="d-flex justify-content-between align-items-center my-2">
												<div className="mx-3 text-start my-1 song_date" >
													{i.Date}<br />
													<div className="badge badge-pill  bg-light text-dark ">#praise</div>
												</div>
												<div className="mx-3 text-start my-1 song_date">
													<button className="btn btn-md view_youtube">&#9658; VIEW ON YOUTUBE</button>
												</div>
											</div>
										</div>
									</div>
              })
            }

    </div>
    </div>

    {editMode ? 
    <BackShadow>
      <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"100vh"
      }}>
      <div
        style={{
          backgroundColor:'white',
          width:"65%"
        }}
      >

        <EditSong item={editSongItem} closeEditMode={closeEditMode} saveEditSong={saveEditSong}/>
      </div>
      </div>
    </BackShadow>  :null}

    {addMode ? 
    <BackShadow>
      <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"100vh"
      }}>
      <div
        style={{
          backgroundColor:'white',
          width:"65%"
        }}
      >

        <AddSong  closeAddMode={closeAddMode} saveAddSong={saveAddSong}/>
      </div>
      </div>
    </BackShadow>  :null}
    </div>
    
    
 
    )
}


export default Test
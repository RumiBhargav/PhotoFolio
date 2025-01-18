import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { addDoc,collection ,Timestamp,updateDoc,doc} from 'firebase/firestore';
import { toast } from 'react-toastify';

import styles from "./AlbumForm.module.css";
 export const AlbumForm = ({setCreateActiveIntent,albumToUpdate,setAlbumToUpdate}) => {
  const [inputRef,setInputRef]=useState("");
  const[loading,setLoading]=useState(false);

   const handleSubmit=(e)=>{
    e.preventDefault();
    // remaining  function
    if(albumToUpdate){
      updateAlbum();
      setAlbumToUpdate(null);
             
    }else{
      addAlbum();
    }
    
  // console.log(inputRef);
   handleClear();
   setCreateActiveIntent(false);
 // setInputRef("");
 };
 const handleClear=()=>setInputRef("");

  const addAlbum= async()=> {
    setLoading(true);
    try {
      await addDoc(collection(db,"albums"),{
        name : inputRef,
        created:Timestamp.now()
      }) ;
      toast.success("Album created successfully ");
    } catch (error) {
     toast.error("Failed to create album");
    }
    finally{
      setLoading(false);
    }
   
 }
 const updateAlbum= async()=> {
  setLoading(true);
  try {
    await updateDoc(doc(db,"albums", albumToUpdate.id),{
      name : inputRef,
     updated:Timestamp.now()
    }) ;
    toast.success("Album updated successfully ");
  } catch (error) {
   toast.error("Failed to update  album");
  }
  finally{
    setLoading(false);
  }
 
}

 useEffect(()=>{
  if(albumToUpdate){
    setInputRef(albumToUpdate.name);
  }
 },[albumToUpdate]);

  return (
   
    // <div>
    //   <form onSubmit={onCreateAlbumName}>
    //   <span> Create Album </span>
    //   <br/>
    //   <input required placeholder='Enter an album name' onChange={(e)=> setInputRef(e.target.value) } value={inputRef}/>
    //   <br/>
    //   <span> <button onClick={()=>setInputRef("")}> Clear </button>
    //   <button type="submit"> Create </button></span>
    //   </form>
    // </div>
    <div className={styles.albumForm}>
       <span> {albumToUpdate?"Update":"Create"} an album</span>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Album Name" onChange={(e)=> setInputRef(e.target.value) } value={inputRef} />
        <button type="button" onClick={handleClear} disabled={loading}>
          Clear
        </button>
        <button disabled={loading}> {albumToUpdate?"Update":"Create"}</button>
      </form>
    </div>
  
  )
}



// import styles from "./albumForm.module.css";
// import { useRef } from "react";

// export const AlbumForm = ({loading }) => {
//   const albumNameInput = useRef();
// // function  to handle the clearing of the form
//   const handleClear = () =>{

//   };
// // function to handle the form submit
//   const handleSubmit = (e) => {
    

//   };

//   return (
//     <div className={styles.albumForm}>
//       <span>Create an album</span>
//       <form onSubmit={handleSubmit}>
//         <input required placeholder="Album Name" ref={albumNameInput} />
//         <button type="button" onClick={handleClear} disabled={loading}>
//           Clear
//         </button>
//         <button disabled={loading}>Create</button>
//       </form>
//     </div>
//   );
// };

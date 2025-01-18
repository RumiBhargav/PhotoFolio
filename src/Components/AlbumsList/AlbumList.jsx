import React, { useEffect, useState } from 'react'
import { AlbumForm } from '../AlbumForm/AlbumForm';
import styles from "./AlbumList.module.css";
import { db } from '../../firebase';
import { collection,onSnapshot ,getDocs, deleteDoc,doc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import ImageList from '../ImageList/ImageList';


 export const AlbumList = () => {
    const[albums , setAlbums]=useState([]);
  const [activeAlbum, setActiveAlbum]=useState(null);
  const [createActiveIntent, setCreateActiveIntent]=useState(false);
  const[albumToUpdate,setAlbumToUpdate]=useState(null);
  const onFormToggle= ()=>{
    if(createActiveIntent){
        setAlbumToUpdate(null);
    }
   setCreateActiveIntent(!createActiveIntent);

  }
       // create delete read 
      // real time updates
  const getData =  () => {
    const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

     setAlbums(albums);
      
    });
  };
  useEffect(()=>{
    getData();
  },[])
  
  const handleDelete= async(id)=>{
   await deleteDoc(doc(db,"albums",id));
 toast.error("Album deleted succesfully");
  }
// const handleClick=(name)=>{
//   setActiveAlbum(name);

// }
// useEffect(()=>{
//   handleClick();
// },[])

// local storage
// const getData = async () => {
//     const snapshot = await getDocs(collection(db, "albums"));
//     const albums = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//    setAlbums(albums);
//   };
//     useEffect(()=>{
//     getData();
//   },[])

 const handleUpdate=(album)=>{
    setAlbumToUpdate(album);
    setCreateActiveIntent(true);
 }
 const handleBack=()=>setActiveAlbum(null);
 

  return (
    <>
  
    {/* {!activeAlbum && <div> <h3> Your Album </h3>
        <button onClick={onFormToggle}> {createActiveIntent  ? "Cancel":"Add Album "} </button></div>} */}

        {!activeAlbum && createActiveIntent &&  (<AlbumForm setCreateActiveIntent={setCreateActiveIntent} albumToUpdate={albumToUpdate}  setAlbumToUpdate={setAlbumToUpdate}/>)}
        {!activeAlbum && (
        <div>
          <div className={styles.top}>
            <h3>Your albums</h3>
            <button
              className={`${createActiveIntent && styles.active}`}
              onClick={onFormToggle}
            >
              {!createActiveIntent ? "Add album" : "Cancel"}
            </button>
          </div>
          <div className={styles.albumsList}>
            {albums.map((album) => (
              <div
                key={album.id}
                className={styles.album}
                
              >
                <div  onClick={() => setActiveAlbum(album)} className={styles.imgContainer}> 
                <img src="/assets/photos.png" alt="images"   />
                </div>
                <span>{album.name}</span>
                <div className={styles.btnContainer}>
                    <button onClick={()=>handleDelete(album.id)}>Remove</button>
                     <button onClick={()=> handleUpdate(album)}>Update</button>
              </div>
              </div>
            ))}
          </div>
        </div>
      )}
      { activeAlbum && <ImageList  album={activeAlbum}  handleBack={handleBack} />}
        </>
       
  )
}

 

// rafceexport
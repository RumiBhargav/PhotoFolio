import React, { useEffect, useState } from "react";
import styles from "./ImageList.module.css";
import { IoArrowBackOutline } from "react-icons/io5";
import ImageForm from "../ImageForm/ImageForm";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import Carousel from "../Carousel/Carousel";

const ImageList = ({ album, handleBack }) => {
  const [formIntent, setFormIntent] = useState(false);
  const [images, setImages] = useState([]);
  const [activeHoverImageIndex, setActiveHoverImageIndex] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null);
  const [viewImage, setViewImage] = useState(null);

  const handleFormToggle = () => {
    if (formIntent) {
      setImageToUpdate(null);
    }
    setFormIntent(!formIntent);
  };
  const getData = () => {
    const unsub = onSnapshot(
      collection(db, "albums", album.id, "images"),
      (snapshot) => {
        const image = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setImages(image);
      }
    );
  };
  useEffect(() => {
    getData();
  }, []);

  // console.log(images);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "albums", album.id, "images", id));
      toast.success("Image deleted succesfully");
    } catch (e) {
      toast.error("Failed to  delete  image");
    }
  };
  const handleUpdate = (image) => {
    setImageToUpdate(image);
    setFormIntent(true);
  };

  // const image=()=>{

  // }
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length; // 1%4==1 // 2%4==2 // 3%4==3 4%4==0
    setCurrentIndex(nextIndex);
    setViewImage(images[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length; // 3+4%4==3 //2%4==2// 1%4==1// 
                                                                           // (0-1+4)%4==3
    setCurrentIndex(prevIndex);
    setViewImage(images[prevIndex]);
  };
  return (
    <>
      {/* <div>Images in {album.name}</div> */}

      {formIntent && (
        <ImageForm
          album={album}
          setImageToUpdate={setImageToUpdate}
          imageToUpdate={imageToUpdate}
          setFormIntent={setFormIntent}
        />
      )}
      <div className={styles.top}>
        <button onClick={handleBack} className={styles.back}>
          {/* <img src="/assets/back.png" alt="back" /> */}
          <IoArrowBackOutline />
          Back to Albums
        </button>
        <h3>Images in {album.name}</h3>
        <button
          className={`${formIntent && styles.active}`}
          onClick={handleFormToggle}
        >
          {!formIntent ? "Add image" : "Cancel"}
        </button>
      </div>

      <div className={styles.imageList}>
        {images.map((image, i) => (
          <div
            key={image.id}
            className={styles.image}
            onMouseOver={() => setActiveHoverImageIndex(i)}
            onMouseLeave={() => setActiveHoverImageIndex(null)}
            onClick={() => setViewImage(image)}
          >
            <div
              className={`${styles.update} ${
                activeHoverImageIndex === i && styles.active
              }`}
              onClick={() => handleUpdate(image)}
            >
              <img src="/assets/edit.png" alt="update" />
            </div>
            <div
              className={`${styles.delete} ${
                activeHoverImageIndex === i && styles.active
              }`}
              onClick={() => handleDelete(image.id)}
            >
              <img src="/assets/trash-bin.png" alt="delete" />
            </div>
            <img
              src={image.url}
              alt={image.title}
              onError={({ currentTarget }) => {
                currentTarget.src = "/assets/warning.png";
              }}
            />
            <span>{image.title.substring(0, 20)}</span>
          </div>
        ))}
      </div>
      {viewImage && (
        <Carousel
          image={viewImage}
          handleDeleteImage={handleDelete}
          handleClose={() => setViewImage(null)}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      )}
    </>
  );
};

export default ImageList;

// import { useState, useRef, useEffect } from "react";
// import Spinner from "react-spinner-material";
// import { ImageForm } from "../ImageForm/ImageForm";
// import { Carousel } from "../Carousel/Carousel";
// export const ImagesList = () => {

//   //These state and functions are create just for your convience you can create modify or delete the state as per your requirement.
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchIntent, setSearchIntent] = useState(false);
//   const searchInput = useRef();
//   // async function
//   const getImages = async () => {
//     const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
//       const albums = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));

//      setAlbums(albums);

//     });
//   };
//   useEffect(()=>{
//     getData();
//   },[])

//   const [addImageIntent, setAddImageIntent] = useState(false);
//   const [imgLoading, setImgLoading] = useState(false);
//   const [updateImageIntent, setUpdateImageIntent] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(null);
//   const [activeHoverImageIndex, setActiveHoverImageIndex] = useState(null);

//   // function to handle toggle next image
//   const handleNext = () => {
//   };
//   // function to handle toggle previous image
//   const handlePrev = () => {
//   };
//   // function to handle cancel
//   const handleCancel = () => {};
//   // function to handle search functionality for image
//   const handleSearchClick = () => {
//   };
//   // function to handle search functionality for image
//   const handleSearch = async () => {
//   };

//   // async functions
//   // const handleAdd = async () => {
//   // };
// //   const addAlbum= async()=> {
// //     setLoading(true);
// //     try {
// //       await addDoc(collection(db,"albums"),{
// //         name : inputRef,
// //         created:Timestamp.now()
// //       }) ;
// //       toast.success("Album created successfully ");
// //     } catch (error) {
// //      toast.error("Failed to create album");
// //     }
// //     finally{
// //       setLoading(false);
// //     }

// //  }
//   // function to handle update image
//   const handleUpdate = async ({ title, url }) => {
//     // imgLoading(true);
//     // try {
//     //   await updateDoc(doc(db,"albums", updateImageIntent.title, updateImageIntent.url),{
//     //     name : inputRef,
//     //    updated:Timestamp.now()
//     //   }) ;
//     //   toast.success("Album updated successfully ");
//     // } catch (error) {
//     //  toast.error("Failed to update  album");
//     // }
//     // finally{
//     //   setimgLoading(false);
//     // }

//   };
//   // function to handle delete image
//   const handleDelete = async (e, id) => {
//     // await deleteDoc(doc(db,"albums",id));
//     // toast.error("image deleted succesfully");
//   };

//   if (!images.length && !searchInput.current?.value && !loading) {
//     return (
//       <>
//         <div className={styles.top}>
//           <span onClick={onBack}>
//             <img src="/assets/back.png" alt="back" />
//           </span>
//           <h3>No images found in the album.</h3>
//           <button
//             className={`${addImageIntent && styles.active}`}
//             onClick={() => setAddImageIntent(!addImageIntent)}
//           >
//             {!addImageIntent ? "Add image" : "Cancel"}
//           </button>
//         </div>
//         {addImageIntent && (
//           <ImageForm
//             loading={imgLoading}
//             onAdd={handleAdd}
//             albumName={albumName}
//           />
//         )}
//       </>
//     );
//   }
//   return (
//     <>
//       {(addImageIntent || updateImageIntent) && (
//         <ImageForm
//           loading={imgLoading}
//           onAdd={handleAdd}
//           albumName={albumName}
//           onUpdate={handleUpdate}
//           updateIntent={updateImageIntent}
//         />
//       )}
//       {(activeImageIndex || activeImageIndex === 0) && (
//         <Carousel
//           title={images[activeImageIndex].title}
//           url={images[activeImageIndex].url}
//           onNext={handleNext}
//           onPrev={handlePrev}
//           onCancel={handleCancel}
//         />
//       )}
//       <div className={styles.top}>
//         <span onClick={onBack}>
//           <img src="/assets/back.png" alt="back" />
//         </span>
//         <h3>Images in {albumName}</h3>

//         <div className={styles.search}>
//           {searchIntent && (
//             <input
//               placeholder="Search..."
//               onChange={handleSearch}
//               ref={searchInput}
//               autoFocus={true}
//             />
//           )}
//           <img
//             onClick={handleSearchClick}
//             src={!searchIntent ? "/assets/search.png" : "/assets/clear.png"}
//             alt="clear"
//           />
//         </div>
//         {updateImageIntent && (
//           <button
//             className={styles.active}
//             onClick={() => setUpdateImageIntent(false)}
//           >
//             Cancel
//           </button>
//         )}
//         {!updateImageIntent && (
//           <button
//             className={`${addImageIntent && styles.active}`}
//             onClick={() => setAddImageIntent(!addImageIntent)}
//           >
//             {!addImageIntent ? "Add image" : "Cancel"}
//           </button>
//         )}
//       </div>
//       {loading && (
//         <div className={styles.loader}>
//           <Spinner color="#0077ff" />
//         </div>
//       )}
//       {!loading && (
//         <div className={styles.imageList}>
//           {images.map((image, i) => (
//             <div
//               key={image.id}
//               className={styles.image}
//               onMouseOver={() => setActiveHoverImageIndex(i)}
//               onMouseOut={() => setActiveHoverImageIndex(null)}
//               onClick={() => setActiveImageIndex(i)}
//             >
//               <div
//                 className={`${styles.update} ${
//                   activeHoverImageIndex === i && styles.active
//                 }`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setUpdateImageIntent(image);
//                 }}
//               >
//                 <img src="/assets/edit.png" alt="update" />
//               </div>
//               <div
//                 className={`${styles.delete} ${
//                   activeHoverImageIndex === i && styles.active
//                 }`}
//                 onClick={(e) => handleDelete(e, image.id)}
//               >
//                 <img src="/assets/trash-bin.png" alt="delete" />
//               </div>
//               <img
//                 src={image.url}
//                 alt={image.title}
//                 onError={({ currentTarget }) => {
//                   currentTarget.src = "/assets/warning.png";
//                 }}
//               />
//               <span>{image.title.substring(0, 20)}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

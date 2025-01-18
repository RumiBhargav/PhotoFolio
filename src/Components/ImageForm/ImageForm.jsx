import React, { useEffect, useState } from "react";
import styles from "./ImageForm.module.css";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  Timestamp,
 
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase";

const ImageForm = ({
  album,
  setImageToUpdate,
  imageToUpdate,
  setFormIntent,
}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addImage = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "albums", album.id, "images"), {
        title: title,
        url: imageUrl,
        created: Timestamp.now(),
      });
      toast.success(`Image added to ${album.name}`);
    } catch (error) {
      toast.error("Failed to add image");
    } finally {
      setLoading(false);
    }
  };
  const updateImage = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "albums", album.id, "images", imageToUpdate.id), {
        title: title,
        url: imageUrl,
        updated: Timestamp.now(),
      });
      toast.success(`Image updated to ${album.name}`);
    } catch (error) {
      toast.error("Failed to update image");
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
    setTitle("");
    setImageUrl("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageToUpdate) {
      updateImage();
      setImageToUpdate(null);
    } else {
      addImage();
    }

    handleClear();
    setFormIntent(false);
  };
  useEffect(() => {
    if (imageToUpdate) {
      setTitle(imageToUpdate.title);
      setImageUrl(imageToUpdate.url);
    }
  }, [imageToUpdate]);

  return (
    <div className={styles.imageForm}>
      <span> {imageToUpdate ? "Update":"Add"} image to {album.name}</span>

      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Enter Image Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          required
          placeholder="Enter Image Url or Upload a file "
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div className={styles.actions}>
          <button type="button" disabled={loading}>
            Clear
          </button>
          <button>{imageToUpdate ? "Update":"Add"} </button>
        </div>
      </form>
    </div>
    //   <div className={styles.imageForm}>
    //    <form>
    //      <h3>  Add a new Image </h3>
    //     <div>
    //      <input placeholder='Enter Image Title here'  required/>
    //      <input placeholder='Enter Image Url or Upload a file ' required/>
    //      </div>
    //    <span>

    //    <button> Clear </button>
    //    <button> Add </button>
    //    </span>
    //       </form>
    //  </div>
  );
};
export default ImageForm;




// import styles from "./imageForm.module.css";
// import { useEffect, useRef } from "react";

// export const ImageForm = () => {
//   //These state are create just for your convience you can create modify or delete the state as per your requirement.

//   const imageTitleInput = useRef();
//   const imageUrlInput = useRef();
//   // function to handle image form submit
//   const handleSubmit = (e) => {

//   };
// // function to thandle clearing the form
//   const handleClear = () => {

//   };
//   // function to prefill the value of the form input
//   const handleDefaultValues = () => {

//   };

//   return (
//     <div className={styles.imageForm}>
//       <span>
//         {!updateIntent
//           ? `Add image to ${albumName}`
//           : `Update image ${updateIntent.title}`}
//       </span>

//       <form onSubmit={handleSubmit}>
//         <input required placeholder="Title" ref={imageTitleInput} />
//         <input required placeholder="Image URL" ref={imageUrlInput} />
//         <div className={styles.actions}>
//           <button type="button" onClick={handleClear} disabled={loading}>
//             Clear
//           </button>
//           <button disabled={loading}>Add</button>
//         </div>
//       </form>
//     </div>
//   );
// };

import styles from "./App.module.css";

// components imports
import { Navbar } from "./Components/Navbar/Navbar";
import { AlbumList } from "./Components/AlbumsList/AlbumList";

// react toasts
 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 // import { toast } from "react-toastify";

function App() {
  return (
    <div className={styles.App}>
      <ToastContainer />
      <Navbar />
      <div className={styles.content}>
        <AlbumList />
      </div>
    </div>
  );
}

export default App;



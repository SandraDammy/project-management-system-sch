import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import noavatar from "../../../Assets/Image/noavatar.png";

const Navbar = () => {
  const [user, setUser] = useState(null);


  const userAvatar = user?.avatar || noavatar;
  const userName = user?.name || "Guest";
  const userEmail = user?.email || "guest@example.com";


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className={styles.container}>
      <img
        className={styles.userImage}
        src={noavatar}
        alt="No Avatar"
        // src={userAvatar}
        // alt={userName}
        width={50}
        height={50}
        priority={true}
      />
      <div className={styles.userDetail}>
        <span className={styles.username}>
          Guest
          {/* {userName} */}
        </span>
        <span className={styles.userMail}>
          guest@example.com
          {/* {userEmail} */}
        </span>
      </div>
    </div>
  );
};

export default Navbar;

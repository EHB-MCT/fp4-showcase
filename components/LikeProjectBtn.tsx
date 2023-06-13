import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import React from "react";
import styles from "../styles/likeProjectBtn.module.css";

const LikeProjectBtn = ({ project }) => {
  return (
    <div className={styles.likeBtnContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="51.221"
        height="46.962"
        viewBox="0 0 51.221 46.962"
      >
        <path
          id="Subtraction_3"
          data-name="Subtraction 3"
          d="M-1556.372-6166.279h0l-2.626-2.37c-3.374-3.088-6.341-5.891-8.818-8.332h22.889c-2.492,2.455-5.459,5.257-8.818,8.332l-2.626,2.37Zm15.378-14.7h-30.756a72.279,72.279,0,0,1-5.509-6.471,26.768,26.768,0,0,1-3.683-6.44,17.024,17.024,0,0,1-1.04-5.088h51.221a17.016,17.016,0,0,1-1.04,5.088,26.778,26.778,0,0,1-3.685,6.44,72.158,72.158,0,0,1-5.507,6.471Zm9.9-22h-50.564a12.861,12.861,0,0,1,3.531-6.384,13.023,13.023,0,0,1,4.332-2.906,13.909,13.909,0,0,1,5.245-.97,13.743,13.743,0,0,1,6.76,1.731,16.505,16.505,0,0,1,5.414,5,18.726,18.726,0,0,1,5.7-5.093,13.405,13.405,0,0,1,6.47-1.634,13.074,13.074,0,0,1,9.579,3.876,12.875,12.875,0,0,1,3.531,6.383Z"
          transform="translate(1581.983 6213.241)"
          fill="#ff1299"
        />
      </svg>

      <p>{project.likeCount}</p>
    </div>
  );
};

export default LikeProjectBtn;

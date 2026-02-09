// components/Loaders/NinjaStar.jsx
import React from "react";
import shurikenImage from "../../../../assets/icons/ninja-blade-3.png"; // Your PNG file
import "./styles.css";
import { useSelector } from "react-redux";

const NinjaStar = ({
  size = 60,
  speed = 1.1,
  text = "Loading...",
  shadow = true,
  showTrail = false,
}) => {
  const authLoading = useSelector((state) => state.user.authLoading);

  return (
    <>
      {authLoading ? (
        <div className="shuriken-loader-container">
          <div className="shuriken-wrapper">
            <img
              src={shurikenImage}
              alt="Loading shuriken"
              className="shuriken-img"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: `${speed}s`,
              }}
            />

            {showTrail && (
              <div className="spinning-trail">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="trail-dot"
                    style={{
                      "--dot-index": i,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NinjaStar;

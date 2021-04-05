import React from "react";
import cn from "classnames";
import useOnScreen from "../../hooks/use-on-screen";

import styles from "./LoadableImage.module.css";

const LoadableImage = (props) => {
  const { src, alt = "", onLoad = () => {} } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imageRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const isVisible = useOnScreen(containerRef);

  React.useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
        onLoad();
      };
    }
  }, [isVisible, onLoad, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, {
        [styles.containerLoaded]: isLoaded,
      })}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          className={cn(styles.image, {
            [styles.imageLoaded]: isLoaded,
          })}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export default LoadableImage;

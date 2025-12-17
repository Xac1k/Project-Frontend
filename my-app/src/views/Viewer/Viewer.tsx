import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/store";
import { SlideView } from "../PresentationMaker/workSpace/slide/Slide";
import { standartSlideSize } from "../../store/constant";
import styles from "./Viewer.module.css";
import { CancelIcon } from "./CancelIcon";
import { useNavigate } from "react-router-dom";
import { useBluetooth } from "../Bluetooth/bluetooth";

function getScale() {
  const size = { w: window.innerWidth, h: window.innerHeight };
  const scale = Math.min(size.w / standartSlideSize.w, size.h / standartSlideSize.h);
  return scale;
}

function Viewer() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [scale, setScale] = useState<number>(getScale());
  const slides = useAppSelector((state) => state.present.slides);
  const navigate = useNavigate();
  const [status, connectToDevice] = useBluetooth();

  const slideForShowing = useMemo(() => {
    return slides[currentSlide];
  }, [currentSlide]);

  useEffect(() => {
    const computeScale = () => setScale(getScale());

    window.addEventListener("resize", computeScale);
    return () => {
      window.removeEventListener("resize", computeScale);
    };
  }, [setScale]);

  useEffect(() => {
    const next = () => {
      if (currentSlide + 1 > slides.length - 1) {
        setCurrentSlide(0);
        return;
      }
      setCurrentSlide(currentSlide + 1);
    };

    const prev = () => {
      if (currentSlide - 1 < 0) {
        setCurrentSlide(slides.length - 1);
        return;
      }
      setCurrentSlide(currentSlide - 1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      console.log(currentSlide);
      switch (event.key) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [currentSlide]);

  const onCancel = () => {
    navigate("/Presentation-Maker");
  };

  const style: React.CSSProperties = {
    width: standartSlideSize.w * scale,
    height: standartSlideSize.h * scale,
  };

  return (
    <div className={styles.SlideShow}>
      <div className={styles.Slide} style={style}>
        <SlideView slide={slideForShowing} scale={scale} />
      </div>
      <CancelIcon className={styles.ExitBtn} onClick={onCancel} />
      <button onClick={connectToDevice}>{status}</button>
    </div>
  );
}

export { Viewer };

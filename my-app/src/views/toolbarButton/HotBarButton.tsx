import styles from "./HotBarButton.module.css";

type HotBarBtnMSG = {
  src: string;
  msg: string;
};

export default function HotBarBtn({ src, msg }: HotBarBtnMSG) {
  const hadlerOnClick = () => {
    console.log(msg);
  };
  return (
    <button className={styles.HotBarButton} onClick={hadlerOnClick}>
      <img
        src={src}
        alt="Картинка инструмента"
        className={styles.innerPicture}
      />
    </button>
  );
}

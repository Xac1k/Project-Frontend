import styles from './ToolbarButton.module.css';

type ToolbarBtnMSG = {
  src: string;
  onClickHandle: () => void
};

export default function ToolbarBtn({ src, onClickHandle }: ToolbarBtnMSG) {
  return (
    <button className={styles.ToolbarButton} onClick={onClickHandle}>
      <img
        src={src}
        alt='Картинка инструмента'
        className={styles.innerPicture}
      />
    </button>
  );
}

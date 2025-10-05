import styles from './ToolbarShow.module.css';

const base64Prefix: string = 'data:image/png;base64, ';
const playButtonURL: string =
  base64Prefix +
  'iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAAXNSR0IArs4c6QAAAaZJREFUWAnVmAtRAzEQhlcCEpCABCQgAQfFQXEADsAJEpBQCUigfJn+nQOS6zXZvHams51rk3z7yGZzZhPLjZntzezwo79P+sPMXszsfjS7Pk+QgMY+GPE2AvhjAjAGLa8ThdseHr/k1RQ0z5t6G++swWz9jTQhQlXlwQlWRlWFfnaGXULvvPP6vRLsEprN6CLUUk1cU7ukR0klyDGuCJrBOYuWjmHdq+t06aKl46nTm6FLF/MYvyk1aF48FvOag82e9LLX6eUFyzxfqZNwRFgZ/q82jwwLNJvvLKPDAkzzH2QGWIDDTWUW2FdcOwtsyN1ZYENTPwPsuYeYAZabTJDRYX/d6UbrDXR6Efo7eXSp9YdR9GozMwokHE9LL8a+4/LewFytomH/C9wTlnaQVwGbpfWFUVFczc0UfauruCCJZPYr1NovOQSpkFMus4WORhPW0qxRBCnrKBe1ILPyUmAx7f0WEcOBzM7LGKSeefYH1SAFiyb5S1KhCaSAWSwHtimkYK/ZZESB3U36dBHKyqVjFy9ilEsJKrUST3FAKH/RAuzmRRl1BMqCkW3W7CRzAAAAAElFTkSuQmCC';

type DemoBtnProps = {
  onClickHandle: () => void;
};

export default function ToolbarDemo({ onClickHandle }: DemoBtnProps) {
  return (
    <div className={styles.DemoButton} onClick={onClickHandle}>
      <img src={playButtonURL} className={styles.innerImage}></img>
      Слайд-шоу
    </div>
  );
}

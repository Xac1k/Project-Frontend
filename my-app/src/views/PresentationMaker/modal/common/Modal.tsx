import type { JSX } from "react";
import styles from "./../Modal.module.css";

type ModalHeaderProps = {
  children: JSX.Element;
};
function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <div className={styles.modalHeader}>
      <h2 className={styles.modaleTitle}>{children}</h2>
    </div>
  );
}

type ModalBodyProps = {
  children: JSX.Element;
};
function ModalBody({ children }: ModalBodyProps) {
  return <div className={styles.modalBody}>{children}</div>;
}

type ModalFooterProps = {
  children: JSX.Element;
};
function ModalFooter({ children }: ModalFooterProps) {
  return <div className={styles.modalFooter}>{children}</div>;
}

export { ModalHeader, ModalBody, ModalFooter };

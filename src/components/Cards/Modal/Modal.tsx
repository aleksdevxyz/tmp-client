import styles from "./index.module.scss";
import cn from "classnames";
import Form from "./Form";

const active = cn(styles.close, styles.overlay);
export default function Modal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  
  return (
    <div
      onClick={() => {
        setOpen(false);
      }}
      className={open ? styles.overlay : active}
    >
      <Form setOpen={setOpen}/>
    </div>
  );
}

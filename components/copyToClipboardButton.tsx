import React, { useState } from "react";
import { Button, Snackbar } from "@material-ui/core";
import styles from "../styles/Table.module.css";

type Props = {
  text: string;
};

const CopyToClipboardButton = (props: Props) => {
  const [open, setOpen] = useState(false);

  const copy = () => {
    setOpen(true);
    navigator.clipboard.writeText(props.text);
  };
  return (
    <>
      <div className={styles.copyToClipboardButton} onClick={copy}>
        {props.text}
      </div>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={1000}
        message="Copied to clipboard"
      />
    </>
  );
};

export default CopyToClipboardButton;

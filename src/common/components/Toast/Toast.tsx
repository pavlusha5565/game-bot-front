import { observer } from "mobx-react-lite";
import React from "react";
import { ToastContainer } from "react-bootstrap";
import { useStore } from "../../../stores/GlobalStoreContext";

function ToastComponent(): JSX.Element {
  const toast = useStore("ToastStore");

  return <ToastContainer></ToastContainer>;
}

export const Toast = observer(ToastComponent);

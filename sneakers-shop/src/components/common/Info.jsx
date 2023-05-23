import React, { useContext } from "react";
import { AppContext } from "../../App";
import s from "../CartDrawer/CartDrawer.module.scss";
import "macro-css";

const Info = ({ title, description, image }) => {
  const { setCartOpener } = useContext(AppContext);

  return (
    <div
      className={
        s.cartEmpty + " d-flex align-center justify-center flex-column flex"
      }
    >
      <img src={image} alt="Empty cart" width={120} />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className={s.greenButton} onClick={() => setCartOpener(false)}>
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;

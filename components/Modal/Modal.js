import { css } from "@emotion/css";

export default function Modal(props) {
  const { children, closeAction } = props;
  const modal = css`
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <div className={modal} onClick={closeAction}>
      {children}
    </div>
  );
}

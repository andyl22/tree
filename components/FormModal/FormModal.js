import Modal from "../Modal/Modal";
import { css } from "@emotion/css";

export default function FormModal(props) {
  const { children, modalTitle, submitAction, closeAction } = props;

  const formContainer = css`
    border-radius: 0.4rem;
    overflow: hidden;
  `;

  const header = css`
    position: relative;
    width: 100%;
    background: #e5e5e5;
    text-align: center;
    padding: 1rem;
  `;

  const headerCloseButton = css`
    padding: 0.1rem 0.3rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  `;

  const formContent = css`
    padding: 1rem;
    background: white;
    min-height: 100px;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `;

  const submitHandler = (e) => {
    e.preventDefault();
    submitAction();
    closeAction();
  };

  const modalHeader = (
    <div className={header}>
      <p>{modalTitle}</p>
      <button onClick={closeAction} className={headerCloseButton}>
        x
      </button>
    </div>
  );

  return (
    <Modal closeAction={closeAction}>
      <div className={formContainer} onClick={(e) => e.stopPropagation()}>
        {modalTitle ? modalHeader : null}
        <form className={formContent} onSubmit={submitHandler}>
          {children}
          <input
            type="submit"
            style={{ width: "fit-content", padding: ".1rem .5rem" }}
          />
        </form>
      </div>
    </Modal>
  );
}

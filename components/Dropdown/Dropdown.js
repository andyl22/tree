import { css } from "@emotion/css";
import { useEffect } from "react";

export default function Dropdown(props) {
  const { dropdownActions, hideDropdown } = props;

  const dropdownContainer = css`
    background: #f2f2f2;
    position: absolute;
    top: 0;
    left: 101%;
    padding: 0.5rem;
    border-radius: 0.2rem;
    z-index: 1;
    min-width: 100px;
  `;

  const actionContainer = css`
    border: 1px solid #cccccc;
    padding: 0.5rem;
    border-radius: 0.3rem;
    background: #ffffff;
    &:hover {
      cursor: pointer;
      background: #cccccc;
    }
  `;

  useEffect(() => {
    const listenerCallback = () => {
      console.log("click");
    };

    document.addEventListener("click", listenerCallback, { once: true });

    return () => document.removeEventListener("click", listenerCallback);
  }, []);

  const handleClick = (event) => {
    event();
    hideDropdown();
  };

  const mappedActions = dropdownActions.map((action) => (
    <div
      className={actionContainer}
      key={action.label}
      onClick={() => handleClick(action.event)}
    >
      <p>{action.label}</p>
    </div>
  ));

  return <div className={dropdownContainer}>{mappedActions}</div>;
}

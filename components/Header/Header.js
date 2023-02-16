import { css } from "@emotion/css";

export default function Header() {
  const headerStyle = css`
    font-size: 1.5rem;
  `;

  const header = css`
    padding: 1rem;
    background: #f2f2f2;
    border-bottom: 1px solid #b2b2b2;
    position: sticky;
    top: 0;
  `;

  return (
    <div className={header}>
      <h1 className={headerStyle}>Test!</h1>
    </div>
  );
}

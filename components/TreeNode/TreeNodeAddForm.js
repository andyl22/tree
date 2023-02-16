import { postHTTP } from "@/utilities/apiHelpers";
import { css } from "@emotion/css";
import FormModal from "../FormModal/FormModal";
import { useState } from "react";

export default function TreeNodeAddForm(props) {
  const { nodeParent, closeAction } = props;
  const [formState, setFormState] = useState({});

  const inputContainer = css`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    text-align: right;
    label {
      width: 100%;
    }
  `;

  const submitAction = async () => {
    const newNode = await postHTTP("/createNode", { value: formState.value });
    const updatedNode = await postHTTP("/updateNode", {
      nodeParent,
      newNode,
    });
    console.log(newNode, updatedNode);
  };

  const handleChange = (e) => {
    const key = e.target.id,
      value = e.target.value;
    setFormState({ ...formState, [key]: value });
  };

  return (
    <FormModal
      modalTitle="Add Tree Node"
      closeAction={closeAction}
      submitAction={submitAction}
    >
      <div className={inputContainer}>
        <label htmlFor="nodeParent">Parent Value</label>
        <input type="text" id="nodeParent" disabled value={nodeParent.value} />
      </div>
      <div className={inputContainer}>
        <label htmlFor="value">Value</label>
        <input type="text" id="value" onChange={handleChange} />
      </div>
    </FormModal>
  );
}

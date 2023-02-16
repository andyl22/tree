import { postHTTP } from "@/utilities/apiHelpers";
import { css } from "@emotion/css";
import FormModal from "../FormModal/FormModal";
import { useState } from "react";

export default function TreeNodeAddChild(props) {
  const { nodeParent, closeAction, enableBranch, enableChild } = props;
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

  const submitAction = async (action) => {
    const updateType =
      action === "add-child"
        ? "next"
        : action === "add-branch"
        ? "branch"
        : null;

    const newNode = await postHTTP("/createNode", { value: formState.value });
    await postHTTP("/updateNodeReference", {
      nodeParent,
      newNode,
      updateType,
    });
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
      <input
        type="submit"
        id="add-branch"
        value="Add Branch"
        style={{ width: "fit-content", padding: ".1rem .5rem" }}
        disabled={enableBranch}
      />
      <input
        type="submit"
        id="add-child"
        value="Add Child"
        style={{ width: "fit-content", padding: ".1rem .5rem" }}
        disabled={enableChild}
      />
    </FormModal>
  );
}

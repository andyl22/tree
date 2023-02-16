import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TreeNodeAddChild from "./TreeNodeAddChild";

export default function TreeNode(props) {
  const { nodeData, curNode } = props;
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const currentNode = nodeData.find((node) => node._id === curNode);
  if (!currentNode) return;

  const treeNode = css`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    position: relative;
  `;

  const nodeContent = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid #c2c2c2;
    border-radius: 0.1rem;
    width: 180px;
    text-align: center;
    min-height: 100px;
  `;

  const treeLevel = css`
    text-align: center;
    display: flex;
    justify-content: center;
  `;

  const treeBranch = css`
    top: 100px;
  `;

  const nextNode = currentNode?.next ? (
    <TreeNode nodeData={nodeData} curNode={currentNode.next} />
  ) : null;

  const branchNode = currentNode?.branch ? (
    <div className={treeBranch}>
      <TreeNode nodeData={nodeData} curNode={currentNode.branch} />
    </div>
  ) : null;

  const openAddChildForm = () => {
    setShowAddChildForm(true);
  };

  const closeAddChildForm = () => {
    setShowAddChildForm(false);
  };

  return (
    <>
      <div className={treeNode}>
        <div className={nodeContent}>
          <p>{currentNode?.value}</p>
          {treeNode && branchNode ? null : (
            <button onClick={openAddChildForm}>
              <AddIcon fontSize="small" />
            </button>
          )}
        </div>
        <div className={treeLevel}>
          {nextNode}
          {branchNode}
        </div>
      </div>
      {showAddChildForm ? (
        <TreeNodeAddChild
          closeAction={closeAddChildForm}
          nodeParent={currentNode}
          enableBranch={branchNode ? true : false}
          enableChild={nextNode ? true : false}
        />
      ) : null}
    </>
  );
}

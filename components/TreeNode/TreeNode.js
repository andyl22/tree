import { css } from "@emotion/css";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import TreeNodeAddChild from "./TreeNodeAddChild";

export default function TreeNode(props) {
  const { nodeData, curNode } = props;
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const currentNode = nodeData.find((node) => node._id === curNode);
  const currentNodeRef = useRef();
  const nodeChildRef = useRef();
  const nodeBranchRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const currentCoordinates = currentNodeRef?.current?.getBoundingClientRect();
    if (!canvasRef?.current) return;
    if (nodeChildRef.current) {
      const childCoordinates =
        nodeChildRef.current.firstChild.firstChild.getBoundingClientRect();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.moveTo(0, 50);
      ctx.lineTo(0, childCoordinates.top - currentCoordinates.bottom + 50);
      ctx.stroke();
    }
    if (nodeBranchRef.current) {
      const nodeBranchCoordinates =
        nodeBranchRef.current.firstChild.firstChild.getBoundingClientRect();
      console.log(nodeBranchCoordinates);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      const endX = nodeBranchCoordinates.right - currentCoordinates.right;
      const endY =
        nodeBranchCoordinates.top +
        currentCoordinates.height / 2 -
        currentCoordinates.bottom;
      ctx.moveTo(90, 0);
      ctx.bezierCurveTo(endX, endY / 6, endX / 1.05, endY / 3, endX, endY);
      ctx.stroke();
    }
  });

  if (!currentNode) return;

  const treeNode = css`
    display: flex;
    flex-direction: column;
    padding: 1rem;
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
    position: relative;
  `;

  const treeLevel = css`
    text-align: center;
    display: flex;
    justify-content: center;
  `;

  const nodeBranch = css``;

  const nodeChild = css`
    position: relative;
    padding: 0;
  `;

  const canvasStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
  `;

  const nextNode = currentNode?.next ? (
    <div className={nodeChild} ref={nodeChildRef}>
      <TreeNode nodeData={nodeData} curNode={currentNode.next} />
    </div>
  ) : null;

  const branchNode = currentNode?.branch ? (
    <div className={nodeBranch} ref={nodeBranchRef}>
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
        <div className={nodeContent} ref={currentNodeRef}>
          <p>{currentNode?.value}</p>
          {treeNode && branchNode ? null : (
            <button onClick={openAddChildForm}>
              <AddIcon fontSize="small" />
            </button>
          )}
          <canvas
            className={canvasStyle}
            ref={canvasRef}
            width="1000"
            height="100"
          />
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

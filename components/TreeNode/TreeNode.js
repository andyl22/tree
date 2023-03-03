import { css } from "@emotion/css";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TreeNodeAddChild from "./TreeNodeAddChild";
import Dropdown from "../Dropdown/Dropdown";

export default function TreeNode(props) {
  const { nodeData, curNode } = props;
  const [showAddChildForm, setShowAddChildForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [renderBranches, setRenderBranches] = useState(true);
  const [canvasWidth, setCanvasWidth] = useState();
  const currentNode = nodeData.find((node) => node._id === curNode);

  const currentNodeRef = useRef();
  const nodeChildRef = useRef();
  const nodeBranchRef = useRef();
  const canvasRef = useRef();

  const drawCanvas = () => {
    console.log("Test", currentNode);
    const currentCoordinates = currentNodeRef?.current?.getBoundingClientRect();
    if (nodeChildRef.current) {
      const childCoordinates =
        nodeChildRef.current.firstChild.firstChild.getBoundingClientRect();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "#bebebe";
      ctx.lineWidth = 4;

      ctx.moveTo(0, 50);
      ctx.lineTo(0, childCoordinates.top - currentCoordinates.bottom + 52);
      ctx.stroke();
    }
    if (nodeBranchRef.current) {
      const nodeBranchCoordinates =
        nodeBranchRef.current.firstChild.firstChild.getBoundingClientRect();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = "#bebebe";
      ctx.lineWidth = 2;
      const endX = nodeBranchCoordinates.right - currentCoordinates.right;
      const endY =
        nodeBranchCoordinates.top +
        currentCoordinates.height / 2 -
        currentCoordinates.bottom;
      ctx.moveTo(90, 0);
      ctx.bezierCurveTo(endX, endY / 6, endX / 1.05, endY / 3, endX, endY);
      ctx.stroke();
    }
  };

  // draw lines
  useEffect(() => {
    if (!canvasRef?.current) return;
    drawCanvas();
  });

  // setWidth
  useEffect(() => {
    if (!canvasRef?.current) return;
    const currentCoordinates =
      currentNodeRef?.current?.parentNode?.parentNode?.getBoundingClientRect();
    setCanvasWidth(currentCoordinates.width);
  }, [currentNode]);

  if (!currentNode) return;

  const treeNode = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    display: flex;
    text-align: center;
    justify-content: center;
    gap: 5rem;
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
    pointer-events: none;
    object-fit: cover;
    width: ${canvasWidth};
    height: 100%;
  `;

  const buttons = css`
    font-size: 0.1rem;
    background: none;
    &:hover {
      background: #cccccc;
    }
    color: black;
  `;

  const collapseButton = css`
    color: black;
    transform: ${renderBranches ? `rotate(270deg)` : `rotate(90deg)`};
    position: absolute;
    right: 0;
    top: 35%;
  `;

  const menuButton = css`
    position: absolute;
    top: 0%;
    right: 0%;
    border-radius: 2rem;
    padding: 0.2rem 0.11rem 0 0.1rem;
  `;

  const addButton = css`
    position: absolute;
    bottom: 0%;
    right: 0%;
    border-radius: 2rem;
    padding: 0 0.1rem 0.1rem 0.1rem;
  `;

  const openAddChildForm = () => {
    setShowAddChildForm(true);
  };

  const closeAddChildForm = () => {
    setShowAddChildForm(false);
  };

  const toggleBranchView = () => {
    setRenderBranches(!renderBranches);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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

  const buttonElements = (
    <>
      {showDropdown ? (
        <Dropdown
          dropdownActions={[{ label: "Add Node", event: openAddChildForm }]}
          hideDropdown={toggleDropdown}
        />
      ) : (
        <button className={`${buttons} ${menuButton}`} onClick={toggleDropdown}>
          <MoreHorizIcon fontSize="small" />
        </button>
      )}
      {treeNode && branchNode ? null : (
        <button
          className={`${buttons} ${addButton}`}
          onClick={openAddChildForm}
        >
          <AddIcon fontSize="small" />
        </button>
      )}
      {branchNode ? (
        <button
          className={`${buttons} ${collapseButton}`}
          onClick={toggleBranchView}
        >
          <ExpandLessIcon />
        </button>
      ) : null}
      {nextNode || branchNode ? (
        <canvas
          className={canvasStyle}
          ref={canvasRef}
          width={canvasWidth}
          height="100"
        />
      ) : null}
    </>
  );

  return (
    <>
      <div className={treeNode}>
        <div className={nodeContent} ref={currentNodeRef}>
          <p>{currentNode?.value}</p>
          {buttonElements}
        </div>
        <div className={treeLevel}>
          {nextNode}
          {renderBranches && branchNode}
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

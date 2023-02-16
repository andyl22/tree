import { css } from "@emotion/css";
import TreeNode from "../TreeNode/TreeNode";
import { NodeContext } from "@/testdata";
import { useContext, useEffect } from "react";
import { postHTTP } from "@/utilities/apiHelpers";

export default function Tree() {
  const nodeContext = useContext(NodeContext);
  const { nodeData, dispatch } = nodeContext;

  useEffect(() => {
    const initiateNodesList = async () => {
      const nodesList = await postHTTP("/getNodes");
      dispatch({ type: "INITIALIZE", nodesList });
    };

    initiateNodesList();
  }, [dispatch]);

  const treeContainer = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
    max-width: 100%;
    height: 100%;
    overflow: auto;
  `;

  return (
    <div className={treeContainer}>
      {nodeData ? (
        <TreeNode nodeData={nodeData} curNode={"63ed9ec9d1ddcb5e467bc6ff"} />
      ) : null}
    </div>
  );
}

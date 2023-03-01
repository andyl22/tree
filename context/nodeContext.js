import { createContext, useReducer } from "react";
const NodeContext = createContext();

const NodeProvider = (props) => {
  const { children } = props;

  const reducer = (nodeData, action) => {
    switch (action.type) {
      case "INITIALIZE":
        return action.nodesList;
      case "ADD":
        return [...nodeData, { id: 8, value: 9 }];
      case "UPDATE":
        return [...nodeData, { id: 8, value: 9 }];
      default:
        return [...nodeData];
    }
  };

  const [nodeData, dispatch] = useReducer(reducer, []);

  return (
    <NodeContext.Provider value={{ nodeData, dispatch }}>
      {children}
    </NodeContext.Provider>
  );
};

export { NodeProvider, NodeContext };

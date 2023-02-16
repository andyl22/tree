import dbConnect from "@/utilities/mongo";
import Node from "@/models/Node";

export default async function handler(req, res) {
  const { nodeParent, newNode, updateType } = req.body;
  if (updateType === null) return;

  await dbConnect();

  const key =
    updateType === "branch" ? "branch" : updateType === "next" ? "next" : null;

  try {
    const updatedNode = await Node.findOneAndUpdate(
      { _id: nodeParent._id },
      { [key]: newNode._id },
      { new: true }
    );
    res.status(201).json(updatedNode);
  } catch (error) {
    res.status(200).json(error);
  }
}

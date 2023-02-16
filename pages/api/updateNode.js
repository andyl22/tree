import dbConnect from "@/utilities/mongo";
import Node from "@/models/Node";

export default async function handler(req, res) {
  const { nodeParent, newNode } = req.body;

  console.log(nodeParent, newNode);

  await dbConnect();

  try {
    const updatedNode = await Node.findOneAndUpdate(
      { _id: nodeParent._id },
      { next: newNode._id },
      { new: true }
    );
    res.status(201).json(updatedNode);
  } catch (error) {
    res.status(200).json(error);
  }
}

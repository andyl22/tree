import dbConnect from "@/utilities/mongo";
import Node from "@/models/Node";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const nodeList = await Node.find();
    res.status(201).json(nodeList);
  } catch (error) {
    res.status(200).json(error);
  }
}

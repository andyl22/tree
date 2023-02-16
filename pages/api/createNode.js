import dbConnect from "@/utilities/mongo";
import Node from "@/models/Node";

export default async function handler(req, res) {
  const { value } = req.body;

  await dbConnect();

  try {
    const newNode = await Node.create({
      value,
    });
    res.status(201).json(newNode);
  } catch (error) {
    res.status(200).json(error);
  }
}

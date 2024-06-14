const { ObjectId } = require("mongodb");

async function createPoem(req, res, poemCollection) {
  const bookData = req.body;
  const result = await poemCollection.insertOne(bookData);
  res.send(result);
}

async function getAllPoems(req, res, poemCollection) {
  const booksData = poemCollection.find();
  const result = await booksData.toArray();
  res.send(result);
}

async function getPoemById(req, res, poemCollection) {
  const id = req.params.id;
  const poemData = await poemCollection.findOne({
    _id: new ObjectId(id),
  });
  res.send(poemData);
}

async function updatePoem(req, res, poemCollection) {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await poemCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
  res.send(result);
}

async function deletePoem(req, res, poemCollection) {
  const id = req.params.id;
  const result = await poemCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
}

module.exports = {
  createPoem,
  getAllPoems,
  getPoemById,
  updatePoem,
  deletePoem,
};

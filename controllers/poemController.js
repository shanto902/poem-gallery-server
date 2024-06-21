const { ObjectId } = require("mongodb");

async function createPoem(req, res, poemCollection) {
  const bookData = {
    ...req.body,
    createdAt: new Date(),
    comments: [],
  };

  const result = await poemCollection.insertOne(bookData);
  res.send(result);
}

module.exports = { createPoem };

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

async function addComment(req, res, poemCollection) {
  const id = req.params.id;
  const comment = {
    ...req.body,
    createdAt: new Date(),
  };

  const result = await poemCollection.updateOne(
    { _id: new ObjectId(id) },
    { $push: { comments: comment } }
  );

  res.send(result);
}

// Get comments for a poem
async function getComments(req, res, poemCollection) {
  const id = req.params.id;
  try {
    const poemData = await poemCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { comments: 1 } }
    );
    res.send(poemData.comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Failed to fetch comments.");
  }
}

async function getPoets(req, res, poemCollection, userCollection) {
  try {
    const poemsData = await poemCollection.find().toArray();

    const authorEmails = [
      ...new Set(poemsData.map((poem) => poem.author.email)),
    ];

    const poets = await Promise.all(
      authorEmails.map(async (email) => {
        const userData = await userCollection.findOne({ email });
        return {
          email: userData.email,
          name: userData.name,
          photo: userData.imageURL,
          poems: poemsData.filter((poem) => poem.author.email === email),
        };
      })
    );

    res.send(poets);
  } catch (error) {
    console.error("Error fetching poets:", error);
    res.status(500).send("Failed to fetch poets.");
  }
}

module.exports = {
  createPoem,
  getAllPoems,
  getPoemById,
  updatePoem,
  deletePoem,
  addComment,
  getComments,
  getPoets,
};

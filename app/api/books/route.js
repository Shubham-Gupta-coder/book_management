import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
export async function GET(request) {
  // Get the database and collection on which to run the operation
  const database = client.db("Book_management");
  const books = database.collection("books");

  // Execute query
  const book = await books.find({}).toArray();

  // Print the document returned by findOne()
    return Response.json({ book });
}
export async function POST(request) {
  const body = await request.json();
  // Get the database and collection on which to run the operation
  const database = client.db("Book_management");
  const books = database.collection("books");

  // Query for a movie that has the title 'The Room'
  const doc = {
    title: body.title,
    method: body.method,
  };
  // Insert the defined document into the "haiku" collection
  const book = await books.insertOne(doc);
  // Print the document returned by findOne()
    return Response.json({ book });
}

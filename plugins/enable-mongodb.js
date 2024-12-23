import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // Load the MongoDB connection string from the .env file
const client = new MongoClient(uri);

/**
 * Toggle a specific property in the MongoDB database.
 *
 * @param {string} documentId - The ID of the document in the database.
 * @param {string} path - The path to the property to toggle (e.g., "data.chats.<chatId>.autoread").
 * @param {boolean} value - The value to set (true or false).
 * @returns {Promise<boolean>} - True if the operation was successful, otherwise false.
 */
export async function toggleProperty(documentId, path, value) {
  try {
    await client.connect();
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('datas'); // Replace with your collection name

    const query = { _id: new ObjectId(documentId) };
    const update = { $set: { [path]: value } };

    const result = await collection.updateOne(query, update);
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error toggling property:', error);
    return false;
  } finally {
    await client.close();
  }
}

import mongoose from "mongoose";
const { connect } = mongoose;

export default async function dbConnection(uri) {
  try {
    const connection = await connect(uri);
    console.log(
      `DB connection is established on host ${connection.connection.host}`
    );
  } catch (error) {
    console.log(error.message);
  }
}

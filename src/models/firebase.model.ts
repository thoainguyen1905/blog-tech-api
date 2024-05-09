import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FirebaseSchema = new Schema({
  token: { type: String, required: true },
});

const FirebaseModel = mongoose.model("devices", FirebaseSchema);

export default FirebaseModel;

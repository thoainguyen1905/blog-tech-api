import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FirebaseSchema = new Schema({
  token: { type: String, required: true },
  idUser: {
    type: String,
  },
});

const FirebaseModel = mongoose.model("devices", FirebaseSchema);

export default FirebaseModel;

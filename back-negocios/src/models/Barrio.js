const { Schema, model } = require("mongoose");

const barrioSquema = new Schema(
  {
    shortName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      //required: true,
    },
    stateData: {
      type: Object,
    },
    state: {
      type: String,
      required: true,
    },

    price: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Barrio", barrioSquema);

const { Schema, model } = require("mongoose");

const advertSquema = new Schema(
  {
    barrio: {
      type: Object,
    },
    owner: {
      type: String,
      required: true,
    },
    title: String,
    tel: String,
    description: String,
    tel: String,
    whatsApp: String,
    faceUrl: String,
    instaUrl: String,
    siteUrl: String,
    businessMail: String,
    postalCode: String,
    contacts: Array,
    image: Object,
    imgUrl: String,
    imgUrlIzq: String,
    labels: String,
    classification: String,
    backgroundColor: String,
    delivery: Boolean,

    styles: {
      backgroundColor: String,
    },
    labels: Array,
    // ubicacion
    middlePoint: Boolean,
    location: String,
    address: String,

    advertContent: {
      title: String,
      description: String,
      labels: Array,
      classification: String,
      imgUrl: String,
      backgroundColor: String,
    },
    advertContact: {
      tel: String,
      whatsApp: String,
      faceUrl: String,
      instaUrl: String,
      siteUrl: String,
      businessMail: {
        type: String,
        require: true,
      },
    },
    advertLocation: {
      barrio: String,
      googleLocation: String,
      postalCode: String,
    },
    isPublished: Boolean,
    publishedOn: Array,
   
  },
  {
    timestamps: true,
  }
);

module.exports = model("Advert", advertSquema);

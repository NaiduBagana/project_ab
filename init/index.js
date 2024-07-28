const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listings.js");
const dbUrl = process.env.ATLASDB_URL;
main()
  .then((res) => {
    console.log("connection to db is succesful ab");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://baganasatyavathi:Jaby7h1tAcnxJzAa@cluster0.q7a77h7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}
const insert_func = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "66a51f7ed5439cabb3d051ff",
    geometry: { type: "Point", coordinates: [75.815025, 26.9217] },
  }));
  await Listing.insertMany(initdata.data);
  console.log("DATA WAS INITSLISED AB");
};
insert_func();

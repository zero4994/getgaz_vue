const fs = require("fs");
const db = require("../server/knex.js");

(async () => {
  try {
    const locations = JSON.parse(fs.readFileSync("./data/locations.json"));
    for (const location of locations) {
      const id = location.Site.SiteId;
      const latitude = location.Site.Latitude;
      const longitude = location.Site.Longitude;
      const name = location.Site.SiteName;
      const streetAddress = location.Addresses[0].Address1;
      const city = location.Addresses[0].City;
      const state = location.Addresses[0].State;
      const zipcode = location.Addresses[0].Zip;

      const address = `${streetAddress}, ${city}, ${state}, ${zipcode}`;

      await db("locations").insert({
        site_id: id,
        latitude,
        longitude,
        name,
        address
      });
    }
    console.log("these are locations");
    await process.exit();
  } catch (err) {
    console.error("Error inserting records", err);
  }
})();

const axios = require("axios");

const saveUserProfile = async ({ profile, status }) => {
  await cloudFirestore.collection("users").doc(profile.userId).set({
    profile,
    status,
  });
};

async function getUserData({ userId }) {
  const data = await cloudFirestore.collection("users").doc(userId).get();

  if (!data.exists) {
    throw Error("No Such Document!");
  } else {
    return data.data();
  }
}

const saveSensorData = async ({ message }) => {
  const obj = JSON.parse(message.toString());
  await cloudFirestore.collection("sensor").doc().set(obj);
};

app.get("/prices", function(request, response) {
    axios
      .get("https://api.nomics.com/v1/prices?key=" + process.env.NOMICS_API_KEY)
      .then(resp => {
        response.send(resp.data);
      })
      .catch(err => {
        console.log("Error fetching data from nomics", err);
      });
  });
  
module.exports = {
  saveUserProfile,
  getUserData,
  saveSensorData,
};

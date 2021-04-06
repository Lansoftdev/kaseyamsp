const https = require("https");
const sleep = require("./sleep");

module.exports = async (request) => {
  return new Promise((resolve, reject) => {
    https
      .request(request, (response) => {
        let data = "";
        if (response.statusCode == 401) {
          return resolve({
            ResponseCode: 401,
          });
        }
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => {
          try {
            return resolve(JSON.parse(data));
          } catch (SyntaxError) {
            console.log("exeption");
          }
        });
        response.on("error", (err) => reject(err));
      })
      .end();
  });
};

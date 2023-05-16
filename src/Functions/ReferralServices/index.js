const { getReferralCode, generateNewReferralCode, increaseReferralCount } = require('./referralHelper.js')

exports.handler = async(event) => {
  console.log("Start referral services handler with event", JSON.stringify(event));
  const { httpMethod, resource, pathParameters } = event;
  const supportedPath = [
    { resource: "users/referral/{userId}", methods: ["GET"]},
    { resource: "users/referral/{userId}", methods: ["PUT"]},
    { resource: "users/referral/{refferalCode}", methods: ["POST"] },
  ]

  // let userTable = process.env.SPACE_SCHEMES_USER_TABLE; //Change to user table when deploy in SpacesAI
  let referralTable = process.env.REFERRAL_TABLE;
  let requestBody = null;

  switch(resource) {
    // Get Referral Code from user table
    case "users/referral/{userId}": 
      if(httpMethod === "GET") {
        const { userId } = pathParameters
        const res = await getReferralCode(userId)
        const response = {
          statusCode: 200,
          body: res
        }

        return response

      }
    // Generate new Referral code for user
    case "users/referral/{userId}":
      if (httpMethod === "PUT") {
        const { userId } = pathParameters

      }
    case "users/referral/{referralCode}":
      if (httpMethod === "POST") {
        const { referralCode } = pathParameters
        
      }
    default: 
      console.log("Invalid method");
      const error = {
        status:405,
        message: "Method Not Allowed"
      }
      return error;
  }
}
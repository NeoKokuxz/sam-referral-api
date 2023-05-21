const { getReferralCode, generateNewReferralCode, increaseReferralCount } = require('./referralHelper.js')

exports.handler = async(event) => {
  console.log("Start referral services handler with event", JSON.stringify(event));
  const { httpMethod, resource, pathParameters } = event;
  // const supportedPath = [
  //   { resource: "users/referral/get/{userId}", methods: ["GET"]},
  //   { resource: "users/referral/update/{userId}", methods: ["PUT"]},
  //   { resource: "users/referral/{refferalCode}", methods: ["POST"] },
  // ]

  console.log('Current Path:', resource + " Method: " + httpMethod + " Parameters: " + pathParameters )

  // let userTable = process.env.SPACE_SCHEMES_USER_TABLE; //Change to user table when deploy in SpacesAI
  // let referralTable = process.env.REFERRAL_TABLE;
  // let requestBody = null;

  switch(resource) {
    // Get Referral Code from user table
    case "/users/referral/get/{userId}": 
      if(httpMethod === "GET") {
        const { userId } = pathParameters
        const res = await getReferralCode(userId)
        const response = {
          statusCode: 200,
          body: res.referralCode
        }
        return response
      }
    // Generate new Referral code for user
    case "/users/referral/update/{userId}":
      if (httpMethod === "PUT") {
        const { userId } = pathParameters
        const res = await generateNewReferralCode(userId)
        const response = {
          statusCode: 200,
          body: 'Updated Code'
        }
        return response
      }
    case "/users/referral/{referralCode}":
      if (httpMethod === "POST") {
        const { referralCode } = pathParameters
        const res = await increaseReferralCount(referralCode)
        const response = {
          statusCode: 200,
          body: 'Updated Count'
        }
        return response
      }
    default: 
      console.log("Invalid method");
      const error = {
        status:405,
        message: "Method Not Allowed",
        method: httpMethod,
        resource: resource,
        pathParameters: pathParameters,
      }
      return error;
  }
}
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const userTable = 'spaces-ai-SpaceSchemesUserTable-676C63WCIFSQ';

async function getReferralCodefromDB(userId) {
  const date = awshelper.dateISO();

  console.log(
    'Start fetching User:' + userId + ' at ' + date
  );

  const params = {
    TableName: userTable,
    Key: {
      id: userId
    }
  };

  try {
    let result = await dynamoDB.getItem(params).promise();
    console.log(result);
    return result.code;
  } catch (error) {
    console.log('Logging:', error);
    return error;
  }
}

async function updateReferralCodeInDB (userId, code) {
  const date = awshelper.dateISO();

  console.log(
    'Start replace referral code for User:' + userId + ' at ' + date
  ); 

  const params = {
    TableName: userTable,
    Key: {
      id: userId,
    },
    UpdateExpression: 'set referralCode = :referralCode',
    ExpressionAttributeValues: {
      ":referralCode": code
    }
  }

  try {
    let result = await dynamoDB.update(params).promise();
    return result.code
  } catch (error) {
    return error
  }
}

async function updateReferralCountFromDB ( code ) {
  const date = awshelper.dateISO();

  console.log(
    'Start increase referral count for User:' + userId + ' at ' + date
  );

  // Getr userId from referral code
  const  userId = code.split("-")[0];

  const referralCount = 1;

  const params = {
    TableName: userTable,
    Key: {
      id: userId,
    },
    UpdateExpression: 'set referralCount = referralCount + :referralCount',
    ExpressionAttributeValues: {
      ":referralCode": referralCount
    }
  }

  try {
    let result = await dynamoDB.update(params).promise();
    return result.referralCount
  } catch (error) {
    return error
  }
}

module.exports = {
  getReferralCodefromDB,
  updateReferralCodeInDB,
  updateReferralCountFromDB
};


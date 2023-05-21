const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const userTable = 'sam-referral-api-ReferralTable-J6SH58KFGEZ1';
const date = new Date();

async function getReferralCodefromDB(userId) {
  // const date = awshelper.dateISO();

  console.log(
    'Start fetching User:' + userId + ' at ' + date
  );

  const params = {
    TableName: userTable,
    Key: {
      userId: userId
    }
  };

  try {
    let result = await dynamoDB.get(params).promise();
    console.log(result);
    return result
  } catch (error) {
    console.log('Logging:', error);
    return error;
  }
}

async function updateReferralCodeInDB(userId, code) {
  // const date = awshelper.dateISO();

  console.log(
    'Start replace referral code for User:' + userId + ' at ' + date
  );

  const params = {
    TableName: userTable,
    Key: {
      userId: userId,
    },
    UpdateExpression: 'set referralCode = :referralCode',
    ExpressionAttributeValues: {
      ":referralCode": code
    }
  }

  try {
    let result = await dynamoDB.update(params).promise();
    return result
  } catch (error) {
    return error
  }
}

async function updateReferralCountFromDB(code) {
  // const date = awshelper.dateISO();

  // Getr userId from referral code
  const userId = code.split("-")[0];

  console.log(
    'Start increase referral count for User:' + userId + ' at ' + date
  );

  const referralCount = 1;

  const params = {
    TableName: userTable,
    Key: {
      userId: userId,
    },
    UpdateExpression: 'set referralCount = referralCount + :referralCount',
    ExpressionAttributeValues: {
      ":referralCount": referralCount
    }
  }

  try {
    let result = await dynamoDB.update(params).promise();
    return result
  } catch (error) {
    return error
  }
}

module.exports = {
  getReferralCodefromDB,
  updateReferralCodeInDB,
  updateReferralCountFromDB
}

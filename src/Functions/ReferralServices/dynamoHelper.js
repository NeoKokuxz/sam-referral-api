const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const userCheckinTable = 'spaces-ai-SpaceSchemesUserCheckinTable-1WR4G2C3QFRC4';

async function getReferralCode (userId, checkInTime) {
  const date = awshelper.dateISO();

  console.log(
    'Start validating if user check in already. User:' + userId + ' at ' + date
  );

  const params = {
    TableName: userCheckinTable,
    Key: {
      id: userId,
    },
    Item: {
      id: userId,
      initialCheckInTime: checkInTime,
    },
    ConditionExpression: 'attribute_not_exists(id)',
  };

  //False - Not checkin today
  //True - Already checkin today
  let exist = false;

  try {
    let result = await dynamoDB.put(params).promise();
    console.log(result);
  } catch (error) {
    console.log('Logging:', error);
    exist = true;
  }

  return exist;
}

module.exports = userCheckinValidation;

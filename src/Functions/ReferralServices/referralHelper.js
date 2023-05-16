
import { getReferralCodefromDB, updateReferralCodeInDB, updateReferralCountFromDB } from './dynamoHelper.js'

// Get referral Code
async function getReferralCode( userId ) {
  let code = await getReferralCodefromDB(userId);
  return code;
}
// Replace referral Code
async function generateNewReferralCode ( userId ) {
  // Generate New Code
  const referralCode = generateReferralCode(userId)

  // Update code in user table
  const result = await updateReferralCodeInDB(userId, referralCode)
  return result
}

// Increase referralCount if someone used the referral code
async function increaseReferralCount ( referralCode ) {
  const result = updateReferralCountFromDB( referralCode );
  return result
}

export default {
  getReferralCode,
  generateNewReferralCode,
  increaseReferralCount,
}

function generateReferralCode ( userId ) {
  let referralCode = userId
  for (let i = 0; i < 4; i++) {
    let str = '-' + Math.random().toString(36).slice(2, 6); 
    referralCode+= str;
  }

  return referralCode;
}
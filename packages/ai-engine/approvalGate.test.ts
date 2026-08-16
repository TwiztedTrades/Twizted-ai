import {
  approvalGate,
  ApprovalGateInput,
} from "./approvalGate";

console.log("");
console.log("========================================");
console.log("      TWIZTED AI APPROVAL GATE TEST");
console.log("========================================");
console.log("");


// ==================================================
// BASELINE — EVERYTHING PASSES
// ==================================================

const validTrade: ApprovalGateInput = {
  score: 85,
  confidence: 90,
  conviction: 85,
  riskReward: 2.5,

  riskApproved: true,
  positionApproved: true,

  contracts: 1,
  positionCost: 100,
  maxAllocation: 500,
};

const approvedResult = approvalGate(validTrade);

if (!approvedResult.approved) {
  throw new Error(
    "BASELINE FAILURE: Valid trade was rejected"
  );
}

console.log("✅ Baseline approved trade passed");


// ==================================================
// TEST 1 — AI SCORE BELOW 80
// ==================================================

const lowScore = approvalGate({
  ...validTrade,
  score: 79,
});

if (lowScore.approved) {
  throw new Error(
    "CRITICAL: Trade with score below 80 was approved"
  );
}

console.log("✅ Score below 80 correctly rejected");


// ==================================================
// TEST 2 — CONFIDENCE BELOW 85
// ==================================================

const lowConfidence = approvalGate({
  ...validTrade,
  confidence: 84,
});

if (lowConfidence.approved) {
  throw new Error(
    "CRITICAL: Trade with confidence below 85 was approved"
  );
}

console.log("✅ Confidence below 85 correctly rejected");


// ==================================================
// TEST 3 — CONVICTION BELOW 80
// ==================================================

const lowConviction = approvalGate({
  ...validTrade,
  conviction: 79,
});

if (lowConviction.approved) {
  throw new Error(
    "CRITICAL: Trade with conviction below 80 was approved"
  );
}

console.log("✅ Conviction below 80 correctly rejected");


// ==================================================
// TEST 4 — RISK/REWARD BELOW 2:1
// ==================================================

const badRiskReward = approvalGate({
  ...validTrade,
  riskReward: 1.99,
});

if (badRiskReward.approved) {
  throw new Error(
    "CRITICAL: Trade with R/R below 2:1 was approved"
  );
}

console.log("✅ Risk/Reward below 2:1 correctly rejected");


// ==================================================
// TEST 5 — RISK ENGINE REJECTS
// ==================================================

const riskRejected = approvalGate({
  ...validTrade,
  riskApproved: false,
});

if (riskRejected.approved) {
  throw new Error(
    "CRITICAL: Risk-rejected trade was approved"
  );
}

console.log("✅ Risk engine rejection correctly enforced");


// ==================================================
// TEST 6 — POSITION SIZE REJECTS
// ==================================================

const positionRejected = approvalGate({
  ...validTrade,
  positionApproved: false,
});

if (positionRejected.approved) {
  throw new Error(
    "CRITICAL: Position-rejected trade was approved"
  );
}

console.log("✅ Position size rejection correctly enforced");


// ==================================================
// TEST 7 — ZERO CONTRACTS
// ==================================================

const zeroContracts = approvalGate({
  ...validTrade,
  contracts: 0,
});

if (zeroContracts.approved) {
  throw new Error(
    "CRITICAL: Trade with zero contracts was approved"
  );
}

console.log("✅ Zero contracts correctly rejected");


// ==================================================
// TEST 8 — POSITION EXCEEDS ALLOCATION
// ==================================================

const allocationExceeded = approvalGate({
  ...validTrade,
  positionCost: 501,
  maxAllocation: 500,
});

if (allocationExceeded.approved) {
  throw new Error(
    "CRITICAL: Trade exceeding allocation was approved"
  );
}

console.log("✅ Allocation violation correctly rejected");


// ==================================================
// TEST 9 — MULTIPLE FAILURES
// ==================================================

const multipleFailures = approvalGate({
  ...validTrade,

  score: 50,
  confidence: 50,
  conviction: 50,
  riskReward: 1,

  riskApproved: false,
  positionApproved: false,

  contracts: 0,
  positionCost: 1000,
  maxAllocation: 500,
});

if (multipleFailures.approved) {
  throw new Error(
    "CRITICAL: Trade with multiple failures was approved"
  );
}

if (multipleFailures.failedChecks.length < 5) {
  throw new Error(
    `Expected multiple failure reasons, got ${multipleFailures.failedChecks.length}`
  );
}

console.log(
  `✅ Multiple failure conditions correctly rejected (${multipleFailures.failedChecks.length} failures)`
);


// ==================================================
// TEST 10 — EXACT BOUNDARIES
// ==================================================

// This verifies that our minimum requirements are inclusive.

const exactMinimums = approvalGate({
  score: 80,
  confidence: 85,
  conviction: 80,
  riskReward: 2,

  riskApproved: true,
  positionApproved: true,

  contracts: 1,
  positionCost: 500,
  maxAllocation: 500,
});

if (!exactMinimums.approved) {
  throw new Error(
    "CRITICAL: Exact minimum requirements should be approved"
  );
}

console.log("✅ Exact minimum requirements correctly approved");


// ==================================================
// FINAL SUMMARY
// ==================================================

console.log("");
console.log("========================================");
console.log("    APPROVAL GATE STRESS TEST PASSED");
console.log("========================================");
console.log("");

console.log("🛡️ Score protection ............... PASS");
console.log("🛡️ Confidence protection ......... PASS");
console.log("🛡️ Conviction protection ......... PASS");
console.log("🛡️ Risk/Reward protection ........ PASS");
console.log("🛡️ Risk engine protection ........ PASS");
console.log("🛡️ Position size protection ...... PASS");
console.log("🛡️ Contract count protection ..... PASS");
console.log("🛡️ Allocation protection ......... PASS");
console.log("🛡️ Multiple failure handling ..... PASS");
console.log("🛡️ Boundary conditions ........... PASS");

console.log("");
console.log("🔒 APPROVAL GATE IS OPERATING AS INTENDED");
console.log("");

const getSum = require("./get-sum");

test("Expect 10 + 57 to equal 67", () => {
  // Test case inputs
  const num1 = 10;
  const num2 = 57;

  const result = getSum(num1, num2);
  expect(result).toBe(67);
});

const calculator = require("./calculator");

test("Performing arithmetic operations", () => {
  const num1 = 5;
  const num2 = 7;

  // Addition
  expect(calculator(num1, num2, "+")).toBe(12);

  // Substraction
  expect(calculator(num1, num2, "-")).toBe(-2);

  // Multiplication
  expect(calculator(num1, num2, "*")).toBe(35);

  // Division
  expect(calculator(num1, num2, "/")).toBeCloseTo(0.7143, 4);

  // Invalid operator
  expect(calculator(num1, num2, "%")).toBe("Invalid operator");
});

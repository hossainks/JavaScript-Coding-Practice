const { helloworld } = require("./hello-world");

test("Returning hello world as a string", () => {
  const result = helloworld();
  expect(result).toBe("Hello World!");
});

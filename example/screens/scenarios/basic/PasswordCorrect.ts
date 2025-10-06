export const PasswordCorrectScenario = {
  id: "password-correct",
  name: "Password Correct",
  description: "Tests password prop with correct password 'password'",
  category: "password" as const,
  expectedBehavior: "PDF should load successfully with the correct password",
  notes: "Requires test server running: cd example/test-server && node server.js",
};

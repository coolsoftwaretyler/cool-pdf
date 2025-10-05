export const PasswordIncorrectScenario = {
  id: "password-incorrect",
  name: "Password Incorrect",
  description: "Tests password prop with incorrect password 'wrongpassword'",
  category: "basic" as const,
  expectedBehavior: "PDF should fail to load and display error: 'Password required or incorrect password.'",
  notes: "Requires test server running: cd example/test-server && node server.js",
};

export const PasswordPropScenario = {
  id: "password-prop",
  name: "Password Prop",
  description: "Tests the password prop with a password-protected PDF served from local test server",
  category: "basic" as const,
  expectedBehavior: "PDF should load successfully with password='test123'",
  notes: "Requires test server running: cd example/test-server && node server.js",
};

const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gspacademy.in",
    password: "admin123",
    role: "admin",
    title: "Director",
  },
  {
    id: "2",
    name: "Staff User",
    email: "staff@gspacademy.in",
    password: "staff123",
    role: "staff",
    title: "Counselor",
  },
];

export function loginUser(email, password) {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    const { password, ...userData } = user;
    return Promise.resolve(userData);
  }
  return Promise.reject(new Error("Invalid credentials"));
}

export function getCurrentUser() {
  const stored = localStorage.getItem("gsp_user");
  if (stored) {
    return Promise.resolve(JSON.parse(stored));
  }
  return Promise.resolve(null);
}

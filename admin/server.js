import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "change-this-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

// Serve ALL static files from project root
app.use(express.static(__dirname));

// Fake admin user (replace later)
const ADMIN_USER = {
  username: "admin",
  // bcrypt hash for "password123"
  passwordHash: "$2b$10$0alVvBz.G4824vIaHIva/eWx6dnMayEmPzM1apffO15ThVzP2mzq2"
};

// Redirect root → login page
app.get("/", (req, res) => {
  res.redirect("/admin/login.html");
});

// Login handler
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USER.username) {
    return res.status(401).send("Invalid username or password");
  }

  const valid = await bcrypt.compare(password, ADMIN_USER.passwordHash);
  if (!valid) {
    return res.status(401).send("Invalid username or password");
  }

  req.session.isAdmin = true;
  res.redirect("/admin");
});

// Protected admin page
app.get("/admin", (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect("/admin/login.html");
  }

  res.send("<h1>Welcome Admin</h1><p>You are logged in.</p>");
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login.html");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

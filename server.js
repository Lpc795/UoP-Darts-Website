import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import { register, login } from './login-backend.js'

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.use(
  session({
    secret: "change-this-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.static(__dirname));

const ADMIN_USER = {
  username: "admin",
  passwordHash:
    "$2b$10$lXUMnq50lGRp21aQKRcVy.0A7HCd3OCHYg/vDOli5Ch8v/IHZmt9.",
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index", "index.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const ok = login(username, password);

  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.session.isAdmin = true;

  res.json({ success: true });
});

app.get("/admin", (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect("/admin/login");
  }

app.use(express.static('admin'));


  res.sendFile(path.join(__dirname, "admin", "admin.html"));
});


app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();

const uploadDir = path.join(__dirname, "public/uploads");
const catalogFile = path.join(__dirname, "catalog.json");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Multer
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Serve Admin Page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views/admin.html"));
});

// Handle Upload
app.post("/upload", upload.single("image"), (req, res) => {
  const { title, price, category } = req.body;
  const imageUrl = "/uploads/" + req.file.filename;

  const newItem = { title, price, category, imageUrl };

  let catalog = [];
  if (fs.existsSync(catalogFile)) {
    catalog = JSON.parse(fs.readFileSync(catalogFile));
  }

  catalog.push(newItem);
  fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, 2));

  res.json({ message: "Upload successful!" });
});

// Serve Catalog JSON
app.get("/catalog-data", (req, res) => {
  const catalog = fs.existsSync(catalogFile) ? JSON.parse(fs.readFileSync(catalogFile)) : [];
  res.json(catalog);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

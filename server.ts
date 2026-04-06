import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "solutionx-secret-key-2026";
const PORT = 3000;

// Initialize Database
const db = new Database("solutionx.db");

// Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    file_path TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS licenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    user_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS login_tokens (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    expiry DATETIME NOT NULL
  );
`);

// Seed Products if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare("INSERT INTO products (id, name, description, price, file_path) VALUES (?, ?, ?, ?, ?)");
  insertProduct.run("S-01", "Google Maps Lead Scraper", "Extract leads from Google Maps", "30", "scripts/maps_scraper.py");
  insertProduct.run("S-02", "Bulk Cold Email Sender", "Send personalized cold emails", "40", "scripts/email_sender.py");
  insertProduct.run("S-03", "WhatsApp Auto-Reply Bot", "Automate WhatsApp replies", "35", "scripts/wa_bot.py");
  insertProduct.run("S-04", "Social Media Auto Poster", "Automate social media posts", "50", "scripts/social_poster.py");
  insertProduct.run("S-05", "Daily Business Report Generator", "Generate daily business reports", "25", "scripts/report_gen.py");
  insertProduct.run("S-06", "AI Content Generator", "Generate AI content", "30", "scripts/ai_gen.py");
  insertProduct.run("S-07", "Invoice Generator Script", "Generate professional invoices", "20", "scripts/invoice_gen.py");
  insertProduct.run("S-08", "Form to Google Sheets + Automation", "Automate form data to sheets", "25", "scripts/form_automation.py");
  insertProduct.run("S-09", "Website Contact Scraper", "Scrape contact info from websites", "30", "scripts/contact_scraper.py");
  insertProduct.run("S-10", "Auto Follow-Up System", "Automate email follow-ups", "35", "scripts/follow_up.py");
}

// Create scripts directory and dummy files
if (!fs.existsSync("scripts")) {
  fs.mkdirSync("scripts");
}
const scriptFiles = ["maps_scraper.py", "email_sender.py", "wa_bot.py", "social_poster.py", "report_gen.py", "ai_gen.py", "invoice_gen.py", "form_automation.py", "contact_scraper.py", "follow_up.py"];
scriptFiles.forEach(file => {
  const filePath = path.join("scripts", file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `# SolutionX Script: ${file}\nprint("Running ${file}...")\n`);
  }
});

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // --- API Routes ---

  // Request Magic Link
  app.post("/api/auth/request-magic-link", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const token = uuidv4();
    const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins

    db.prepare("INSERT INTO login_tokens (token, email, expiry) VALUES (?, ?, ?)").run(token, email, expiry);

    const magicLink = `${process.env.APP_URL || "http://localhost:3000"}/#login-token/${token}`;
    
    // In a real app, send email. Here, we log to console and return it for the demo.
    console.log(`\n--- MAGIC LINK FOR ${email} ---\n${magicLink}\n---------------------------\n`);

    res.json({ 
      message: "Magic link sent to your email",
      demoLink: magicLink // Returning the link directly for the demo
    });
  });

  // Login with Token
  app.get("/api/auth/login-with-token/:token", (req, res) => {
    const { token } = req.params;
    const row = db.prepare("SELECT * FROM login_tokens WHERE token = ?").get(token) as { email: string, expiry: string } | undefined;

    if (!row) return res.status(400).json({ error: "Invalid or expired token" });
    if (new Date(row.expiry) < new Date()) {
      db.prepare("DELETE FROM login_tokens WHERE token = ?").run(token);
      return res.status(400).json({ error: "Token expired" });
    }

    // Ensure user exists
    let user = db.prepare("SELECT * FROM users WHERE email = ?").get(row.email) as { id: number, email: string } | undefined;
    if (!user) {
      const result = db.prepare("INSERT INTO users (email) VALUES (?)").run(row.email);
      user = { id: result.lastInsertRowid as number, email: row.email };
    }

    const jwtToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    
    // Clean up token
    db.prepare("DELETE FROM login_tokens WHERE token = ?").run(token);

    res.json({ token: jwtToken, user });
  });

  // Middleware to verify JWT
  const authenticate = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Get User Products & Licenses
  app.get("/api/user/products", authenticate, (req: any, res) => {
    const licenses = db.prepare(`
      SELECT l.key, l.status, p.id, p.name, p.description, p.price
      FROM licenses l
      JOIN products p ON l.product_id = p.id
      WHERE l.user_id = ?
    `).all(req.user.id);

    res.json(licenses);
  });

  // Purchase Script (Simplified for demo)
  app.post("/api/purchase", authenticate, (req: any, res) => {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: "Product ID is required" });

    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check if already owned
    const existing = db.prepare("SELECT * FROM licenses WHERE user_id = ? AND product_id = ?").get(req.user.id, productId);
    if (existing) return res.status(400).json({ error: "Product already owned" });

    const licenseKey = `SX-${uuidv4().substring(0, 4).toUpperCase()}-${uuidv4().substring(0, 4).toUpperCase()}`;
    db.prepare("INSERT INTO licenses (key, user_id, product_id) VALUES (?, ?, ?)").run(licenseKey, req.user.id, productId);

    res.json({ message: "Purchase successful", licenseKey });
  });

  // Verify License Key
  app.post("/api/verify-license", (req, res) => {
    const { key } = req.body;
    if (!key) return res.status(400).json({ error: "License key is required" });

    const license = db.prepare(`
      SELECT l.status, p.name, u.email
      FROM licenses l
      JOIN products p ON l.product_id = p.id
      JOIN users u ON l.user_id = u.id
      WHERE l.key = ?
    `).get(key) as { status: string, name: string, email: string } | undefined;

    if (!license) return res.status(404).json({ error: "Invalid license key" });
    if (license.status !== "active") return res.status(403).json({ error: "License revoked" });

    res.json({ valid: true, product: license.name, owner: license.email });
  });

  // Download Script
  app.get("/api/download/:productId", authenticate, (req: any, res) => {
    const { productId } = req.params;
    const license = db.prepare("SELECT * FROM licenses WHERE user_id = ? AND product_id = ?").get(req.user.id, productId);
    
    if (!license) return res.status(403).json({ error: "No active license for this product" });

    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(productId) as { file_path: string } | undefined;
    if (!product) return res.status(404).json({ error: "Product not found" });

    const filePath = path.join(__dirname, product.file_path);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });

    res.download(filePath);
  });

  // --- Vite Setup ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

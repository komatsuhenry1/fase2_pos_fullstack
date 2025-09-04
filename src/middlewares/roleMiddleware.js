const roleMiddleware = (req, res, next) => {
    const role = req.headers["x-role"]; // pega o papel do usuário no header
    
    if (!role) {
      return res.status(400).json({ error: "Role header missing" });
    }
  
    if (role !== "admin" && role !== "student") {
      return res.status(403).json({ error: "Invalid role" });
    }
  
    req.role = role; // guarda no request para usar depois
    next();
  };

module.exports = { roleMiddleware };
const jwt = require('jsonwebtoken');

// Protege rotas que só o admin (sua prima) pode acessar
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // formato: "Bearer TOKEN"

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload; // disponibiliza os dados do admin nas próximas funções
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = { requireAuth };

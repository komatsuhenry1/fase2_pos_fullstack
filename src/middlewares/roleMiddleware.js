// Função que retorna um middleware para checar um perfil específico.
const authAdmin = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.headers['role']; // pega o valor do header

    if (!userRole) {
      return res.status(401).json({ error: 'role não encontrada' });
    }

    if (userRole === requiredRole) {
      next(); // next() permite e passa para a controller
    } else {
      return res.status(403).json({ error: 'Rota exclusiva para administradores.' });
    }
  };
};

const authUserAndAdmin = (req, res, next) => {
  const userRole = req.headers['role'];

  if (userRole && (userRole === 'admin' || userRole === 'user')) { // se user || admin
    next(); 
  } else {
    return res.status(401).json({ error: 'Rota exclusiva para users || admins' });
  }
};


module.exports = {
  authAdmin,
  authUserAndAdmin
};
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Llama al siguiente middleware o controlador
};

module.exports = logger;
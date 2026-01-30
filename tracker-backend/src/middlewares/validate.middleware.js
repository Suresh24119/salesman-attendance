/**
 * Request validation middleware.
 * Can be integrated with Joi or express-validator.
 */
module.exports = (schema) => (req, res, next) => {
    // Basic implementation: if schema is a list of required fields
    if (Array.isArray(schema)) {
        const missing = schema.filter(field => !req.body[field]);
        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missing.join(', ')}`
            });
        }
    }
    
    // In a real app:
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).json({ message: error.details[0].message });
    
    next();
};

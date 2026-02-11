export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const formatted = result.error.format();
        const flatErrors = Object.values(formatted)
          .flat()
          .filter(Boolean)
          .map((err) => err._errors)
          .flat();
        return res.status(400).json({ message: flatErrors.join(", ") });
      }
      next();
    } catch (error) {
      console.error("Error validating request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Guardians of the Quality – API",
    version: "0.1.0",
    description: "Epic API for battles of Quality Guardians against QA Bosses",
    contact: { name: "QA Guild", url: "https://example.com" }
  },
  servers: [{ url: "http://localhost:4000/api/v1", description: "Dev server" }]
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"]
};

export const swaggerSpec = swaggerJSDoc(options);

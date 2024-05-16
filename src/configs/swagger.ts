import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../../data/swagger.json");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "blog tech api",
      description: "Example of CRUD API ",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
        description: "Local development server",
      },
      {
        url: "http://blog-tech-api.vercel/",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  // looks for configuration in specified directories
  apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;

import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "Simple Notes API built with Node.js, Express, PostgreSQL"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./src/modules/**/*.ts"]
}

export const swaggerSpec = swaggerJsdoc(options)
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger/swagger_output.json'
const endpointsFiles = ['./routes.js']

swaggerAutogen(outputFile, endpointsFiles)
// const swaggerJsdoc = require('swagger-jsdoc');
// const glob = require('glob');

// // Import the generated Swagger specs for each router
// // const trainSpecs = require("../api/train"); // Replace with the path to your users router file

// const swaggerGlobPattern = '../api/train'; // Replace this with your actual glob pattern

// // Check if the swaggerGlobPattern is a valid string
// if (typeof swaggerGlobPattern !== 'string' || swaggerGlobPattern.trim() === '') {
//     console.error('Error: Invalid or empty glob pattern provided for Swagger.');
//     process.exit(1); // Optionally exit the process or handle the error accordingly
// }

// const trainSpecs = require(swaggerGlobPattern)
// // const trainSpecs = glob.sync("../api/*,js");

// // Merge all the specs into a single array
// const specs = [trainSpecs];

// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Your API Documentation',
//             version: '1.0.0',
//             description: 'Description of your API',
//         },
//     },
//     apis: specs,
// };

// const swaggerSpecs = swaggerJsdoc(options);

// module.exports = swaggerSpecs;

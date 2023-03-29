const aws = require("aws-sdk");

let config = {};

if (process.env.IS_OFFLINE) {
  config = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "DEFAULT_ACCESS_KEY", // needed if you don't have aws credentials at all in env
    secretAccessKey: "DEFAULT_SECRET", // needed if you don't have aws credentials at all in env
  };
}

const dynamodb = new aws.DynamoDB.DocumentClient(config);

const deleteUser = async (event, context) => {
  let id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  let params = {
    TableName: "usersTable",
    Key: { id: id },
  };

  return dynamodb
    .delete(params)
    .promise()
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify({ id: id }),
      };
    });
};

module.exports = {
  deleteUser,
};

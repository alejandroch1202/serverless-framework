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

const getUsers = async (event, context) => {
  let id = event.pathParameters.id;

  let params = {
    ExpressionAttributeValues: { ":id": id },
    KeyConditionExpression: "id = :id",
    TableName: "usersTable",
  };

  return dynamodb
    .query(params)
    .promise()
    .then((response) => {
      console.log(response);
      return {
        statusCode: 200,
        body: JSON.stringify(response.Items),
      };
    });
};

module.exports = {
  getUsers,
};

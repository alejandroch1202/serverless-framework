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

const updateUser = async (event, context) => {
  let id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  let params = {
    TableName: "usersTable",
    Key: { id: id },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeNames: { "#name": "name" },
    ExpressionAttributeValues: { ":name": body.name },
    ReturnValues: "ALL_NEW",
  };

  return dynamodb
    .update(params)
    .promise()
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response.Attributes),
      };
    });
};

module.exports = {
  updateUser,
};

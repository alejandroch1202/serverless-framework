const aws = require("aws-sdk");
const { randomUUID } = require("crypto");

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

const createUser = async (event, context) => {
  const id = randomUUID();

  let userBody = JSON.parse(event.body);
  userBody.id = id;

  let params = {
    TableName: "usersTable",
    Item: userBody,
  };

  console.log(params.Item);

  return dynamodb
    .put(params)
    .promise()
    .then((response) => {
      console.log(response);
      return {
        statusCode: 200,
        body: JSON.stringify({ user: params.Item }),
      };
    });
};

module.exports = {
  createUser,
};

// EXTERNAL
import AWS from "aws-sdk";
// import * as AWS from "aws-sdk";
AWS.config.update({ region: "eu-west-2" });

export const call = async (service: string, action: string, params: any) => {
  try {
    switch (service) {
      case "dynamoDb": {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        return await dynamoDb[action](params).promise();
      }
      case "s3": {
        const s3 = new AWS.S3();
        return await s3[action](params).promise();
      }
      case "apiGateway": {
        const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi();
        return await apigatewaymanagementapi[action](params).promise();
      }
      case "stepFunctions": {
        const stepFunctions = new AWS.StepFunctions();
        return await stepFunctions[action](params).promise();
      }
      default:
        throw new Error("No Service found.");
    }
  } catch (error) {
    throw error;
  }
};

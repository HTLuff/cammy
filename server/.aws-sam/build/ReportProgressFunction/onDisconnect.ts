import * as aws from "../../lib/aws";

export const handler = async (event: any) => {
  try {
    const connectionId = event.requestContext.connectionId;
    await removeConnection(connectionId);
    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: 400,
    };
  }
};

async function removeConnection(connectionId: string) {
  const params = {
    TableName: process.env.CONNECTION_TABLE_NAME,
    Item: {
      connectionId,
    },
  };
  await aws.call("dynamoDb", "deleteItem", params);
}

import * as aws from "../../lib/aws";

export const handler = async (event: any) => {
  try {
    const connectionId = event.requestContext.connectionId;
    const domainName = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    await addConnection(connectionId, domainName, stage);
    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: 400,
    };
  }
};

async function addConnection(
  connectionId: string,
  domainName: string,
  stage: string
) {
  const params = {
    TableName: process.env.CONNECTION_TABLE_NAME,
    Item: {
      connectionId,
      domainName,
      stage,
    },
  };
  await aws.call("dynamoDb", "putItem", params);
}

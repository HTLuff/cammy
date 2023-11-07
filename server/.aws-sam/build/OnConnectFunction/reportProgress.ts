import * as aws from "../../lib/aws";

export const handler = async (event: any) => {
  try {
    const connectionId = event.connectionId;
    await postToConnection(connectionId, JSON.stringify(event));
    return {
      connectionId,
    };
  } catch (error) {
    console.log(error);
    if (error.code === "410") {
      console.log(`Stale connection found, deleting ${event.connectionId}`);
      await removeConnection(event.connectionId);
    }
    return {
      connectionId: event.connectionId,
    };
  }
};

async function postToConnection(connectionId: string, data: string) {
  const params = {
    ConnectionId: connectionId,
    Data: data,
  };
  await aws.call("dynamoDb", "putItem", params);
}

async function removeConnection(connectionId: string) {
  const params = {
    ConnectionId: connectionId,
  };
  await aws.call("dynamoDb", "deleteItem", params);
}

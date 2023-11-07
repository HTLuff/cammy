import * as aws from "../../lib/aws";
import { v4 as uuidv4 } from "uuid";

export const handler = async (event: any) => {
  try {
    const connectionId = event.requestContext.connectionId;
    await startStepFunctionWorkflow(connectionId);
    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: 400,
    };
  }
};

async function startStepFunctionWorkflow(connectionId: string) {
  const params = {
    stateMachineArn: process.env.STEP_FUNCTIONS_ARN,
    name: uuidv4(),
    input: JSON.stringify({
      connectionId,
    }),
  };
  await aws.call("stepFunction", "startExecution", params);
}

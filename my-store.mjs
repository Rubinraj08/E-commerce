import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async () => {
    const params = { TableName: "Products" };
    const command = new ScanCommand(params);
    
    try {
        const data = await client.send(command);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",  // ✅ Allow CORS
                "Access-Control-Allow-Methods": "GET" 
            },
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },  // ✅ Ensure CORS in error response too
            body: JSON.stringify({ error: error.message })
        };
    }
};

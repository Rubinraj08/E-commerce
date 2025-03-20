import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDB());

export const handler = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);  // Parse request body
        const { id, name, price } = requestBody;

        if (!id || !name || !price) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing fields" }) };
        }

        const params = {
            TableName: "Products",
            Item: { id, name, price }
        };

        await client.send(new PutCommand(params));

        return {
            statusCode: 201,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"  // Enable CORS
            },
            body: JSON.stringify({ message: "Product added successfully!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: error.message })
        };
    }
};

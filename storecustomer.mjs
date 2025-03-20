import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: ""
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { name, email, address, phone, cart } = body;

        if (!name || !email || !address || !phone || !cart) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ error: "Missing required fields" })
            };
        }

        const orderId = `ORDER_${Date.now()}`;

        await docClient.send(new PutCommand({
            TableName: "Customers", // Replace with your table name
            Item: {
                orderId,
                customerId: email, // Using email as a unique customer identifier
                name,
                email,
                address,
                phone,
                cart,
                orderDate: new Date().toISOString(),
            }
        }));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ message: "Order stored successfully", orderId })
        };
    } catch (error) {
        console.error("Error storing order:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error: "Failed to store order" })
        };
    }
};

const { app } = require("@azure/functions");
const { BlobServiceClient } = require("@azure/storage-blob");

app.http("httpTrigger-download-resume", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const blobServiceClient = await BlobServiceClient.fromConnectionString(
      process.env.CONN_STRING
    );
    const containerClient = await blobServiceClient.getContainerClient(
      process.env.CONTAINER
    );
    const blobClient = await containerClient.getBlobClient(process.env.BLOB);
    const response = await blobClient.download(0);

    return {
      headers: {
        "Content-Type": response.contentType,
        "Content-Disposition": `attachment; filename="Ashish-Pandey-Resume.pdf"`,
      },
      body: response.readableStreamBody,
    };
  },
});

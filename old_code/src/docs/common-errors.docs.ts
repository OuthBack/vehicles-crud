export const commonErrorsDocs = {
  405: {
    description: "Method not allowed.",
    content: {
      "application/json": {
        examples: {
          "Method not allowed": {
            value: {
              message: "Method not allowed.",
            },
          },
        },
      },
    },
  },
  500: {
    description: "An error occurred in our server.",
    content: {
      "application/json": {
        examples: {
          "Invalid query parameters": {
            value: {
              message: "An error occurred in our server.",
            },
          },
        },
      },
    },
  },
};

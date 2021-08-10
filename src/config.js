const config = {
    s3: {
        REGION: "us-east-1",
        BUCKET: "notes-app-upload-shraman",
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://68bgxk8u0k.execute-api.us-east-1.amazonaws.com/prod/"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_adyGQJ5hI",
        APP_CLIENT_ID: "5gub5kfnl7e4mnkmtre5pdlfbl",
        IDENTITY_POOL_ID: "us-east-1:8263b009-810d-48fd-a81c-e3015bc1e380",
    },
};

export default config;
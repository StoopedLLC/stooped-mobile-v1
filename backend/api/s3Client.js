/*
This module contains the AWS S3 client.
It acts as an interface between the frontend and the AWS S3 storage.
*/

import {
    S3Client
  } from "@aws-sdk/client-s3";
  import { CognitoIdentityClient} from "@aws-sdk/client-cognito-identity";
  import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";


// XXX: promote all configuration settings into environment variables
// Replace REGION with the appropriate AWS Region, such as 'us-east-1'.
const region = "us-east-2";
const client = new S3Client({
  region,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region }),
    // Replace IDENTITY_POOL_ID with an appropriate Amazon Cognito Identity Pool ID for, such as 'us-east-1:xxxxxx-xxx-4103-9936-b52exxxxfd6'.
    identityPoolId: "us-east-2:499cc615-a45a-4fdc-8da3-61691f01722c",
  }),
});

export default client;

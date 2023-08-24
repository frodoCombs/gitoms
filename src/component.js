/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

async function predict(text) {
  // [START aiplatform_predict_text_classification_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  const prediction_text = 'This is some woke ass nonsense ';
  const endpointId = '3075538532052238336';
  const project = '14033224277';
  const location = 'us-central1';
  const aiplatform = require('@google-cloud/aiplatform');
  const {instance, prediction} =
    aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;

  // Imports the Google Cloud Model Service Client library
  const {PredictionServiceClient} = aiplatform.v1;

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  async function predictTextClassification() {
    // Configure the resources
    const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

    const predictionInstance =
      new instance.TextClassificationPredictionInstance({
        content: prediction_text,
      });
    const instanceValue = predictionInstance.toValue();

    const instances = [instanceValue];
    const request = {
      endpoint,
      instances,
    };

    const [response] = await predictionServiceClient.predict(request);
    console.log('Predict text classification response');
    console.log(`\tDeployed model id : ${response.deployedModelId}\n\n`);

    console.log('Prediction results:');

    for (const predictionResultValue of response.predictions) {
      const predictionResult =
        prediction.ClassificationPredictionResult.fromValue(
          predictionResultValue
        );

      for (const [i, label] of predictionResult.displayNames.entries()) {
        console.log(`\tDisplay name: ${label}`);
        console.log(`\tConfidences: ${predictionResult.confidences[i]}`);
        console.log(`\tIDs: ${predictionResult.ids[i]}\n\n`);
      }
    }
  }
  predictTextClassification();
  // [END aiplatform_predict_text_classification_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

predict(...process.argv.slice(2));
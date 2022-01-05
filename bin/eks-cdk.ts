#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {EksCdkStack} from '../lib/eks-cdk-stack';

const account = '617995924773';

const env = {
  region: 'ap-northeast-1',
  account: account,
};

const app = new cdk.App();
new EksCdkStack(app, 'EksCdkStack', {
  env: env,
});

app.synth();
import * as cdk from '@aws-cdk/core';
import {AccountRootPrincipal, ManagedPolicy, Role, ServicePrincipal} from "@aws-cdk/aws-iam";
import {Cluster, KubernetesVersion} from "@aws-cdk/aws-eks";
import {Vpc} from "@aws-cdk/aws-ec2";
import {Tags} from "@aws-cdk/core";

export class EksCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = Vpc.fromLookup(this, 'Vpc', {
      vpcName: 'morningcode-main-vpc',
    });

    const eksAdminRole = new Role(this, 'EksAdminRole', {
      roleName: 'eks-admin-role',
      assumedBy: new AccountRootPrincipal(),
    });

    // IAM Role for EKS
    const eksRole = new Role(this, 'EksRole', {
      roleName: 'eks-role',
      assumedBy: new ServicePrincipal('eks.amazonaws.com')
    });
    eksRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSClusterPolicy'));
    eksRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSServicePolicy'));

    // EKS Cluster
    const cluster = new Cluster(this, 'cluster', {
      vpc: vpc,
      role: eksRole,
      mastersRole: eksAdminRole,
      clusterName: 'morningcode',
      version: KubernetesVersion.V1_21,
    });

    cluster.addFargateProfile('FargateProfile', {
      fargateProfileName: 'morningcode-eks-fargate-profile',
      selectors: [{namespace: 'default'}],
    });

    Tags.of(this).add('ServiceName', 'morningcode');
  }
}

import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class CdkTypescriptStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    // Definir el sintetizador personalizado
    const synthesizer = new cdk.DefaultStackSynthesizer({
      fileAssetsBucketName: "cf-templates-a7t5ukt2vf0j-us-east-1",
      deployRoleArn: "arn:aws:iam::829361583088:role/LabRole",
      cloudFormationExecutionRole: "arn:aws:iam::829361583088:role/LabRole",
      fileAssetPublishingRoleArn: "arn:aws:iam::829361583088:role/LabRole",
      deployRoleExternalId: "arn:aws:iam::829361583088:role/LabRole",
      imageAssetPublishingRoleArn: "arn:aws:iam::829361583088:role/LabRole",
    });

    super(scope, id, {
      synthesizer,
      ...props,
    });

    // VPC existente
    const existingVpc = ec2.Vpc.fromVpcAttributes(this, 'ExistingVPC', {
      vpcId: 'vpc-030c687c141f4335e',
      availabilityZones: ['us-east-1b', 'us-east-1e'],
      publicSubnetIds: ['subnet-0abdebf80548bab6a', 'subnet-00fb6887337bc4bb2']
    });

    // Security Group existente
    const securityGroup1 = ec2.SecurityGroup.fromSecurityGroupId(this, 'SG1', 'sg-00126df5add75d7aa');

    // Crear User Data para Linux
    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      "git clone https://github.com/RodrigoLiC/webplantilla.git /var/www/html/webplantilla",
      "git clone https://github.com/RodrigoLiC/websimple.git /var/www/html/websimple"
    );

    // Crear instancia EC2
    const instance = new ec2.Instance(this, 'cdkTypescriptInstance', {
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: ec2.MachineImage.genericLinux({
        'us-east-1': 'ami-0aa28dab1f2852040',
      }),
      vpc: existingVpc,
      securityGroup: securityGroup1,
      associatePublicIpAddress: true,
      keyName: 'vockey',
      role: iam.Role.fromRoleArn(this, 'InstanceRole', 'arn:aws:iam::829361583088:role/LabRole'),
      userData: userData,
    });

    // Salidas
    new cdk.CfnOutput(this, 'InstanceId', {
      value: instance.instanceId,
      description: 'ID de la instancia EC2',
    });

    new cdk.CfnOutput(this, 'InstancePublicIP', {
      value: instance.instancePublicIp,
      description: 'IP pública de la instancia EC2',
    });
  }
}



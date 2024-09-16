"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkTypescriptStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const ec2 = require("aws-cdk-lib/aws-ec2");
const iam = require("aws-cdk-lib/aws-iam");
class CdkTypescriptStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
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
        userData.addCommands("git clone https://github.com/RodrigoLiC/webplantilla.git /var/www/html/webplantilla", "git clone https://github.com/RodrigoLiC/websimple.git /var/www/html/websimple");
        // Crear instancia EC2
        const instance = new ec2.Instance(this, 'cdkTypescriptInstance', {
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: ec2.MachineImage.genericLinux({
                'us-east-1b': 'ami-0655c55da1774839a',
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
exports.CdkTypescriptStack = CdkTypescriptStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrX2Nsb3VkLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrX2Nsb3VkLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQyw2Q0FBZ0Q7QUFDaEQsMkNBQTJDO0FBQzNDLDJDQUEyQztBQUczQyxNQUFhLGtCQUFtQixTQUFRLG1CQUFLO0lBQzNDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsd0NBQXdDO1FBQ3hDLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLHVCQUF1QixDQUFDO1lBQ2xELG9CQUFvQixFQUFFLHFDQUFxQztZQUMzRCxhQUFhLEVBQUUsd0NBQXdDO1lBQ3ZELDJCQUEyQixFQUFFLHdDQUF3QztZQUNyRSwwQkFBMEIsRUFBRSx3Q0FBd0M7WUFDcEUsb0JBQW9CLEVBQUUsd0NBQXdDO1lBQzlELDJCQUEyQixFQUFFLHdDQUF3QztTQUN0RSxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNmLFdBQVc7WUFDWCxHQUFHLEtBQUs7U0FDVCxDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ2pFLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsaUJBQWlCLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1lBQy9DLGVBQWUsRUFBRSxDQUFDLDBCQUEwQixFQUFFLDBCQUEwQixDQUFDO1NBQzFFLENBQUMsQ0FBQztRQUVILDJCQUEyQjtRQUMzQixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVsRyw2QkFBNkI7UUFDN0IsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxRQUFRLENBQUMsV0FBVyxDQUNsQixxRkFBcUYsRUFDckYsK0VBQStFLENBQ2hGLENBQUM7UUFFRixzQkFBc0I7UUFDdEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUMvRCxZQUFZLEVBQUUsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUM5QyxZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0JBQzFDLFlBQVksRUFBRSx1QkFBdUI7YUFDdEMsQ0FBQztZQUNGLEdBQUcsRUFBRSxXQUFXO1lBQ2hCLGFBQWEsRUFBRSxjQUFjO1lBQzdCLHdCQUF3QixFQUFFLElBQUk7WUFDOUIsT0FBTyxFQUFFLFFBQVE7WUFDakIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsd0NBQXdDLENBQUM7WUFDMUYsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsVUFBVTtRQUNWLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3BDLEtBQUssRUFBRSxRQUFRLENBQUMsVUFBVTtZQUMxQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3RDLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDMUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0I7WUFDaEMsV0FBVyxFQUFFLGdDQUFnQztTQUM5QyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEzREQsZ0RBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgZWMyIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBDZGtUeXBlc2NyaXB0U3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIC8vIERlZmluaXIgZWwgc2ludGV0aXphZG9yIHBlcnNvbmFsaXphZG9cbiAgICBjb25zdCBzeW50aGVzaXplciA9IG5ldyBjZGsuRGVmYXVsdFN0YWNrU3ludGhlc2l6ZXIoe1xuICAgICAgZmlsZUFzc2V0c0J1Y2tldE5hbWU6IFwiY2YtdGVtcGxhdGVzLWE3dDV1a3QydmYwai11cy1lYXN0LTFcIixcbiAgICAgIGRlcGxveVJvbGVBcm46IFwiYXJuOmF3czppYW06OjgyOTM2MTU4MzA4ODpyb2xlL0xhYlJvbGVcIixcbiAgICAgIGNsb3VkRm9ybWF0aW9uRXhlY3V0aW9uUm9sZTogXCJhcm46YXdzOmlhbTo6ODI5MzYxNTgzMDg4OnJvbGUvTGFiUm9sZVwiLFxuICAgICAgZmlsZUFzc2V0UHVibGlzaGluZ1JvbGVBcm46IFwiYXJuOmF3czppYW06OjgyOTM2MTU4MzA4ODpyb2xlL0xhYlJvbGVcIixcbiAgICAgIGRlcGxveVJvbGVFeHRlcm5hbElkOiBcImFybjphd3M6aWFtOjo4MjkzNjE1ODMwODg6cm9sZS9MYWJSb2xlXCIsXG4gICAgICBpbWFnZUFzc2V0UHVibGlzaGluZ1JvbGVBcm46IFwiYXJuOmF3czppYW06OjgyOTM2MTU4MzA4ODpyb2xlL0xhYlJvbGVcIixcbiAgICB9KTtcblxuICAgIHN1cGVyKHNjb3BlLCBpZCwge1xuICAgICAgc3ludGhlc2l6ZXIsXG4gICAgICAuLi5wcm9wcyxcbiAgICB9KTtcblxuICAgIC8vIFZQQyBleGlzdGVudGVcbiAgICBjb25zdCBleGlzdGluZ1ZwYyA9IGVjMi5WcGMuZnJvbVZwY0F0dHJpYnV0ZXModGhpcywgJ0V4aXN0aW5nVlBDJywge1xuICAgICAgdnBjSWQ6ICd2cGMtMDMwYzY4N2MxNDFmNDMzNWUnLFxuICAgICAgYXZhaWxhYmlsaXR5Wm9uZXM6IFsndXMtZWFzdC0xYicsICd1cy1lYXN0LTFlJ10sXG4gICAgICBwdWJsaWNTdWJuZXRJZHM6IFsnc3VibmV0LTBhYmRlYmY4MDU0OGJhYjZhJywgJ3N1Ym5ldC0wMGZiNjg4NzMzN2JjNGJiMiddXG4gICAgfSk7XG5cbiAgICAvLyBTZWN1cml0eSBHcm91cCBleGlzdGVudGVcbiAgICBjb25zdCBzZWN1cml0eUdyb3VwMSA9IGVjMi5TZWN1cml0eUdyb3VwLmZyb21TZWN1cml0eUdyb3VwSWQodGhpcywgJ1NHMScsICdzZy0wMDEyNmRmNWFkZDc1ZDdhYScpO1xuXG4gICAgLy8gQ3JlYXIgVXNlciBEYXRhIHBhcmEgTGludXhcbiAgICBjb25zdCB1c2VyRGF0YSA9IGVjMi5Vc2VyRGF0YS5mb3JMaW51eCgpO1xuICAgIHVzZXJEYXRhLmFkZENvbW1hbmRzKFxuICAgICAgXCJnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL1JvZHJpZ29MaUMvd2VicGxhbnRpbGxhLmdpdCAvdmFyL3d3dy9odG1sL3dlYnBsYW50aWxsYVwiLFxuICAgICAgXCJnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL1JvZHJpZ29MaUMvd2Vic2ltcGxlLmdpdCAvdmFyL3d3dy9odG1sL3dlYnNpbXBsZVwiXG4gICAgKTtcblxuICAgIC8vIENyZWFyIGluc3RhbmNpYSBFQzJcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBlYzIuSW5zdGFuY2UodGhpcywgJ2Nka1R5cGVzY3JpcHRJbnN0YW5jZScsIHtcbiAgICAgIGluc3RhbmNlVHlwZTogbmV3IGVjMi5JbnN0YW5jZVR5cGUoJ3QyLm1pY3JvJyksXG4gICAgICBtYWNoaW5lSW1hZ2U6IGVjMi5NYWNoaW5lSW1hZ2UuZ2VuZXJpY0xpbnV4KHtcbiAgICAgICAgJ3VzLWVhc3QtMWInOiAnYW1pLTA2NTVjNTVkYTE3NzQ4MzlhJyxcbiAgICAgIH0pLFxuICAgICAgdnBjOiBleGlzdGluZ1ZwYyxcbiAgICAgIHNlY3VyaXR5R3JvdXA6IHNlY3VyaXR5R3JvdXAxLFxuICAgICAgYXNzb2NpYXRlUHVibGljSXBBZGRyZXNzOiB0cnVlLFxuICAgICAga2V5TmFtZTogJ3ZvY2tleScsXG4gICAgICByb2xlOiBpYW0uUm9sZS5mcm9tUm9sZUFybih0aGlzLCAnSW5zdGFuY2VSb2xlJywgJ2Fybjphd3M6aWFtOjo4MjkzNjE1ODMwODg6cm9sZS9MYWJSb2xlJyksXG4gICAgICB1c2VyRGF0YTogdXNlckRhdGEsXG4gICAgfSk7XG5cbiAgICAvLyBTYWxpZGFzXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0luc3RhbmNlSWQnLCB7XG4gICAgICB2YWx1ZTogaW5zdGFuY2UuaW5zdGFuY2VJZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnSUQgZGUgbGEgaW5zdGFuY2lhIEVDMicsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnSW5zdGFuY2VQdWJsaWNJUCcsIHtcbiAgICAgIHZhbHVlOiBpbnN0YW5jZS5pbnN0YW5jZVB1YmxpY0lwLFxuICAgICAgZGVzY3JpcHRpb246ICdJUCBww7pibGljYSBkZSBsYSBpbnN0YW5jaWEgRUMyJyxcbiAgICB9KTtcbiAgfVxufSJdfQ==
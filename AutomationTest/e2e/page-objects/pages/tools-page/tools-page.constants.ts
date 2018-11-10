export class ToolsPageConstants {
    static readonly toolsDropDownId = 'tools-dropdown';
    static readonly toolsDropDownContentId = 'tools-dropdown-content';

    static get optionsUnderToolsSection() {
        return {
            dashboard: 'Dashboard',
            sshPublicKeys: 'SSH Public Keys',
            sslCertificates: 'SSL Certificates',
            ipAddresses: 'IP Addresses',
            snapshots: 'Snapshots',
            earlyAccess: 'Early Access',
            classicLoadBalancers: 'Classic Load Balancers',
            networks: 'Networks',
            manageBlueprints: 'Manage Blueprints',
            auditReport: 'Audit Report',
        };
    }

    static get existingNetworks() {
        return {
            defaultNetwork: 'Default network',
            net: 'Auto_'
        };
    }

    static get buttonText() {
        return {
            addNetwork: 'Add Network',
            createNetwork: 'Create Network',
            delete: 'Delete',
            deleteSnapshots: 'Delete snapshots',
            addClassicLoadBalancer: 'Add Classic Load Balancer',
            createClassicLoadBalancer: 'Create Classic Load Balancer',
            addRawEC2Network: 'Add Raw EC2 Environment'
        };
    }

    static get hrefText() {
        return {
            addNetwork: '/accounts/1/networks/new',
        };
    }

    static get pageHeader() {
        return {
            newNetwork: 'New Network',
            earlyAccessManageFeatures: 'Manage Early Access Features',
            noLoadBalancers: 'No load balancers',
            newLoadBalancer: 'New Classic Load Balancer',
            createNewRawRC2Env: 'Create New Raw EC2 Environment for sunset-staging'
        };
    }

    static get networkFieldsText() {
        return {
            location: 'US East (N. Virginia)',
            networkTenancy: 'default',
            cidr: '10.0.0.0/16',
            messageSuccess: 'message success',
            locationVPCNotEnabled: 'US East (N. Virginia) (VPC not enabled)',
            networksNotEnabled: 'vpc-4afe1332 rz_test - us-east-1',
            settings: 'Settings',
            awsNameNotEnabled: 'vpc-4afe1332',
            cidrSubnet: '10.0',
            amazonId: 'ey-',
            locationVPCEnabled: 'US East (Ohio) (VPC enabled)',
            networksEnabled: 'vpc-55cf513d test_eip - us-east-2',
            awsNameEnabled: 'vpc-55cf513d'
        };
    }

    static get provisioningMessage() {
        return {
            message: 'Currently provisioning a network for account sunset-staging in us-east-1',
            test: 'test',
            awsMessage: '(AWS Classic Load Balancer)',
            status: 'Provisioning'
        };
    }

    static get earlyAccessList() {
        return {
            accountDashboard: 'Account dashboard',
            addDBMaster: 'Add db master',
            addRemoveAPI: 'Add remove api',
            addRemoveCluster: 'Add remove cluster',
            allowEBSEncryption: 'Allow ebs encryption',
            allowStackSelect: 'Allow stack select',
            apache: 'Apache',
            appSlaveAddress: 'App slave address',
            appFirstEnabled: 'Appfirst enabled',
            asyncDashboard: 'Async dashboard',
            autoScaling: 'Auto scaling',
            autoClusterUpdate: 'Auto-cluster-update',
            awsVolumeOptimized: 'Aws volume optimized',
            azureNorthEurope: 'Azure north europe',
            dashBoardPaging: 'Dashboard paging',
            ruby220: 'Ruby 220',
            ruby220_1: 'ruby_220',
            text: 'Encrypted'
        };
    }

    static get accessFeatureSelector() {
        return {
            featureClass: 'switch disable',
            homePageClass: 'picons-home',
            text: 'todosai1',
            rubyValue: 'Rails 4'
        };
    }

    static get existingSnapshot() {
        return {
            environmentOne: 'demo_M09_10_staging',
            environmentTwo: 'demo_M01_02_staging',
            environmentThree: 'demo_M01_01_staging',
            environmentFour: 'Testappkee1',
            environmentFive: 'Auto_App_TestAppDemo2'
        };
    }

    static get checkBoxSelectors() {
        return {
            destroyClass: 'destroy',
            checkboxId: 'snapshots_',
        };
    }
}

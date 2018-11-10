export class ConfigurationPageConstants {

    static get configurationDropDownsSelectors() {
        return {
            instanceSizeId: 'cluster_configuration_default_instance_size',
            selectBlueprintsId: 'uniform-select_blueprints',
            externalAddressesId: 'uniform-cluster_configuration_ip_id'
        };
    }

    static get configurationDropDownValues() {
        return {
            mFourLarge: 'm4.large - General Purpose (M4) Large',
            mFourSmall: 'm1.small - General Purpose (M1) Small (64 bit)'
        };
    }

    static get configurationRadioButtonSelectors() {
        return {
            singleInstanceId: 'uniform-configuration_single',
            stagingConfigurationId: 'uniform-configuration_cluster',
            customConfigurationId: 'uniform-configuration_custom'
        };
    }

    static get automationPrefix() {
        return {
            autoAppPrefix: 'App2',
            autoEnvPrefix: 'Env2',
            autoAppPrefixDel: 'App1',
            autoEnvPrefixDel: 'Env1'
        };
    }

    static get externalAddressDropdown() {
        return {
            ipAddress: 'cluster_configuration_ip_id',
        };
    }

    static get externalAddressDropdownValue() {
        return {
            value: 'Use public hostname',
        };
    }

    static get bootConfigButton() {
        return {
            text: 'Boot This Configuration',
        };
    }

    static get iconClassSelector() {
        return {
            name: 'icon status starting',
            greenName: 'icon status running tooltip'
        };
    }

    static get linkText() {
        return {
            terminate: 'Terminate',
            noInstances: 'No Instances running',
        };
    }

    static get alertMessage() {
        return {
            alertText: 'Terminating this environment',
            alertTextDelete: 'Are you sure? This will delete all volumes and snapshots',
            alertTextAppDelete: 'Are you sure you want to delete'
        };
    }

    static get verifyMessage() {
        return {
            deleteEnvMsg: 'You have no environments for this app'
        };
    }

}

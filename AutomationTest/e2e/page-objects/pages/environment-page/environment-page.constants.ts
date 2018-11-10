export class EnvironmentPageConstants {
    static get createEnvironmentTextBoxesIds() {
        return {
            environmentNameId: 'environment_name'
        };
    }

    static get createEnvironmentDropDownsIds() {
        return {
            railsEnvironmentId: 'framework_env',
            railEnvironmentId: 'uniform-framework_env',
            runtimeEnvironmentId: 'uniform-environment_ruby_version',
            rubyGemsId: 'uniform-environment_rubygems_version'
        };
    }

    static get createEnvironmentDropDownValues() {
        return {
            staging: 'staging'
        };
    }

    static get createEnvironmentButtonsIds() {
        return {
            createEnvironmentId: 'create-environment-button'
        };
    }

    static get autoScalingFormLabels() {
        return {
            minimumSizeTextBox: 'Minimum Size',
            maximumSizeTextBox: 'Maximum Size',
            healthCheckGracePeriodTextBox: 'Health Check Grace Period',
            defaultCooldownTextBox: 'Default Cooldown',
        };
    }

    static get breadCrumbText() {
        return {
            breadCrumbApplication: 'todoappsai',
            breadCrumbOrgEnvironment: 'SaiStgEnv',
        };
    }

    static get EnvironmentButtons() {
        return {
            createAutoScalingGroup: 'Create Auto Scaling Group'
        };
    }

    static get autoScalingGroupvalidationMessage() {
       return {
            minimumEmptyValidationMessage: 'Form submission failed because of 2 problems Minimum size:',
            minimumZeroValidationMessage: 'Form submission failed because of 1 problems Minimum Size must be greater than zero.',
            minimumStringValidationMessage: 'Form submission failed because of 2 problems Minimum size:',
            maxGreaterThanMinValidationMessage: 'Form submission failed because of 1 problem Maximum size:',
            minMaxEqualValidationMessage: 'Form submission failed because of 1 problem Maximum size: must be greater than 5.',
            FloatValueHealthCheckGracePeriodValidationMessage: 'Please select a valid value.The two nearest valid values are 500 and 501.',
            spacesDefaultCooldownValidationMessage: 'Please enter a number.'
        };
    }

    static get verifyHelpboxSelector() {
        return {
            showHelperBoxClass: 'popover-content',
            messageAttentionClass: 'message attention',
            messageErrorClass: 'message error'
        };
    }

    static get verifyBoxesMessage() {
        return {
            showHelperBoxMsg: 'have an app yet, choose the language you want to check out first ...      we have a sample app for you!',
            showHelperBoxMsgForGit: 'public git repository URI.',
            showHelperBoxAppName: 'You cannot change the application name later.',
        };
    }

    static get verifyMessages() {
        return {
            messageFormSubmission: 'Form submission failed because of the following problems',
            messageApp: 'be blank',
            messageGitRepo: 'Git Repository URI',
            messageFormSubmission1: 'Form submission failed because of 1 problem',
            messageEnvName: 'Environment Name Environment name',
        };
    }

    static get inputValue() {
        return {
            environmentNameInput: '',
            minvalue: '1',
            maxvalue: '10',
            emptyName: '',
            targetvalue: '75',
            name255: 'Ex: This Name value is having more than 255 Characters - ' +
            'If you do not believe you can copy this text and paste it in a New Microsoft Word document' +
            '_Select the text and go to Review tab and click on WordCount to find out the number of characters in this Name string',
            name: 'Test_SimplePolicy1'
        };
    }

    static get railsEnvironmentDropDown() {
        return {
            development: 'development',
            production: 'production',
            staging: 'staging',
            customEnvironment: 'custom environment...',
        };
    }

    static get applicationStackServerDropDown() {
        return {
            optionValue: 'Passenger 4',
            optionValueOne: 'Passenger 3'
        };
    }

    static get runtimeDropDown() {
        return {
            optionValue: 'Ruby 1.9.3',
            optionValueOne: 'Ruby 2.0.0',
            optionValueTwo: 'Ruby 2.1',
            optionValueThree: 'Ruby 2.2',
            optionValueFour: 'Ruby 2.3',
            optionValueFive: 'Custom',
        };
    }

    static get environmentNameTextBox() {
        return {
            environmentNameTextBoxId: 'environment_name',
        };
    }

    static get rubyGemsDropDown() {
        return {
            optionValue: '1.5.3',
            optionValueOne: '1.8.23.2',
            optionValueTwo: '1.8.30',
            optionValueThree: '2.0.17',
            optionValueFour: '2.2.5',
            optionValueFive: '2.4.8',
            optionValueSix: '2.6.4'
        };
    }

    static get databaseProviderDropdownoptions() {
        return {
            engineyard: 'Engine Yard',
            noprovider: 'No Provider',
            amazonrds: 'Amazon RDS',
            target: 'Target'
        };
    }

    static get checkBoxes() {
        return {
            databaseVersioning: 'Database Versioning',
        };
    }

    static get environmentLinkSelector() {
        return {
            text: 'demo_M01_01_staging',
            autoscaling: 'Auto Scaling',
            addNew: 'Add New',
            textNew: 'Testappkee1'
        };
    }

    static get policyText() {
        return {
            name: 'Name',
            metricType: 'Metric Type',
            targetValue: 'Target Value',
            warmUpPeriod: 'Warm-up Period',
            simplePolicyText: 'Simple',
            classText: 'field-content medium',
            aggregation: 'Aggregation',
            metric: 'Metric',
            operand: 'Operand',
            triggerValue: 'Trigger Value',
            noOfPeriods: 'Number of Periods',
            periodLength: 'Period Length',
            action: 'Action',
            actionunit: 'Action Unit',
            actionValue: 'Action Value',
            coolDown: 'Cooldown',
            policyControls: 'policy-controls',
            create: 'Create',
            simplePolicyName: '- (Simple)',
            editText: 'Edit',
            deleteText: 'Delete',
            edit: 'policy-action edit-policy',
            delete: 'policy-action delete-policy',
            alarm: 'Alarm'
        };
    }

    static get environmentURL(){
        return {
            awsDocumentationURL: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html',
        };
    }

    static get awsPageHeader(){
        return {
            text: 'Amazon EC2 Auto Scaling ',
        };
    }

}

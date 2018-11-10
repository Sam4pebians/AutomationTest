import {SuiteNames} from '../../helpers/suite-names';
import {HomePage} from '../../../page-objects/pages/home-page/home.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {HomePageHelper} from '../../../page-objects/pages/home-page/home-page.helper';
import {ElementHelper} from '../../../components/html/element-helper';
import {PageHelper} from '../../../components/html/page-helper';
import {ConfigurationPage} from '../../../page-objects/pages/configuration-page/configuration.po';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {ConfigurationPageConstants} from '../../../page-objects/pages/configuration-page/configuration-page.constants';
import {ConfigurationPageHelper} from '../../../page-objects/pages/configuration-page/configuration-page.helper';
import {CommonPageConstants} from '../../../page-objects/pages/common/common-page.constants';
import {CommonPageHelper} from '../../../page-objects/pages/common/common-page.helper';
import {CommonLabel} from '../../../components/misc-utils/common-label';
const shortId = require('../../../components/misc-utils/shortid');

describe(SuiteNames.eySmokeSuite, () => {
    let homePage: HomePage;

    beforeEach(async () => {
        homePage = new HomePage();
        await homePage.goTo();
        await HomePageHelper.verifyLoginPage();
        await HomePageHelper.loginToApp();
        await HomePageHelper.verifyEngineYardCloudPage();
    });

    afterEach(async () => {
        // *Step* - Logout from application
        await HomePageHelper.logout();
    });

    it('Verify the Environment options available in "Environment setup" page - [1319070]', async () => {
        const stepLogger = new StepLogger(1319070);
        const applicationName = CommonPageConstants.autoPrefix.prefix + shortId.generate();
        const environmentName = CommonPageConstants.autoPrefix.prefix + shortId.generate();
        stepLogger.preCondition('create environment, application and navigate to configuration page');
        await HomePageHelper.createApplicationEnvironmentAndNavigateToConfigurationPage(applicationName, environmentName, stepLogger);
        const instanceSizeValue = ConfigurationPageConstants.configurationDropDownValues.mFourLarge;

        stepLogger.stepId(1);
        stepLogger.step('Check the value selected in "Instance Size:" drop down');
        stepLogger.verification('verify default value in "Instance Size:" drop down');
        await expect(await PageHelper.getText(await ElementHelper.getSelectedOption(
            ConfigurationPage.configurationDropDowns.instanceSize))).toBe(
            instanceSizeValue, ValidationsHelper.getDisplayedValidation(instanceSizeValue));

        await ConfigurationPageHelper.verifyRadioButtonsOnConfigurationPage(stepLogger);

        stepLogger.stepId(3);
        stepLogger.step('Select the radio button "Custom Configuration"');
        await PageHelper.click(ConfigurationPage.configurationRadioButton.customConfiguration);

        stepLogger.verification('When the radio button "Custom Configuration" is additional fields displayed ' +
            'to enable to use custom configuration values');
        await expect(await PageHelper.isElementDisplayed(ConfigurationPage.configurationDropDowns.selectBlueprints)).toBe(
            true, ValidationsHelper.getDisplayedValidation(ConfigurationPageConstants.configurationDropDownsSelectors.selectBlueprintsId));

        stepLogger.verification('When the radio button "Custom Configuration" is additional fields displayed ' +
            'to enable to use custom configuration values');
        await expect(await PageHelper.isElementDisplayed(ConfigurationPage.configurationDropDowns.externalAddresses)).toBe(
            true, ValidationsHelper.getDisplayedValidation(ConfigurationPageConstants.configurationDropDownsSelectors.externalAddressesId));

        stepLogger.step('Select the radio button "Custom Configuration"');
        await PageHelper.click(ConfigurationPage.configurationRadioButton.stagingConfiguration);
    });

    it('Verify "Cancel" button functionality in "Configuration Page" - [1319117]', async () => {
        const stepLogger = new StepLogger(1319117);
        const applicationName = CommonPageConstants.autoPrefix.prefix + shortId.generate();
        const environmentName = CommonPageConstants.autoPrefix.prefix + shortId.generate();
        stepLogger.preCondition('create environment, application and navigate to configuration page');
        await HomePageHelper.createApplicationEnvironmentAndNavigateToConfigurationPage(applicationName, environmentName, stepLogger);
        const instanceSizeValue = ConfigurationPageConstants.configurationDropDownValues.mFourLarge;

        stepLogger.stepId(1);
        stepLogger.verification('verify instance size drop down value');
        await expect(await PageHelper.getText(await ElementHelper.getSelectedOption(
            ConfigurationPage.configurationDropDowns.instanceSize))).toBe(
            instanceSizeValue, ValidationsHelper.getDisplayedValidation(instanceSizeValue));

        stepLogger.stepId(2);
        stepLogger.step('Select the radio button "Single Instance"');
        await PageHelper.click(ConfigurationPage.configurationRadioButton.singleInstance);

        stepLogger.stepId(3);
        stepLogger.step('Scroll down in "Configuration Page" and Click on "Cancel" button');
        await PageHelper.click(CommonPageHelper.buttons.cancel);

        stepLogger.verification('"Environment" page is displayed');
        await expect(await PageHelper.isElementDisplayed(CommonPageHelper.pageHeaders.environment)).toBe(
            true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.pageHeaders.environment));

        stepLogger.verification('"Environment" page is displayed with boot option');
        await expect(await PageHelper.isElementDisplayed(CommonPageHelper.buttons.boot)).toBe(
            true, ValidationsHelper.getDisplayedValidation(CommonLabel.bootlLabel));

        stepLogger.verification('"Environment" page is displayed with delete option');
        await expect(await PageHelper.isElementDisplayed(CommonPageHelper.buttons.deleteButton)).toBe(
            true, ValidationsHelper.getDisplayedValidation(CommonLabel.deleteLabel));
    });
});

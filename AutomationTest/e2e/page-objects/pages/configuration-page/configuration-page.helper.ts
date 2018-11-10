import {StepLogger} from '../../../../core/logger/step-logger';
import {PageHelper} from '../../../components/html/page-helper';
import {ConfigurationPage} from './configuration.po';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {ConfigurationPageConstants} from './configuration-page.constants';
import {CommonPageConstants} from '../common/common-page.constants';
import {CommonPageHelper} from '../common/common-page.helper';
import {CommonPage} from '../common/common.po';
import {HomePageHelper} from '../home-page/home-page.helper';
import {browser} from 'protractor';
import {DropDownHelper} from '../../../components/html/dropdown-helper';
import {ApplicationPageHelper} from '../application-page/application-page.helper';

const applicationNameNew = CommonPageConstants.autoPrefix.prefix + ConfigurationPageConstants.automationPrefix.autoAppPrefix;
const environmentNameNew = CommonPageConstants.autoPrefix.prefix + ConfigurationPageConstants.automationPrefix.autoEnvPrefix;

export class ConfigurationPageHelper {

    static getEnvironmentLinkUsingName(environmentName: string) {
        return CommonPage.getAnchorByText(environmentName);
    }

    static async verifyConfigurationPage(environmentName: string, stepLogger: StepLogger) {
        stepLogger.step('"Configuration Page" for newly created environment displayed');
        await expect(await PageHelper.isElementDisplayed(CommonPageHelper.pageHeaders.configuration)).toBe(
            true, ValidationsHelper.getDisplayedValidation(CommonPageConstants.pageHeaders.configuration));

        stepLogger.verification('A bread crumb link with selected Environment name [Ex: SaiStgEnv] is ' +
            'displayed on right side of "Application" link on top of this page');
        await expect(await PageHelper.isElementDisplayed(ConfigurationPageHelper.getEnvironmentLinkUsingName(environmentName))).toBe(
            true, ValidationsHelper.getDisplayedValidation(environmentName));

        stepLogger.step('click on hide button');
        if (await PageHelper.isElementPresent(CommonPageHelper.buttons.hide)) {
            await PageHelper.click(CommonPageHelper.buttons.hide);
        }
    }

    static async verifyRadioButtonsOnConfigurationPage(stepLogger: StepLogger) {
        stepLogger.verification('Single Instance radio button should be displayed');
        await expect(await PageHelper.isElementDisplayed(ConfigurationPage.configurationRadioButton.singleInstance)).toBe(
            true, ValidationsHelper.getDisplayedValidation(
                ConfigurationPageConstants.configurationRadioButtonSelectors.singleInstanceId));

        stepLogger.verification('Staging Configuration radio button should be displayed');
        await expect(await PageHelper.isElementDisplayed(ConfigurationPage.configurationRadioButton.stagingConfiguration)).toBe(
            true, ValidationsHelper.getDisplayedValidation(
                ConfigurationPageConstants.configurationRadioButtonSelectors.stagingConfigurationId));

        stepLogger.verification('Production Configuration radio button should be displayed');
        await expect(await PageHelper.isElementDisplayed(ConfigurationPage.configurationRadioButton.productionConfiguration)).toBe(
            true, ValidationsHelper.getDisplayedValidation(
                ConfigurationPageConstants.configurationRadioButtonSelectors.stagingConfigurationId));

        stepLogger.verification('Custom Configuration radio button should be displayed');
        await expect(await PageHelper.isElementDisplayed(ConfigurationPage.configurationRadioButton.customConfiguration)).toBe(
            true, ValidationsHelper.getDisplayedValidation(
                ConfigurationPageConstants.configurationRadioButtonSelectors.customConfigurationId));
    }

    static async verifyEnvironmentConfigurationBooted(stepLogger: StepLogger) {
        const iconStatusStarting = ConfigurationPageConstants.iconClassSelector.name;
        const iconStatusRunnig = ConfigurationPageConstants.iconClassSelector.greenName;
        let isEnvironmentReady = false;
        while (await PageHelper.isElementPresent(CommonPage.getSpanContainsClass(iconStatusStarting))) {
            stepLogger.step('Refresh the page');
            await PageHelper.refreshPage();
            isEnvironmentReady = true;
        }
        if (isEnvironmentReady) {
        stepLogger.verification('Verify green icon displayed');
        await expect(await PageHelper.isElementDisplayed(CommonPage.getSpanContainsClass(iconStatusRunnig)
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(iconStatusRunnig))));
        }

    }

    static async createAppEnvAndBootStrap(stepLogger: StepLogger) {
        stepLogger.preCondition('create environment, application and navigate to configuration page');
        await HomePageHelper.createApplicationEnvironmentAndNavigateToConfigurationPage(applicationNameNew, environmentNameNew, stepLogger);
    }

    static async selectInstanceForBootStrap(stepLogger: StepLogger) {
        const instanceSizeValue = ConfigurationPageConstants.configurationDropDownValues.mFourSmall;
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Select the value "m1.small - General Purpose (M1) Small (64 bit)" in "Instance Size:" drop down');
        await DropDownHelper.selectOptionByText(
            ConfigurationPage.configurationDropDowns.instanceSize, instanceSizeValue);
        stepLogger.verification('Value "m1.small - General Purpose (M1) Small (64 bit)" in "Instance Size:" drop down selected');
        await ApplicationPageHelper.verifyOptionValue(stepLogger, ConfigurationPage.configurationDropDowns.instanceSize, instanceSizeValue);
    }

    static async clickOnRadioButton(stepLogger: StepLogger) {
        stepLogger.step('Select the radio button "Single Instance"');
        await PageHelper.click(ConfigurationPage.configurationRadioButton.singleInstance);
    }

    static async selectAndVerifyIPAddress(stepLogger: StepLogger) {
        const ipAddress = ConfigurationPageConstants.externalAddressDropdownValue.value;
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.step('Select the value "Add IP Address" in "External Address" in drop down');
        await DropDownHelper.selectOptionByText(
            ConfigurationPage.externalAddressDropDowns.externalAddress, ipAddress);
        stepLogger.verification('The value "Add IP Address" in "External Address" in drop down is selected');
        await ApplicationPageHelper.verifyOptionValue(
            stepLogger, ConfigurationPage.externalAddressDropDowns.externalAddress, ipAddress);
    }

    static async clickOnBootStrapConfigurationButton(stepLogger: StepLogger) {
        stepLogger.step('Click on "Boot This Configuration" button');
        await PageHelper.click(ConfigurationPage.buttonSelector.bootConfigButton);
        // wait for the elements to load completely
        await browser.sleep(PageHelper.timeout.xs);
    }
}

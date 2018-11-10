import {StepLogger} from '../../../../../core/logger/step-logger';
import {ToolsPageHelper} from '../tools-page.helper';
import {ToolsPageConstants} from '../tools-page.constants';
import {PageHelper} from '../../../../components/html/page-helper';
import {SslCertificatesPage} from './ssl-certificates.po';
import {ValidationsHelper} from '../../../../components/misc-utils/validation-helper';
import {SslCertificatesPageConstants} from './ssl-certificates-page.constants';
import {TextboxHelper} from '../../../../components/html/textbox-helper';
import {HomePageHelper} from '../../home-page/home-page.helper';
import {browser} from 'protractor';

export class SslCertificatesPageHelper {
    static async createCertificate(certificateName: string, stepLogger: StepLogger) {
        stepLogger.step('Select Tools > SSL Certificates menu option');
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.sslCertificates, stepLogger);

        stepLogger.verification('"SSL Certificates" page displayed');
        await expect(await PageHelper.isElementDisplayed(SslCertificatesPage.sslCertificatesHeader)).toBe(
            true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.optionsUnderToolsSection.sslCertificates));

        stepLogger.step('Click on "Add SSL Certificate" button');
        await PageHelper.click(SslCertificatesPage.buttons.addSslCertificate);

        stepLogger.verification('"Create New SSL Certificate" page is displayed');
        await expect(await PageHelper.isElementDisplayed(SslCertificatesPage.headers.createNewSslCertificate)).toBe(
            true, ValidationsHelper.getDisplayedValidation(SslCertificatesPageConstants.headers.createNewSslCertificate));

        stepLogger.step('Enter SSL Certificate Name');
        await TextboxHelper.sendKeys(SslCertificatesPage.textBoxes.certificateName, certificateName);

        stepLogger.step('Click "Add Certificate" button');
        await PageHelper.click(SslCertificatesPage.buttons.addCertificate);

        stepLogger.verification('"Create New SSL Certificate" page is closed');
        await expect(await PageHelper.isElementPresent(SslCertificatesPage.headers.createNewSslCertificate)).not.toBe(
            true, ValidationsHelper.getNotDisplayedValidation(SslCertificatesPageConstants.headers.createNewSslCertificate));

        stepLogger.verification('Message Currently provisioning the SSL certificates below. ' +
            'They will appear on this page when provisioning is complete.');
        await expect(await PageHelper.isElementDisplayed(SslCertificatesPage.certificateCreatedMessage)).toBe(
            true, ValidationsHelper.getDisplayedValidation(SslCertificatesPageConstants.certificateCreatedMessage));

        stepLogger.step('Select Tools > SSL Certificates menu option');
        await this.navigateToOtherPageAndBackToSslCertificatePage(stepLogger);

        stepLogger.verification('"SSL Certificates" page refreshed and displayed again');
        await expect(await PageHelper.isElementDisplayed(SslCertificatesPage.sslCertificatesHeader)).toBe(
            true, ValidationsHelper.getDisplayedValidation(ToolsPageConstants.optionsUnderToolsSection.sslCertificates));

        stepLogger.verification('Newly created SSL Certificate (Ex: SaiSSL) displayed along with Previously' +
            ' added SSL certificates (if any)');
        await expect(await PageHelper.isElementDisplayed(SslCertificatesPage.getAddedCertificateUsingName(certificateName))).toBe(
            true, ValidationsHelper.getDisplayedValidation(certificateName));
    }

    static async navigateToOtherPageAndBackToSslCertificatePage(stepLogger: StepLogger) {
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.auditReport, stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.earlyAccess, stepLogger);
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.dashboard, stepLogger);
        await HomePageHelper.verifyEngineYardCloudPage();
        await ToolsPageHelper.navigateToPageUnderToolsDropDown(ToolsPageConstants.optionsUnderToolsSection.sslCertificates, stepLogger);
        stepLogger.step('need to give sleep as it is taking time to reflect added data');
        await browser.sleep(PageHelper.timeout.xl);

        stepLogger.step('need to refresh page as it is taking time to load data');
        await PageHelper.refreshPage();
    }
}

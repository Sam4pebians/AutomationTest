import {BasePage} from '../../base-page';
import {CommonPage} from '../../common/common.po';
import {ToolsPageConstants} from '../tools-page.constants';
import {SslCertificatesPageConstants} from './ssl-certificates-page.constants';
import {By, element} from 'protractor';
import {CommonPageConstants} from '../../common/common-page.constants';

export class SslCertificatesPage extends BasePage {
    static get sslCertificatesHeader() {
        return CommonPage.getHeaderFourByText(ToolsPageConstants.optionsUnderToolsSection.sslCertificates);
    }

    static get buttons() {
        return {
            addSslCertificate: CommonPage.getSpanByText(SslCertificatesPageConstants.buttons.addSslCertificate),
            addCertificate: CommonPage.getButtonContainsText(SslCertificatesPageConstants.buttons.addCertificate)
        };
    }

    static get headers() {
        return {
            createNewSslCertificate: CommonPage.getHeaderOneContainingText(SslCertificatesPageConstants.headers.createNewSslCertificate)
        };
    }

    static get textBoxes() {
        return {
            certificateName: element(By.id(SslCertificatesPageConstants.textBoxes.certificateNameId))
        };
    }

    static get certificateCreatedMessage() {
        return CommonPage.getHeaderTwoContainingText(SslCertificatesPageConstants.certificateCreatedMessage);
    }

    static getAddedCertificateUsingName(certificateName: string) {
        return CommonPage.getAnchorContainsText(certificateName);
    }

    static getDeleteCertificateButtonUsingCertificateName(certificateName: string) {
        return CommonPage.getButtonInsideTableContainingText(
            certificateName, false, CommonPageConstants.labelTexts.deleteLabel);
    }

    static get certificateDeletedMessage() {
        return CommonPage.getHeaderTwoContainingText(SslCertificatesPageConstants.certificateDeletedMessage);
    }
}

import {BasePage} from '../../base-page';
import {SshPublicKeysPageConstants} from './ssh-public-keys-page.constants';
import {By, element} from 'protractor';
import {CommonPage} from '../../common/common.po';

export class SshPublicKeysPage extends BasePage {
    static get addNewSshKey() {
        return element(By.xpath(`//*[contains(text(),"${SshPublicKeysPageConstants.addNewSshKey}")]/parent::a`));
    }
    static get accountCheckbox() {
        return element(By.css('[name="account-checkbox"]'));
    }
    static get deleteSSH() {
        return element(By.xpath(`//*[contains(text(),"${SshPublicKeysPageConstants.sshKeyName}")]/parent::*/following-sibling::*//button`));
    }
    static  accountCheckboxStatus(index= 0) {
        return element.all(By.css('.checkbox span')).get(index);
    }
    static get keyNameTextBox() {
        return element(By.id('keypair_name'));
    }
    static get publicKeyTextBox() {
        return element(By.id('keypair_public_key'));
    }
    static get addKey() {
        return CommonPage.getButtonByText(SshPublicKeysPageConstants.addKey);
    }
    static get sshKeyName() {
        return CommonPage.getAnchorByText(SshPublicKeysPageConstants.sshKeyName);
    }
}

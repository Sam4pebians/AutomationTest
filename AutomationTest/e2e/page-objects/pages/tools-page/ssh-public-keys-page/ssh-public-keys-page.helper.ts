import {PageHelper} from '../../../../components/html/page-helper';
import {StepLogger} from '../../../../../core/logger/step-logger';
import {SshPublicKeysPage} from './ssh-public-keys-page.po';
import {SshPublicKeysPageConstants} from './ssh-public-keys-page.constants';
import {ValidationsHelper} from '../../../../components/misc-utils/validation-helper';
import {TextboxHelper} from '../../../../components/html/textbox-helper';
import {HtmlHelper} from '../../../../components/misc-utils/html-helper';

export class SshPublicKeysHelper {
    static async clickAddKey(stepLogger: StepLogger) {
        stepLogger.step('Click Add key on SSH key Page');
        await PageHelper.click(SshPublicKeysPage.addKey);
    }

    static async clickAddNewSshKey(stepLogger: StepLogger) {
        stepLogger.step('Click Add New SSH key  on SSH key Page');
        await PageHelper.click(SshPublicKeysPage.addNewSshKey);
    }

    static async clickAccountCheckbox(stepLogger: StepLogger) {
        stepLogger.step('Click on account Checkbox');
        await PageHelper.click(SshPublicKeysPage.accountCheckboxStatus());
    }

    static async enterSshKeyName(stepLogger: StepLogger) {
        stepLogger.step('Enter SSH key Name');

        await TextboxHelper.sendKeys(SshPublicKeysPage.keyNameTextBox, SshPublicKeysPageConstants.sshKeyName );
    }

    static async enterSshPublicKey(stepLogger: StepLogger) {
        stepLogger.step('Enter SSH Public key');
        await TextboxHelper.sendKeys(SshPublicKeysPage.publicKeyTextBox, SshPublicKeysPageConstants.sshPublicKey );
    }

    static async deleteAddedSSHKey(stepLogger: StepLogger) {
        stepLogger.step('Delete  SSH key');
        await PageHelper.click(SshPublicKeysPage.deleteSSH);

        await this.verifySSHKeyDeleted(stepLogger);
    }

    static async verifySSHKeyAdded(stepLogger: StepLogger) {
        stepLogger.step('Verify SSH Key is Added');
        await expect(await PageHelper.isElementDisplayed(SshPublicKeysPage.sshKeyName))
            .toBe(true,
                ValidationsHelper.getDisplayedValidation(SshPublicKeysPageConstants.sshKeyName));
    }

    static async verifySSHKeyDeleted(stepLogger: StepLogger) {
        stepLogger.step('Verify SSH Key is Deleted');
        await expect(await PageHelper.isElementPresent(SshPublicKeysPage.deleteSSH))
            .toBe(false,
                ValidationsHelper.getDeletionConfirmationDisplayedValidation(SshPublicKeysPageConstants.sshKeyName));
    }

    static async addNewSSHKey(stepLogger: StepLogger) {
     // checking that add new key button is present or not

     if (await PageHelper.isElementPresent(SshPublicKeysPage.deleteSSH)) {
            await this.deleteAddedSSHKey(stepLogger);
        }

     if (await PageHelper.isElementPresent(SshPublicKeysPage.addNewSshKey)) {
     // checking that Auto_SSHkey is exist or not if it we will delete it first

         await this.clickAddNewSshKey(stepLogger);
     }

     await this.enterSshKeyName(stepLogger);

     await this.enterSshPublicKey(stepLogger);

     if (await PageHelper.getAttributeValue(SshPublicKeysPage.accountCheckboxStatus(), HtmlHelper.attributes.class) === 'checked') {
            await this.clickAccountCheckbox(stepLogger);
        }
    }
}

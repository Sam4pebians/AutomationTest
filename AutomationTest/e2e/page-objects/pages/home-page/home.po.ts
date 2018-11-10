import {By, element} from 'protractor';
import {BasePage} from '../base-page';
import {CommonPage} from '../common/common.po';
import {CommonPageConstants} from '../common/common-page.constants';
import {HomePageConstants} from './home-page.constants';
import {TextBoxComponentSelectors} from '../../../components/devfactory/component-types/textbox-component/textbox-component-selectors';

export class HomePage extends BasePage {
    url = '/login';

    static get emailTextBox() {
        return element(By.id('email'));
    }

    static get passwordTextBox() {
        return element(By.id('password'));
    }

    static get logInButton() {
        return element(By.id('login-form')).element(By.name('commit'));
    }

    static get homePageHeader() {
        return CommonPage.getAnchorByText(CommonPageConstants.pageHeaders.eyCloudHeader);
    }

    static get addAnApplicationLink() {
        return element(By.id('new_application'));
    }

    static get createNewApplicationPageHeader() {
        return element(By.className('massive-banner'));
    }

    static get getAllHomeTableColumnHeaders() {
        const columnSelector = By.xpath(`//table[@id="example"]//th`);
        return element.all(columnSelector);
    }

   static getHomeTableColumnBasedOnAnotherColumn(referenceColumnValue: string, columnIndex: number) {
        const columnSelector = By.xpath(`
        //table[@id="$example"]//td[normalize-space(.)="${referenceColumnValue}"]//ancestor::tr//td[${columnIndex}]`);
        return element.all(columnSelector).first();
    }

    static getAccountDropDown() {
        return element(By.id(HomePageConstants.dropDowns.accountDropDownId));
    }

    static getSignOutLink() {
        return CommonPage.getAnchorByText(HomePageConstants.linkTexts.signOut);
    }

    static get skip2FAAuthentication() {
        const skip2fa = HomePageConstants.skip2FAButtonText.value;
        return TextBoxComponentSelectors.getInputUsingValueXpath(skip2fa);
    }
}

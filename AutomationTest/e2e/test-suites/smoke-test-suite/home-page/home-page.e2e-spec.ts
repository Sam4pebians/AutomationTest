import {SuiteNames} from '../../helpers/suite-names';
import {PageHelper} from '../../../components/html/page-helper';
import {HomePage} from '../../../page-objects/pages/home-page/home.po';
import {StepLogger} from '../../../../core/logger/step-logger';
import {HomePageHelper} from '../../../page-objects/pages/home-page/home-page.helper';
import {HomePageValidations} from '../../../page-objects/pages/home-page/home-page.validations';
import {CommonPageConstants} from '../../../page-objects/pages/common/common-page.constants';
import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
import {browser} from 'protractor';

describe(SuiteNames.eySmokeSuite, () => {
    let homePage: HomePage;

    beforeEach(async () => {
        homePage = new HomePage();
        await homePage.goTo();
        await HomePageHelper.verifyLoginPage();
        await HomePageHelper.loginToApp();
        await HomePageHelper.verifyEngineYardCloudPage();
    });

    it('Verify "Add an Application" link is available in Engine Yard Home Page - [1318903]', async () => {
        const stepLogger = new StepLogger(1318903);
        stepLogger.stepId(3);
        const addAnApplicationLink = HomePage.addAnApplicationLink;
        stepLogger.verification('Verify "Add an Application" link is available in "Engine Yard Cloud" Home page');
        await expect(await PageHelper.isElementDisplayed(addAnApplicationLink))
            .toBe(true, ValidationsHelper.getLinkDisplayedValidation(CommonPageConstants.buttonLink.addAnApplication));

        stepLogger.stepId(4);
        stepLogger.step('Click on "Add an Application" link');
        await PageHelper.click(addAnApplicationLink);
        stepLogger.step('Wait for the element to be loaded properly');
        await browser.sleep(PageHelper.timeout.xs);
        stepLogger.verification('Verify "Create a new application" page is displayed by clicking "Add an Application" link');
        await expect(await PageHelper.isElementDisplayed(HomePage.createNewApplicationPageHeader))
            .toBe(true, HomePageValidations.getHeaderDisplayedValidation(CommonPageConstants.pageHeaders.createNewApplication));
    });

});

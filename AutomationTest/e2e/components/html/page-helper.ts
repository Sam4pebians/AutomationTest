/**
 * Page helper for general utility
 */
import {browser, ElementFinder, WebElement, ElementArrayFinder} from 'protractor';
import {WaitHelper} from './wait-helper';

export class PageHelper {
    static MAX_RETRY_ATTEMPTS = 3;
    // noinspection JSValidateJSDoc
    /**
     * Timeout collection to meet various needs
     * @type {{xs: number; s: number; m: number; l: number; xl: number; xxl: number; xxxl: number}}
     */
    public static timeout = {
        xxs: 1000,
        xs: 2000,
        s: 5000,
        m: 10000,
        l: 25000,
        xl: 50000,
        xxl: 75000,
        xxxl: 200000
    };
    static DEFAULT_TIMEOUT = PageHelper.timeout.xxl;

    static get isFullScreen() {
        const fullScreenScript = 'if (!window.screenTop && !window.screenY){return true;}'
            + 'else{return false;}';
        return browser.executeScript(fullScreenScript);
    }

    static actionKeyDown(key: string) {
        return browser.actions().keyDown(key).perform();
    }

    static executeInIframe(index: number | WebElement, fn: Function) {
        browser.switchTo().frame(index);
        fn();
        browser.switchTo().defaultContent();
        browser.waitForAngular();
    }

    static actionSendKeys(key: string) {
        return browser.actions().sendKeys(key).perform();
    }

    static sendKeysToInputField(elem: ElementFinder, key: string) {
          elem.sendKeys(key);
    }

    static actionKeyUp(key: string) {
        return browser.actions().keyUp(key).perform();
    }

    static keyPressForBrowser(key: string) {
        return browser.actions().sendKeys(key).perform();
    }

    static actionMouseUp(location: WebElement) {
        return browser.actions().mouseUp(location).perform();
    }

    // Known issue for chrome, direct maximize window doesn't work
    /**
     * To maximize the browser window
     */
    public static async maximizeWindow() {
        class Size {
            width: number;
            height: number;
        }

        const windowSize = await this.executeScript(function () {
            return {
                width: window.screen.availWidth,
                height: window.screen.availHeight
            };
        });

        const result = windowSize as Size;

        return this.setWindowSize(result.width, result.height);
    }

    /**
     * Sets window size
     * @param {number} width
     * @param {number} height
     */
    public static async setWindowSize(width: number, height: number) {
        return browser.driver
            .manage()
            .window()
            .setSize(width, height);
    }

    /**
     * Wrapper for executing javascript code
     * @param {string | Function} script
     * @param varAargs
     * @returns {promise.Promise<any>}
     */
    public static async executeScript(script: string | Function,
                                      ...varAargs: any[]) {
        return browser.driver.executeScript(script, varAargs);
    }

    /**
     * Wrapper to return an active element
     * @returns {WebElementPromise}

     public static async getFocusedElement() {
    return browser.driver.switchTo().activeElement()
  } */

    /**
     * Switch to a new tab if browser has availability
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    public static async switchToNewTabIfAvailable(windowNumber = 1) {
        const handles = await browser.getAllWindowHandles();
        const newWindowHandle = handles[windowNumber]; // this is your new window
        if (newWindowHandle) {
            await browser.switchTo().window(newWindowHandle);
        }
        const url = await browser.getCurrentUrl();

        // Avoiding bootstraping issue, Known issue
        // Error: Error while waiting for Protractor to sync with the page:
        // "window.angular is undefined. This could be either because this is a non-angular page or
        // because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.
        // See http://git.io/v4gXM for details
        return browser.driver.get(url);
    }

    public static async switchToFirstTab() {
        const handles = await browser.getAllWindowHandles();
        await browser.driver.close();
        await browser.switchTo().window(handles[0]);
    }

    /**
     * Click on element
     * @param {ElementFinder} targetElement
     * @returns {any}
     */
    public static async click(targetElement: ElementFinder) {

        await WaitHelper.getInstance().waitForElementToBeClickable(targetElement);

        return targetElement.click();
    }

    /**
     * Click on the element and wait for it to get hidden
     * @param {ElementFinder} targetElement
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    public static async clickAndWaitForElementToHide(targetElement: ElementFinder) {
        await WaitHelper.getInstance().waitForElementToBeClickable(targetElement);
        await targetElement.click();
        return WaitHelper.getInstance().waitForElementToBeHidden(targetElement);
    }

    /**
     * Gets promise for current url
     * @returns {any}
     */
    public static async currentUrl() {
        return browser.getCurrentUrl();
    }

    public static async switchToframe(frameEle: WebElement) {
        browser.driver.switchTo().frame(frameEle);
    }

    /**
     * Verify whether element is displayed on page or not
     * @param {ElementFinder} targetElement
     * @param toWait
     * @param {boolean} toWait
     * @returns {Promise<any>}
     */
    public static async isElementDisplayed(targetElement: ElementFinder, toWait = true) {
        if (toWait) {
            await WaitHelper.getInstance().waitForElementToBeDisplayed(targetElement);
        }
        return targetElement.isDisplayed();
    }

    public static async isElementSelected(targetElement: ElementFinder, toWait = true) {
        if (toWait) {
            await WaitHelper.getInstance().waitForElementToBeDisplayed(targetElement);
        }
        return await targetElement.isSelected();
    }

    public static async isElementEnabled(targetElement: ElementFinder, toWait = true) {
        if (toWait) {
            await WaitHelper.getInstance().waitForElementToBeDisplayed(targetElement);
        }
        return await targetElement.isEnabled();
    }

    static async scrollToElement(elementt: ElementFinder) {
        await browser.executeScript('arguments[0].scrollIntoView();', elementt);
    }

    static async scrollToElementTop(elementt: ElementFinder) {
        await browser.executeScript('arguments[0].scrollIntoView(true);', elementt);
    }

    static async getAttributeValue(elem: ElementFinder, attribute: string) {
        await WaitHelper.getInstance().waitForElementToBeDisplayed(elem);
        const value = await elem.getAttribute(attribute);
        return value.trim();
    }

    static async getText(elem: ElementFinder) {
        await WaitHelper.getInstance().waitForElementToBeDisplayed(elem);
        const text = await elem.getText();
        return text.trim();
    }

    /**
     * Refresh a page
     *
     */
    public static async refreshPage() {
        await browser.refresh();
    }

    static pageLoaded() {
        return browser.waitForAngular();
    }

    public static async getMaximizeWindow() {
        await browser.driver.manage().window().maximize();
    }

    public static async getPageTitle() {
       return await browser.getTitle();
    }

    /**
     * Click on element if displayed
     * @param {ElementFinder} targetElement
     * @returns {any}
     */
    public static async clickIfDisplayed(targetElement: ElementFinder) {
        const isPresent = await targetElement.isPresent();
        if (isPresent === true) {
            const isDisplayed = await targetElement.isDisplayed();
            if (isDisplayed === true) {
                await PageHelper.click(targetElement);
            }
        }
    }

    public static async clickAllElements(targetElements: ElementArrayFinder) {
        targetElements.each(async function (elem) {
            await elem.click();
        });
    }

    /**
     * Gets innertext for all the elements
     * @param {WebElementPromise} elements
     * @returns {string} inner text
     */
    public static async getAllTexts(elements: ElementArrayFinder) {
        return await elements.getText();
    }

    static async switchToiFrame(frameOrIframeElement: ElementFinder, sleepTime= PageHelper.timeout.xs) {
        // Wait is needed to load the iframe properly
        await WaitHelper.getInstance().waitForElementToBeDisplayed(frameOrIframeElement);
        await browser.sleep(sleepTime);
        return await browser.switchTo().frame(frameOrIframeElement.getWebElement());
    }

    static async switchToDefaultContent() {
        await browser.switchTo().defaultContent();
    }

    static async acceptAlert() {
        return  await browser.switchTo().alert().accept();
    }

    static async closeAlertIfPresent() {
        try {
            await browser.sleep(PageHelper.timeout.xs);
            await browser.switchTo().alert().accept();
        } catch (e) {}
        await browser.sleep(PageHelper.timeout.xs);
    }

    static copyArray(oldArray: any[]) {
        const newArray: any = [];
        oldArray.forEach((item) => {
          newArray.push(item);
        });
        return newArray;
      }

    static compareTwoArrays(firstArray: any[], secondArray: any[]) {
        let flag = true;
        for (let i = 0; i < firstArray.length; i++) {
            if (firstArray[i] !== secondArray[i]) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    static sortStringArrayInDescendingOrder(list: string[]) {
        return list.sort(function (a, b) {
            if (a > b) {
                return -1;
            } else if (a < b) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    /**
     * Verify whether element is present on page or not
     * @param {ElementFinder} targetElement
     * @returns {Promise<boolean>}
     */
    public static async isElementPresent(targetElement: ElementFinder) {
        return await targetElement.isPresent();
    }

    static async getAlertText() {
        return  await browser.switchTo().alert().getText();
    }

    /**
     * Verify whether element is displayed on page or not
     * @param {ElementFinder} targetElement
     * @param toWait
     * @param {boolean} toWait
     * @returns {Promise<any>}
     */
    static async isElementHidden(targetElement: ElementFinder, toWait = true) {
        if (toWait) {
            return browser.wait(async () =>
                !(await targetElement.isPresent()) || !(await targetElement.isDisplayed()),
            ).then(() => true).catch(() => false);
        }
        return !(await targetElement.isPresent()) || !(await targetElement.isDisplayed());
    }

}

import {ComponentHelpers} from '../../../devfactory/component-helpers/component-helpers';
import {ModalComponentSelectors} from '../modal-component/modal-component-selectors';
import {BaseComponentHelper} from '../../component-helpers/base-component-helper';
import {HtmlHelper} from '../../../misc-utils/html-helper';
import {element, By} from 'protractor';

export class AnchorComponentSelectors {
  public static readonly selectorTag = 'a';

  public static getAnchorByHrefXpath(
    href: string,
    isContains = false,
    insidePopup = false
  ) {
    return `${ModalComponentSelectors.getModelPopupXpath(
      insidePopup)}//${
        this.selectorTag
      }[${ComponentHelpers.getXPathFunctionForHref(
        href,
        isContains
      )}]`;
  }

  public static getAnchorByClassXpath(
    classAttributeValue: string,
    classIsContains = false,
    insidePopup = false

  ) {
    return BaseComponentHelper.getClassXpath(
      HtmlHelper.tags.a,
      classAttributeValue,
      classIsContains, insidePopup
    );
  }

    public static getAnchorInsideTableUsingTextXpath(tableElementText: string,
                                                     isTableElementTextContains = false,
                                                     anchorText: string,
                                                     isAnchorTextContains = false,
                                                     insidePopup = false) {
        return `${BaseComponentHelper.getTextXpath(
            HtmlHelper.tags.td, tableElementText, isTableElementTextContains, insidePopup)}/following-sibling::${HtmlHelper.tags.td}
            ${BaseComponentHelper.getTextXpath(HtmlHelper.tags.a, anchorText, isAnchorTextContains, insidePopup)}`;
    }

    static getAnchorLinkByTDtext(text: string, isContains = true) {
      const tdXpath = `//${HtmlHelper.tags.td}`;
      const textXpath = `[${ComponentHelpers.getXPathFunctionForText(text, isContains)}]`;
      const aXpath = `${HtmlHelper.tags.a}`;
      const xpath = `${tdXpath}${textXpath}//preceding::${aXpath}`;
      return element.all(By.xpath(xpath)).first();
  }
}

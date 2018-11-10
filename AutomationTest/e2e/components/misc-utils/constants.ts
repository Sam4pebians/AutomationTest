import {ConstantsFactory} from '@aurea/protractor-automation-helper';

export class Constants extends ConstantsFactory {
    static readonly MAX_RETRY_ATTEMPTS = 3;
    static readonly EMPTY_STRING = '';
    static readonly MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    static get separators() {
        return {
            comma: ',',
            dot: '.',
            semiColon: ';',
            apostrophe: '\'',
            pipe: '|'
        };
    }

    static get keys() {
        return {
            escape: 'protractor.Key.ESCAPE',
            tab: 'protractor.Key.TAB',
            enter: 'protractor.Key.ENTER',
            spaceBar: 'protractor.Key.SPACE'
        };
    }

    static get booleanValues() {
        return {
            true: 'true',
            false: 'false'
        };
    }
}

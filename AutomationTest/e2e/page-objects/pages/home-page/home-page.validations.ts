import {ValidationsHelper} from '../../../components/misc-utils/validation-helper';
export class HomePageValidations {
    static getHeaderDisplayedValidation(headerName: string) {
        return `${ValidationsHelper.getDisplayedValidation(headerName)}`;
    }
}

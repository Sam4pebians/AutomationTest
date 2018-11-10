export class ApplicationPageConstants {
    static get createApplicationSectionTextBoxesIds() {
        return {
            gitRepositoryUriId: 'app_repository_uri',
            applicationNameId: 'app_name'
        };
    }

    static get createApplicationSectionLabelsIds() {
        return {
            triggerSampleRubyId: 'trigger-sample-ruby'
        };
    }

    static get createApplicationSectionButtonsIds() {
        return {
            createApplicationButtonId: 'create-app-button'
        };
    }

    static get createApplicationSectionDropDownsIds() {
        return {
            applicationLanguageId: 'app_language',
            webApplicationFrameworkId: 'app_app_type_id'
        };
    }

    static get sectionDropDownSelectors() {
        return {
            webApplicationFrameworkClass: 'field-content',
            gitRepositoryURIId: 'field-content repository_url'
        };
    }

    static get sectionLabels() {
        return {
            webApplicationFrameworkLabel: 'Web Application Framework'
        };
    }

    static get gitRepos() {
        return {
            ruby: 'git://github.com/engineyard/todo.git',
            nodejs: 'git://github.com/engineyard/nodejs-basic-chat.git',
            php: 'git://github.com/engineyard/howto.git',
        };
    }

    static get languageDropDownValues() {
        return {
            ruby: 'Ruby',
            nodeJs: 'Node.js',
            php: 'PHP',
            railsFour: 'Rails 4',
            nodeApp: 'Node app',
            phpApp: 'PHP app',
            railsApp: 'Rails app',
        };
    }

    static get prefix() {
        return {
            app: 'App',
        };
    }

}

const browserList = require('./browser-list.js');
const testrail = require("testrail-api");
const setupUtilities = require('./setup-utilities');
const browserStackBrowser = browserList[setupUtilities.getParam("chrome", "--params.browserstack.browser", false)];
const maxBrowserInstances = process.env.MAX_INSTANCES || setupUtilities.getParam(5, "--params.maxInstances", false);
const chromeOptions ={
	// Set download path and avoid prompting for download even though
    // this is already the default on Chrome but for completeness
    prefs: {
        'download': {
            'prompt_for_download': false,
            'directory_upgrade': true,
            'default_directory': 'Downloads'
        }
    },
    args: [ '--disable-gpu', '--no-sandbox', '--test-type=browser' ],
};
const configSetup = {
    restartBrowserBetweenTests: false,
    SELENIUM_PROMISE_MANAGER: false,
    multiCapabilities: [{
        browserName: 'chrome',
        shardTestFiles: 'true',
        maxInstances: maxBrowserInstances
    }],
    allScriptsTimeout: 300000,
    suites: {
        regression_functional_tests: './e2e/test-suites/regression-functional-test-suite/**/*.e2e-spec.ts',
        smoke_tests: './e2e/test-suites/smoke-test-suite/**/*.e2e-spec.ts',
        pre_execution_tests: './e2e/test-suites/pre-execution-test-suite/**/*.e2e-spec.ts',
        post_execution_tests: './e2e/test-suites/post-execution-test-suite/**/*.e2e-spec.ts',
        e2e_tests: './e2e/test-suites/e2e-test-suite/**/*.e2e-spec.ts'
    },
    capabilities: {
        "browserName": "chrome",
        chromeOptions: chromeOptions
    },
    bsMultiCapabilities: [{
        name: `${browserStackBrowser.os} ${browserStackBrowser.os_version}-${browserStackBrowser.browserName} v ${browserStackBrowser.browser_version || 'Latest'}`,
        'browserName': browserStackBrowser.browserName,
        'browser_version': browserStackBrowser.browser_version,
        'os': browserStackBrowser.os,
        'os_version': browserStackBrowser.os_version,
        'resolution': browserStackBrowser.resolution,
        'browserstack.user': process.env.BROWSERSTACK_USERNAME || setupUtilities.getParam("", "--params.browserstack.user", false),
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || setupUtilities.getParam("", "--params.browserstack.key", false),
        'browserstack.local': process.env.BROWSERSTACK_LOCAL || setupUtilities.getParam(false, "--params.browserstack.local", false),
        'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER || setupUtilities.getParam("LocalIdentifier", "--params.browserstack.localIdentifier", false),
        'build': process.env.BROWSERSTACK_BUILD || setupUtilities.getParam('Local Build - ' + new Date().toISOString(), "--params.browserstack.build", false),
        'browserstack.debug': 'true',
        'acceptSslCerts': 'true',
        'trustAllSSLCertificates': 'true',
        'browserstack.timezone': 'UTC',
        'browserstack.safari.allowAllCookies': 'true',
        shardTestFiles: true,
        maxInstances: maxBrowserInstances
    }],
    params: {
        maxInstances: 5,
        maxSessions: 5,
        login: {
            user: {
                userEmail: "qaautomationtestapp@gmail.com",
                password: "secretPassword_123"
            }
        },
        testrail: {
            projectId: process.env.TESTRAIL_PROJECT_ID || setupUtilities.getParam(410, "--params.testrail.projectId", false),
            milestoneName: process.env.TESTRAIL_MILESTONE_NAME || setupUtilities.getParam("Automation milestone week", "--params.testrail.milestoneName", false),
            versionName: process.env.VERSION || setupUtilities.getParam("Default version name", "--params.testrail.versionName", false),
            host: process.env.TESTRAIL_HOST || setupUtilities.getParam("https://testrail.devfactory.com/", '--params.testrail.host', false),
            user: process.env.TESTRAIL_USER || setupUtilities.getParam('testrail.automation@aurea.com', "--params.testrail.user", false),
            password: process.env.TESTRAIL_PASSWORD || setupUtilities.getParam('w.Ry1gkMbAebV7dEUoF/-5iKNkzOHsTGyhrZIG1k3', '--params.testrail.password', false)
        },
        version: process.env.VERSION || setupUtilities.getParam('7.5.0', "--params.testrail.versionName", false),
        selenium: {
            hub: process.env.SELENIUM_URL || setupUtilities.getParam('http://10.69.8.112:4444/wd/hub', "--params.selenium.hub", false)
        },
        browserstack: {
            user: '', //Don't specify anything here it's just for a reference purpose that it can be a param
            key: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            local: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            localIdentifier: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            build: '',//Don't specify anything here it's just for a reference purpose that it can be a param
        },

    },
    baseUrl: 'https://sunset.engineyard.com',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 3000000,
        print: function () {
        }
    }
};
module.exports = configSetup;

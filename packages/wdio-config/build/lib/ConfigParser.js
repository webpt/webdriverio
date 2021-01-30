"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const deepmerge_1 = __importDefault(require("deepmerge"));
const logger_1 = __importDefault(require("@wdio/logger"));
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const log = logger_1.default('@wdio/config:ConfigParser');
const MERGE_OPTIONS = { clone: false };
class ConfigParser {
    constructor() {
        this._config = constants_1.DEFAULT_CONFIGS();
        this._capabilities = [];
    }
    addConfigFile(filename) {
        if (typeof filename !== 'string') {
            throw new Error('addConfigFile requires filepath');
        }
        const filePath = path_1.default.resolve(process.cwd(), filename);
        try {
            this.addConfigEntry(require(filePath).config);
        }
        catch (e) {
            log.error(`Failed loading configuration file: ${filePath}:`, e.message);
            throw e;
        }
    }
    addConfigEntry(config) {
        if (typeof config !== 'object') {
            throw new Error('addConfigEntry requires config');
        }
        try {
            const fileConfig = deepmerge_1.default(config, {}, MERGE_OPTIONS);
            const defaultTo = Array.isArray(this._capabilities) ? [] : {};
            this._capabilities = deepmerge_1.default(this._capabilities, fileConfig.capabilities || defaultTo, MERGE_OPTIONS);
            delete fileConfig.capabilities;
            this.addService(fileConfig);
            for (let hookName of constants_1.SUPPORTED_HOOKS) {
                delete fileConfig[hookName];
            }
            this._config = deepmerge_1.default(this._config, fileConfig, MERGE_OPTIONS);
            this._config = deepmerge_1.default(utils_1.detectBackend(this._config), this._config, MERGE_OPTIONS);
            if (!utils_1.loadTypeScriptCompiler(this._config.tsNodeOpts) && !utils_1.loadBabelCompiler()) {
                log.debug('No compiler found, continue without compiling files');
            }
            delete this._config.watch;
        }
        catch (e) {
            log.error('Failed loading configuration block');
            throw e;
        }
    }
    merge(object = {}) {
        const spec = Array.isArray(object.spec) ? object.spec : [];
        const exclude = Array.isArray(object.exclude) ? object.exclude : [];
        this._config = deepmerge_1.default(this._config, object, MERGE_OPTIONS);
        if (object.specs && object.specs.length > 0) {
            this._config.specs = object.specs;
        }
        else if (object.exclude && object.exclude.length > 0) {
            this._config.exclude = object.exclude;
        }
        this._capabilities = utils_1.validObjectOrArray(this._config.capabilities) ? this._config.capabilities : this._capabilities;
        if (this._config.spec && utils_1.isCucumberFeatureWithLineNumber(this._config.spec)) {
            this._config.cucumberFeaturesWithLineNumbers = Array.isArray(this._config.spec) ? [...this._config.spec] : [this._config.spec];
        }
        if (spec.length > 0) {
            this._config.specs = this.setFilePathToFilterOptions(spec, this._config.specs);
        }
        if (exclude.length > 0) {
            this._config.exclude = this.setFilePathToFilterOptions(exclude, this._config.exclude);
        }
        this._config = deepmerge_1.default(utils_1.detectBackend(this._config), this._config, MERGE_OPTIONS);
    }
    addService(service) {
        const addHook = (hookName, hook) => {
            const existingHooks = this._config[hookName];
            if (!existingHooks) {
                this._config[hookName] = hook.bind(service);
            }
            else if (typeof existingHooks === 'function') {
                this._config[hookName] = [existingHooks, hook.bind(service)];
            }
            else {
                this._config[hookName] = [...existingHooks, hook.bind(service)];
            }
        };
        for (const hookName of constants_1.SUPPORTED_HOOKS) {
            const hooksToBeAdded = service[hookName];
            if (!hooksToBeAdded) {
                continue;
            }
            if (typeof hooksToBeAdded === 'function') {
                addHook(hookName, hooksToBeAdded);
            }
            else if (Array.isArray(hooksToBeAdded)) {
                for (const hookToAdd of hooksToBeAdded) {
                    if (typeof hookToAdd === 'function') {
                        addHook(hookName, hookToAdd);
                    }
                }
            }
        }
    }
    getSpecs(capSpecs, capExclude) {
        var _a;
        let specs = ConfigParser.getFilePaths(this._config.specs);
        let spec = Array.isArray(this._config.spec) ? this._config.spec : [];
        let exclude = ConfigParser.getFilePaths(this._config.exclude);
        let suites = Array.isArray(this._config.suite) ? this._config.suite : [];
        if (suites.length > 0) {
            let suiteSpecs = [];
            for (let suiteName of suites) {
                let suite = (_a = this._config.suites) === null || _a === void 0 ? void 0 : _a[suiteName];
                if (!suite) {
                    log.warn(`No suite was found with name "${suiteName}"`);
                }
                if (Array.isArray(suite)) {
                    suiteSpecs = suiteSpecs.concat(ConfigParser.getFilePaths(suite));
                }
            }
            if (suiteSpecs.length === 0) {
                throw new Error(`The suite(s) "${suites.join('", "')}" you specified don't exist ` +
                    'in your config file or doesn\'t contain any files!');
            }
            let tmpSpecs = spec.length > 0 ? [...specs, ...suiteSpecs] : suiteSpecs;
            if (Array.isArray(capSpecs)) {
                tmpSpecs = ConfigParser.getFilePaths(capSpecs);
            }
            if (Array.isArray(capExclude)) {
                exclude = ConfigParser.getFilePaths(capExclude);
            }
            specs = [...new Set(tmpSpecs)];
            return specs.filter(spec => !exclude.includes(spec));
        }
        if (Array.isArray(capSpecs)) {
            specs = ConfigParser.getFilePaths(capSpecs);
        }
        if (Array.isArray(capExclude)) {
            exclude = ConfigParser.getFilePaths(capExclude);
        }
        return specs.filter(spec => !exclude.includes(spec));
    }
    setFilePathToFilterOptions(cliArgFileList, config) {
        const filesToFilter = new Set();
        const fileList = ConfigParser.getFilePaths(config);
        cliArgFileList.forEach(filteredFile => {
            filteredFile = utils_1.removeLineNumbers(filteredFile);
            let globMatchedFiles = ConfigParser.getFilePaths(glob_1.default.sync(filteredFile));
            if (fs_1.default.existsSync(filteredFile) && fs_1.default.lstatSync(filteredFile).isFile()) {
                filesToFilter.add(path_1.default.resolve(process.cwd(), filteredFile));
            }
            else if (globMatchedFiles.length) {
                globMatchedFiles.forEach(file => filesToFilter.add(file));
            }
            else {
                fileList.forEach(file => {
                    if (file.match(filteredFile)) {
                        filesToFilter.add(file);
                    }
                });
            }
        });
        if (filesToFilter.size === 0) {
            throw new Error(`spec file(s) ${cliArgFileList.join(', ')} not found`);
        }
        return [...filesToFilter];
    }
    getConfig() {
        return this._config;
    }
    getCapabilities(i) {
        if (typeof i === 'number' && Array.isArray(this._capabilities) && this._capabilities[i]) {
            return this._capabilities[i];
        }
        return this._capabilities;
    }
    static getFilePaths(patterns, omitWarnings) {
        let files = [];
        if (typeof patterns === 'string') {
            patterns = [patterns];
        }
        if (!Array.isArray(patterns)) {
            throw new Error('specs or exclude property should be an array of strings');
        }
        patterns = patterns.map(pattern => utils_1.removeLineNumbers(pattern));
        for (let pattern of patterns) {
            let filenames = glob_1.default.sync(pattern);
            filenames = filenames.filter((filename) => constants_1.SUPPORTED_FILE_EXTENSIONS.find((ext) => filename.endsWith(ext)));
            filenames = filenames.map(filename => path_1.default.isAbsolute(filename) ? path_1.default.normalize(filename) : path_1.default.resolve(process.cwd(), filename));
            if (filenames.length === 0 && !omitWarnings) {
                log.warn('pattern', pattern, 'did not match any file');
            }
            files = deepmerge_1.default(files, filenames, MERGE_OPTIONS);
        }
        return files;
    }
}
exports.default = ConfigParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9Db25maWdQYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsZ0RBQXVCO0FBQ3ZCLGdEQUF1QjtBQUN2QiwwREFBNkI7QUFDN0IsMERBQWlDO0FBR2pDLG9DQUdpQjtBQUNqQiw0Q0FBMEY7QUFFMUYsTUFBTSxHQUFHLEdBQUcsZ0JBQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0FBQy9DLE1BQU0sYUFBYSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFBO0FBY3RDLE1BQXFCLFlBQVk7SUFBakM7UUFDWSxZQUFPLEdBQW9DLDJCQUFlLEVBQUUsQ0FBQTtRQUM1RCxrQkFBYSxHQUFvQyxFQUFFLENBQUM7SUE4U2hFLENBQUM7SUF4U0csYUFBYSxDQUFFLFFBQWdCO1FBQzNCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtTQUNyRDtRQUVELE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBRXRELElBQUk7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNoRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsR0FBRyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3ZFLE1BQU0sQ0FBQyxDQUFBO1NBQ1Y7SUFDTCxDQUFDO0lBTUQsY0FBYyxDQUFFLE1BQXVDO1FBQ25ELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENB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
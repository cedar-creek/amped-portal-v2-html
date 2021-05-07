import path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// paths
let rootPath = path.resolve(__dirname, '..');
const corePath = rootPath;
const coreSrcPath = corePath + '/src';

// arguments/params from the line command
const args = getParameters();

// get theme name
let theme = getTheme(args);

// dev html payth
rootPath = path.resolve(__dirname, '../../../themes/' + theme + '/html');

// get selected demo
let demo = getDemos(rootPath)[0];

// under demo paths
const demoPath = rootPath + (demo ? '/' + demo : '');
const distPath = demoPath + '/dist';
const assetDistPath = distPath + '/assets';
const srcPath = demoPath + '/src';


htmlSync();

function htmlSync() {
    const assetSrc = [
        {
            from: rootPath + "/demo1/src/js/custom/",
            to: rootPath + "/{demo}/src/js/custom/",
            options: {
                skip: ["demo1"],
            },
        },
        {
            from: rootPath + "/demo1/src/media",
            to: rootPath + "/{demo}/src/media",
            options: {
                skip: ["demo1"],
            },
        },
        {
            from: rootPath + "/demo1/src/sass",
            to: rootPath + "/{demo}/src/sass",
            options: {
                ignore: [
                    "layout",
                    "_variables\.custom\.scss",
                ],
                skip: ["demo1"],
            },
        },
    ];

    var demos = getDemos(rootPath);
    if (typeof demos === "undefined") {
        return [];
    }

    prepareSyncFiles(assetSrc, demos);
}

function getTheme(args) {
    let theme = "{theme}";
    if (theme === '{theme}') {
        let themes = [
            /**/'metronic', 'start', 'craft', 'jet', 'redux',/**/
        ];
        args.some(function (t) {
            if (themes.indexOf(t) !== -1) {
                theme = t;
                return true;
            }
        });
    }
    return theme;
}

function getParameters() {
    var possibleArgs = [
        /**/'metronic', 'start', 'craft', 'jet', 'redux',/**/
        'js', 'css', 'scss',
        'alldemos', 'rtl', 'prod', 'production', 'localhost',
    ];
    for (var i = 0; i <= 13; i++) {
        possibleArgs.push('demo' + i);
    }

    var args = [];
    possibleArgs.forEach(function (key) {
        if (process.env['npm_config_' + key]) {
            args.push(key);
        }
    });

    return args;
}

function getDemos(pathDemos) {
    // get possible demo from parameter command
    let demos = [];
    args.forEach((arg) => {
        const demo = arg.match(/^demo.*/g);
        if (demo) {
            demos.push(demo[0]);
        }
    });

    if (demos.length === 0) {
        demos = [];
        if (args.indexOf('alldemos') !== -1) {
            // sync reusable source code with demo1 for all other demos
            demos = fs.readdirSync(pathDemos).filter((file) => {
                return !/(^|\/)\.[^\/\.]/g.test(file) && /^demo\d+$/g.test(file) && file !== 'demo0';
            });
        }
    }

    return demos;
}

function prepareSyncFiles(raw, demos) {
    raw.forEach(function (source) {
        demos.forEach((demo) => {
            let entry = JSON.parse(JSON.stringify(source));

            // skip this output for certain demo
            if (entry['options']["skip"] && entry['options']["skip"].indexOf(demo) === 0) {
                return;
            }

            entry["to"] = entry["to"].replace(/{demo}/i, demo);

            fse.copySync(entry['from'], entry['to'], {
                filter: (src, dest) => {
                    let pass = true;

                    if (typeof entry['options']['ignore'] !== 'undefined') {
                        entry['options']['ignore'].forEach(function (pattern) {
                            if (new RegExp(pattern).test(src)) {
                                pass = false;
                            }
                        });
                    }
                    // it will be copied if return true
                    return pass;
                }
            });
        });
    });
}


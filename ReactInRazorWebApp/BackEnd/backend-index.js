'use-strict'

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

const webpack = require('webpack');

function launchComponent(componentJSX) {
    var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    var rootElement = document.getElementById('root');

    ReactDOM.render(
        <BrowserRouter basename={baseUrl}>
            {componentJSX}
        </BrowserRouter>,
        rootElement);
}
function build(previousFileSizes) {
    console.log('Creating an optimized production build...');

    const compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            let messages;
            if (err) {
                if (!err.message) {
                    return reject(err);
                }

                let errMessage = err.message;

                // Add additional information for postcss errors
                if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
                    errMessage +=
                        '\nCompileError: Begins at CSS selector ' +
                        err['postcssNode'].selector;
                }

                messages = formatWebpackMessages({
                    errors: [errMessage],
                    warnings: [],
                });
            } else {
                messages = formatWebpackMessages(
                    stats.toJson({ all: false, warnings: true, errors: true })
                );
            }
            if (messages.errors.length) {
                // Only keep the first error. Others are often indicative
                // of the same problem, but confuse the reader with noise.
                if (messages.errors.length > 1) {
                    messages.errors.length = 1;
                }
                return reject(new Error(messages.errors.join('\n\n')));
            }
            if (
                process.env.CI &&
                (typeof process.env.CI !== 'string' ||
                    process.env.CI.toLowerCase() !== 'false') &&
                messages.warnings.length
            ) {
                console.log(
                    chalk.yellow(
                        '\nTreating warnings as errors because process.env.CI = true.\n' +
                        'Most CI servers set it automatically.\n'
                    )
                );
                return reject(new Error(messages.warnings.join('\n\n')));
            }

            const resolveArgs = {
                stats,
                previousFileSizes,
                warnings: messages.warnings,
            };

            if (writeStatsJson) {
                return bfj
                    .write(paths.appBuild + '/bundle-stats.json', stats.toJson())
                    .then(() => resolve(resolveArgs))
                    .catch(error => reject(new Error(error)));
            }

            return resolve(resolveArgs);
        });
    });
}
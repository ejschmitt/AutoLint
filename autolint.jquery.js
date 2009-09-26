/*jslint white: true, onevar: false, undef: true, 
nomen: true, eqeqeq: true, plusplus: true, bitwise: true, 
regexp: true, strict: true, newcap: true, immed: true */
/*globals jQuery, JSLINT */
"use strict";
jQuery.fn.autolint = function () {
	var scriptTags = this, 
		PLUGIN_NAME = 'AutoLint', 
		elementSrc = [], 
		lintResults = [],
		i, displayResults;
	for (i = 0; i < scriptTags.length; i += 1) {
		(function () {
			var elementSrc = scriptTags[i].src,
				lastElementSrc = scriptTags[scriptTags.length - 1].src;
			if (elementSrc) {
				jQuery.get(elementSrc, function (data, status) {
					if (status === 'success') {
						var elementResults = {
							'element': elementSrc, 
							'result': JSLINT(data),
							'errors': JSLINT.errors
						};
						lintResults.push(elementResults);
						if (elementSrc === lastElementSrc) {
							// only fire when finished
							displayResults(lintResults);
						}
					}
					
				});
				
			}
		}());
	}
		
	var prettyErrors = function (error) {
		var i, result = [], err, evidence;
		for (i = 0; i < error.length; i += 1) {
			err = error[i];
			evidence = err && err.evidence && err.evidence.replace(/^( |\t)+/, ' ');
			if (err) {
			    result.push(
				    'Line: ' + err.line +
				    ', Char: ' + err.character +
				    ' - ' +
				    err.reason + 
				    '<br />' + 
				    '<pre>"' + (evidence ? evidence : '') + '"</pre>'
			    );
			}
		}
		return result;
	};
	
	var namespacedTag = function (variableName) {
		return PLUGIN_NAME.toLowerCase() + '_' + variableName;
	};
	
	var startTag = function (tagName, idName, className) {
		var tag = '<' + tagName;
		if (idName) {
			tag += ' id="' + namespacedTag(idName) + '"';
		}
		if (className) {
			tag += ' class="' + namespacedTag(className) + '"';
		}
		tag += '>';
		return tag;
	};
	
	var endTag = function (tagName) {
		return '</' + tagName + '>';
	};
	
	
	var styleResults = function () {
		jQuery('.' + namespacedTag('result_pass')).css({
			'border-bottom': '1px solid #ccc',
			'background-color': '#C2FFBF',
			'padding': '4px 0 4px 10px'
		});
	
		jQuery('.' + namespacedTag('result_fail')).css({
			'border-bottom': '1px solid #ccc',
			'background-color': '#FFB6C1',
			'padding': '4px 0 4px 10px'
		});
	
		jQuery('.' + namespacedTag('booleanResult')).css({
			'font-weight': 'bold'
		});
	
		jQuery('.' + namespacedTag('errors')).css({
			'margin-left': '20px'
		});
	
		jQuery('#' + namespacedTag('resultBox')).css({
			'border': '1px solid #CCC',
			'margin': '20px 20px 0 0'
		});
	};

	var formatResults = function (results) {
		var i, prettyResults = [];
		for (i = 0; i < results.length; i += 1) {
			results[i].prettyErrors = prettyErrors(results[i].errors);
			var testResult = results[i].result  === true ? "PASS" : 'FAIL';
			prettyResults.push(
				startTag('div', null, 'result' + '_' + testResult.toLowerCase()) + 
					'<i><u>' + PLUGIN_NAME + ':</i> ' + results[i].element + 
					"</u> - " + 
					startTag('span', null, 'booleanResult') + testResult + endTag('span') +
					startTag('div', null, 'errors') + 
						results[i].prettyErrors.join('') +
					endTag('div') +
				endTag('div')
			);	
		}
		
		return prettyResults;
	};

	displayResults = function (results) {
		var formattedResults = formatResults(results);
		jQuery('body').append(
			startTag('div', 'resultBox') + 
			formattedResults.join('') +
			endTag('div'));
			
		styleResults();
	};
		
};


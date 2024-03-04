(() => {
  let debugString = '';
  // Regular expression to match URL https://*.edu/my/
  const regexp = /^https:\/\/.*?\.edu\/my\/$/;
  // Test URL against regular expression
  const match = regexp.exec(location.href)
  if (match) {
    // Pull enabled option from storage, defaulting to true
    chrome.storage.sync.get(
      { enabled: true },
      (options) => {
        if (options.enabled) {
          // Create a style element;
          const element = document.createElement('style');
          // Set the type to CSS
          element.type = 'text/css';
          // Add our CSS Rules
          element.innerText = `
            /* Hide the Course Evaluation Modal and accompanying overlay */
            #ek-overlay, #ek-modal {
              display: none;
            }
          
            /* In case the Institution has custom styling that hides the Moodle Block, forcibly display it so students can still access their course evaluations */
            .block_evaluation_kit_sso {
              display: block !important;
            }
          `;
          // Add the style element to the document head
          document.head.appendChild(element);
          console.debug('EvaluationKIT Removal Tool Successfully injected CSS styles to hide the EvaluationKIT Modal!');
        } else {
          console.debug('EvaluationKIT Removal Tool Is not Enabled.');
        }
      }
    );
  } else {
    console.debug('EvaluationKIT Removal Tool Does not run on this page.');
  }
})();

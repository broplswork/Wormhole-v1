"use strict";

function search(input, template) {
  try {
    // input is a valid URL:
    // eg: https://example.com, https://example.com/test?q=param
    return new URL(input).toString();
  } catch (err) {
    // input was not a valid URL
  }

  try {
    // input is a valid URL when http:// is added to the start:
    // eg: example.com, https://example.com/test?q=param
    const url = new URL(`http://${input}`);
    // only if the hostname has a TLD/subdomain
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
    // input was not valid URL
  }

  // input may have been a valid URL, however the hostname was invalid

  // Attempts to convert the input to a fully qualified URL have failed
  // Treat the input as a search query
  return template.replace("%s", encodeURIComponent(input));
}

// Your other existing code may go here
// ...

// Example usage within your existing codebase
// For instance, when handling user input from your site's search bar or URL input
const userInput = document.getElementById('urlInput').value; // Get user input
const templateURL = "https://www.example.com/search?q=%s"; // Your website's search template URL

const result = search(userInput, templateURL);
console.log("Result:", result); // Output the resulting URL or search query

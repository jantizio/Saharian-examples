<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="common/example.css">
  <title>Accessibility examples</title>

  <style>
    body {
      font-size: 18px;
      background-color: #fffceb !important;
      padding: 1em 1em 1em 2em;
      margin: 1em;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    h1 {
      text-align: center;
      font-size: 36px;
      margin-top: 0.5em !important;
      color: #333;
    }

    h2 {
      font-size: 28px;
      margin-top: 1em;
      color: #444;
    }

    p {
      margin-bottom: 1em;
      color: #555;
    }

    ul,
    ol {
      padding-left: 1.5em;
      color: #555;
    }

    ul li {
      padding: 0.25em;
      list-style-type: disc;
    }

    ul li a {
      text-decoration: none;
      color: #007BFF;
      transition: color 0.3s;
    }

    ul li a:hover {
      text-decoration: underline;
      color: #0056b3;
    }

    ul li span {
      font-size: 14px;
      margin-left: 0.5em;
      color: #666;
    }

    #examples-list {
      column-count: 3;
      column-gap: 2em;
    }
  </style>

</head>

<body>
  <main>
    <h1 class="saharian-debug-h1">SahARIAn</h1>
    <p>SahARIAn, the Sighted Architect's Helper for ARIA Notation, is a browser extension designed to simplify and enhance web accessibility. With SahARIAn, developers can easily identify, debug, and optimize ARIA attributes and accessible components within their web projects. This tool tries to show sighted developers how a screen reader would interpret the web page. </p>
    <p>To use it click on the extension icon and select the level:</p>
    <ul>
      <li>Off - the extension is disabled, and the web page is rendered as usual</li>
      <li>Min - is the base level, you will use this mode most of the time</li>
      <li>Max - is a more advanced level, with focus on more advanced accessibility issues</li>
    </ul>

    <h2 class="saharian-debug-h2">How to Install:</h2>
    <ol>
      <li>Download the <a href="saharian.zip">compressed archive</a> of the extension.</li>
      <li>Extract the downloaded folder and navigate to your browser's extensions page. Check out specific instruction for your browser of choice</li>
      <ul>
        <li><a href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing" target="_blank">Firefox</a></li>
        <li><a href="https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked" target="_blank">Chrome</a></li>
        <li><a href="https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading" target="_blank">Edge</a></li>
      </ul>
    </ol>

    <h2 class="saharian-debug-h2">Accessibility examples</h2>
    <p>The good, the bad, and the ugly of web accessibility.</p>
    <p>Here you can check out some examples of accessible and inaccessible web components. Each example is a standalone page that demonstrates a specific accessibility issue. The examples are designed to be viewed with SahARIAn enabled to see how a screen reader would interpret the web page.</p>
    <ul id="examples-list">
      <?php
      $ignored = ["useful TO-DO list"];
      $examples = glob('*/index.html');
      foreach ($examples as $example) {
        $name = substr($example, 0, strpos($example, '/'));

        if (in_array($name, $ignored)) {
          continue;
        }

        echo
        <<<example
          <li>
            <a href="$name/">$name</a>
          </li>\n
          example;
      }
      ?>
    </ul>
  </main>
</body>

</html>
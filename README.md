# Pure_Anime
Just watch anime. without doing anything.


# Web Extension.

This is a web extension that block's new page creation on click on any Element in the page, which directs us to random ads.

## Features

- It also has options to remove the top Element layers of the page.
 

## Setup and Installation

To set up and build the extension, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/NitishKumar078/Pure_Anime
   cd your-repo-name # Pure_Anime
   
2. **Install dependencies**
   ```bash
   npm install

3. **Build the extension**
   ```bash
   npm run build
   
4. **Load the extension in Chrome**
   - Open Chrome and navigate to chrome://extensions/
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked" and select the build folder from your project directory
  
5. **Usage**
-Open the Chrome browser and navigate to a web page.
-Select the text within any HTML element you want to extract.
-Click on the extension icon to extract and display the text.


**Project Structure.** <br/>

      ├── public  <br/>
      │   ├── icons/...    <br/>
      |   ├── manifest.html  <br/>
      ├── src   <br/>
      │   ├── background.js  <br/>
      │   ├── content.js  <br/>
      │   ├── react/...  <br/>
      │   |   ├── index.js  <br/>
      |   |   ├── components/...  <br/>
      |   |   └── index.tsx  <br/>
      │   ├── index.html  <br/>
      ├── package.json  <br/>
      ├── otherFiles...  <br/>
      └── README.md  <br/>


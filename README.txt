========================================================================
             SARASWATI NIWAS - HOSTEL BOOKING WEBSITE
========================================================================

All the code files for your hostel booking website have been successfully 
generated and placed in this folder on your Desktop!

------------------------------------------------------------------------
1. HOW TO RUN THE WEBSITE OFFLINE / LOCALLY
------------------------------------------------------------------------

If you want to run this website on your computer offline, follow these steps:

Step A: Open Terminal / Command Prompt
  - Press the Windows Key, type "cmd", and press Enter.
  
Step B: Navigate to this folder
  - Type the following command and press Enter:
    cd Desktop\saraswati-niwas
    
Step C: Install dependencies (first time only)
  - Type the following command and press Enter:
    npm install
    
Step D: Start the offline server
  - Type the following command and press Enter:
    npm run dev
    
Step E: Open in Browser
  - Open your web browser and go to:
    http://localhost:3000

------------------------------------------------------------------------
2. HOW TO SHARE THIS WEBSITE WITH OTHERS
------------------------------------------------------------------------

You have three main options to share this website:

Option A: Share the Folder (Local/Offline code)
  - Right-click this "saraswati-niwas" folder on your Desktop.
  - Select "Compress to ZIP file".
  - Send the ZIP file to anyone. They can unzip it, run "npm install" and 
    "npm run dev" on their terminal, and view the site locally.

Option B: Deploy Online for Free (Get a live link like saraswati.vercel.app)
  - Go to https://vercel.com/ and create a free account.
  - Install the Vercel CLI by running this in your terminal:
    npm install -g vercel
  - Type "vercel" inside the project folder, log in, and press Enter.
  - Vercel will deploy the site and give you a free, public, live link 
    (e.g., https://saraswati-niwas.vercel.app) that you can share with 
    anyone in the world!

Option C: Static HTML Export (Run offline without node_modules)
  - Open "next.config.mjs" in this folder.
  - Update the file to:
    
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'export',
      images: {
        unoptimized: true,
      }
    };
    export default nextConfig;
    
  - Run "npm run build" in your terminal.
  - This will create a folder named "out" containing raw HTML, CSS, and JS.
  - You can zip the "out" folder. Anyone can double-click "index.html" 
    inside it and view the site completely offline, without needing node/terminal!
========================================================================

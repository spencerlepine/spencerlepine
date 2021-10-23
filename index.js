require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

const injectREADME = async () => {
  // Read from the template file
  const templateREADME = (
    await fs.readFile(path.join(process.cwd(), "/assets/README_TEMPLATE.md"))
  ).toString("utf-8");

  // Get a new image link
  const dogAPIResponse = await (
    await fetch("https://dog.ceo/api/breed/shiba/images/random")
  ).json();

  if (dogAPIResponse.status === 'success') {
    const newImage = dogAPIResponse.message;

    // find and replace <IMAGE_LINK>
    const updatedREADME = templateREADME
      .replace("<IMAGE_LINK>", newImage)

    await fs.writeFile("README.md", updatedREADME);
  } else {
    console.error('Unable to fetch new Shiba image:', dogAPIResponse.message)
  }
}

injectREADME();

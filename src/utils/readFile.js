const fs = require("fs/promises");

const DATA_PATH = "data/";

const readFile = async (data_name) => {
  try {
    const data = await fs.readFile(DATA_PATH + data_name, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error reading file:${data_name} `);
  }
};

const writeFile = async (data_name, data) => {
  try {
    await fs.writeFile(DATA_PATH + data_name, data);
  } catch (error) {
    console.log(`Error writing file:${data_name} `);
  }
};

module.exports = { readFile, writeFile };

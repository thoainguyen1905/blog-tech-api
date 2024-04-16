import fs from "fs";
import axios from "axios";
import cheerio from "cheerio";

const writetoFile = async (data) => {
  const filePath = "output.json";
  try {
    fs.writeFileSync(filePath, JSON.stringify(data));
    console.log("Data written to file successfully:", filePath);
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

const crawlerWeb = async (page?: number) => {
  const url = `https://thegioiboardgame.vn/blogs/blog?page=${page}`;
  try {
    const data = [] as any;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const listTitle = [] as Array<string>;
    const listDescription = [] as Array<string>;
    const thumbnails = [] as any;
    $("h2.title").each((index, element) => {
      listTitle.push($(element).text());
    });
    $("div.row>p").each((index, element) => {
      listDescription.push($(element).text());
    });
    $("p > img").each((index, ele) => {
      let text = $(ele).prop("src");
      text = text.replace(/^\/\//, "");
      thumbnails.push(text);
    });

    if (thumbnails.length === 0) {
      $("div > img").each((index, ele) => {
        let text = $(ele).prop("src");
        text = text.replace(/^\/\//, "");
        thumbnails.push(text);
      });
    }

    for (let i = 0; i < thumbnails.length; i++) {
      const newItem = {
        description: listDescription[i],
        title: listTitle[i],
        thumbnail: thumbnails[i],
      };
      data.push(newItem);
    }
    // writetoFile(data);
    return data;
    // return response.data;
  } catch (error) {
    console.error("Error crawling website:", error);
    throw error;
  }
};

export default crawlerWeb;

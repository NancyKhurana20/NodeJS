const fs = require("fs");

//Node.js asynchronous functions don't necessarily execute in the same order as the lines in your code. If one operation depends on another, you need to explicitly control the sequence.

//If we write like this the functions seperately , it can execute in any order so thats why we should perform this one inside other

//Writing into file
fs.writeFile("intro.txt", "Hello I am Learning Node JS", function (err) {
  if (err) console.error(err);
  else console.log("File Created , and data written into file");
});

//Appending into file --> Adding further into the file
fs.appendFile("intro.txt", " My name is Nancy Khurana", function (err) {
  if (err) console.error(err);
  else console.log("Data appended into file");
});

//Reading a file
fs.readFile("intro.txt", "utf8", function (err, data) {
  if (err) console.error(err);
  else console.log(data);
});

//Renaming a file
fs.rename("intro.txt", "Intro.txt", function (err) {
  if (err) console.error(err);
  else console.log("File renamed");
});

//Copying the file
fs.copyFile("Intro.txt", "./copy/copy.txt", function (err) {
  if (err) console.error(err);
  else console.log("File copied");
});

//Deleting a File --> unlink
fs.unlink("Intro.txt", function (err) {
  if (err) console.error(err);
  else console.log("File deleted");
});

//Deleting folder --> rmdir or rm
fs.rmdir("./copy", { recursive: true }, function (err) {
  if (err) console.error(err);
  else console.log("Folder deleted");
});

//Creating a folder
fs.mkdir("myFolder", function (err) {
  if (err) console.error(err);
  else console.log("Folder created");
});

//stat is used to get info about file or folder
fs.stat("intro.txt", function (err, stats) {
  if (err) {
    console.error(err);
  } else {
    console.log(stats);
  }
});

//Executing one inside other for maintaining the  sequence

fs.writeFile("intro.txt", "Hello I am Learning Node JS", function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log("File Created, and data written into file");

  fs.appendFile("intro.txt", " My name is Nancy Khurana", function (err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Data appended into file");

    fs.readFile("intro.txt", "utf8", function (err, data) {
      //UTF-8 is a character encoding that tells the computer how bytes should be interpreted as characters.
      if (err) {
        console.error(err);
        return;
      }

      console.log(data);
    });
  });
});

//Promise version
// const fs = require("fs").promises;

// async function readFile() {
//     try {
//         const data = await fs.readFile("intro.txt", "utf8");
//         console.log(data);
//     } catch (err) {
//         console.error(err);
//     }
// }

// readFile();

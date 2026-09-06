# File Handling in Node.js

---

## What is File Handling?

File handling means **creating, reading, modifying, copying, renaming, and deleting files and folders** using a program.

Node.js provides the **File System (`fs`) module** to perform file and folder operations.

---

## File System (`fs`) Module

The `fs` module is a built-in Node.js module used to interact with the file system.

It allows us to:

- Create files
- Write data to files
- Read files
- Append data
- Rename files
- Copy files
- Delete files
- Create folders
- Delete folders
- Get information about files and folders

---

## Writing to a File

**`writeFile()`** is used to write data into a file.

- If the file does not exist, it creates the file.
- If the file already exists, its previous content is replaced.

---

## Appending to a File

**`appendFile()`** is used to add new data to the end of an existing file.

It does not remove the existing content.

---

## Reading a File

**`readFile()`** is used to read the contents of a file.

When reading a text file, **UTF-8 encoding** can be used to receive the content as a readable string instead of a Buffer.

---

## Renaming a File

**`rename()`** is used to change the name or location of a file.

It can also be used to move a file to another location.

---

## Copying a File

**`copyFile()`** is used to create a copy of an existing file.

The original file remains unchanged.

---

## Deleting a File

**`unlink()`** is used to delete a file from the file system.

Once deleted, the file is no longer available at that location.

---

## Creating a Folder

**`mkdir()`** is used to create a new directory (folder).

Directories are useful for organizing files and maintaining a proper project structure.

---

## Deleting a Folder

Node.js provides methods for removing directories.

`rmdir()` was traditionally used for this purpose. For modern applications, **`rm()`** is generally preferred, especially when removing directories recursively.

---

## Getting Information About a File

**`stat()`** is used to obtain information (metadata) about a file or directory.

It can provide information such as:

- Whether the path is a file
- Whether the path is a directory
- File size
- Creation time
- Last modification time

`stat()` does **not** read the actual contents of the file.

---

## Asynchronous File Operations

Most `fs` operations are available in an **asynchronous** form.

Asynchronous operations allow Node.js to continue executing other tasks while waiting for a file operation to complete.

This is important because file operations can take time, especially when working with large files.

---

## Callbacks

Asynchronous `fs` methods commonly use **callbacks** to handle the result of an operation.

A callback can be used to:

- Check whether an error occurred
- Process the result after the operation is completed

---

## Error Handling

File operations can fail for several reasons, such as:

- File does not exist
- Folder does not exist
- Incorrect file path
- Permission problems
- File is being accessed incorrectly

Node.js provides an **error object** when an operation fails.

A common error is **`ENOENT`**, which means that the specified file or directory could not be found.

---

## Buffer

When Node.js reads a file without specifying an encoding, the data is generally returned as a **Buffer**.

A Buffer represents raw binary data.

Buffers are useful when working with:

- Images
- Videos
- PDFs
- Audio
- Other binary files

For normal text files, UTF-8 encoding is commonly used to get the content as a string.

---

## Important Concepts Learned

- **`fs` module** → Used for file system operations
- **`writeFile()`** → Write/create a file
- **`appendFile()`** → Add data to a file
- **`readFile()`** → Read file contents
- **`rename()`** → Rename or move a file
- **`copyFile()`** → Copy a file
- **`unlink()`** → Delete a file
- **`mkdir()`** → Create a directory
- **`rmdir()` / `rm()`** → Remove a directory
- **`stat()`** → Get file or directory information
- **UTF-8** → Decode file data into readable text
- **Buffer** → Represents raw binary data
- **Asynchronous operations** → Allow Node.js to continue working while an operation is in progress
- **Callbacks** → Handle the result of asynchronous operations

---
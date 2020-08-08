const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
   const notes = loadNotes();
   const duplicateNote = notes.find((note) => note.title === title);

   if (!duplicateNote) {
      notes.push({
         title: title,
         body: body,
      });
      saveNotes(notes);
      console.log('New note added!');
   } else {
      console.log('Note title taken!');
   }
};

const saveNotes = (notes) => {
   const dataJSON = JSON.stringify(notes);
   fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
   } catch (e) {
      return [];
   }
};

const removeNote = (title) => {
   const notes = loadNotes();
   const updData = notes.filter((note) => note.title !== title);

   if (notes.length === updData.length) {
      console.log(chalk.bgRed.black('No note found'));
   } else {
      console.log(chalk.bgGreen.black(`The note "${title}" removed!`));
      saveNotes(updData);
   }
};

const listNotes = () => {
   const notes = loadNotes();
   notes.forEach((note) => {
      console.log(
         `${chalk.bgMagenta.black(`Your note is:`)} ${chalk.bgYellow.black(
            note.title
         )}`
      );
   });
};

const readNote = (title) => {
   const notes = loadNotes();
   const note = notes.find((seachedNote) => seachedNote.title === title);

   if (!note) {
      console.log(chalk.bgRed.black('No note found'));
   } else {
      console.log(
         `Your note is ${chalk.bgMagenta.black(
            note.title
         )} and the content is ${chalk.bgCyan.black(note.body)}`
      );
   }
};

module.exports = {
   getNotes: getNotes,
   addNote: addNote,
   removeNote: removeNote,
   listNotes: listNotes,
   readNote: readNote,
};

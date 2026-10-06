const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

let notes = [];

function render() {
  notesList.textContent = '';

  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (visibleNotes.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.className = 'empty-message';
    emptyMessage.textContent = searchTerm
      ? 'No notes match your search.'
      : 'No notes yet. Add your first note above.';
    notesList.appendChild(emptyMessage);
  } else {
    visibleNotes.forEach(note => {
      const listItem = document.createElement('li');
      listItem.className = `note-card category-${note.category}`;

      const noteContent = document.createElement('p');
      noteContent.className = 'note-content';
      noteContent.textContent = note.text;

      const meta = document.createElement('div');
      meta.className = 'note-meta';

      const details = document.createElement('div');

      const categoryLabel = document.createElement('span');
      categoryLabel.className = 'category-label';
      categoryLabel.textContent = note.category;

      const date = document.createElement('time');
      date.className = 'note-date';
      date.dateTime = new Date(note.createdAt).toISOString();
      date.textContent = note.createdAt;

      details.append(categoryLabel, document.createTextNode(' • '), date);

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'delete-btn';
      deleteButton.textContent = 'Delete';
      deleteButton.dataset.id = note.id;
      deleteButton.setAttribute('aria-label', `Delete note: ${note.text}`);

      meta.append(details, deleteButton);
      listItem.append(noteContent, meta);
      notesList.appendChild(listItem);
    });
  }

  updateCount();
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function saveNotes() {
  localStorage.setItem('quicknotes-notes', JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = localStorage.getItem('quicknotes-notes');

  if (!savedNotes) {
    notes = [];
    return;
  }

  try {
    const parsedNotes = JSON.parse(savedNotes);
    notes = Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (error) {
    notes = [];
    localStorage.removeItem('quicknotes-notes');
  }
}

noteForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (!text) {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  const note = {
    id: Date.now().toString(),
    text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  saveNotes();
  noteForm.reset();
  errorMessage.textContent = '';
  render();
  noteInput.focus();
});

notesList.addEventListener('click', event => {
  const deleteButton = event.target.closest('.delete-btn');

  if (!deleteButton) {
    return;
  }

  const noteId = deleteButton.dataset.id;
  notes = notes.filter(note => String(note.id) !== String(noteId));
  saveNotes();
  render();
});

searchInput.addEventListener('input', render);

loadNotes();
render();

const baseUrl = 'http://18.179.108.80:8080';

export function getBooks() {
   return fetch(`${baseUrl}/books/`);
}

export function getBookId(bookId) {
   return fetch(`${baseUrl}/books/${bookId}/`);
}

export function getChapter(chapterId) {
   return fetch(`${baseUrl}/chapters/${chapterId}/`);
}
import React, { useState, useEffect } from 'react';
import { getBooks, getChapter } from './services/mangaAPI';
import PagingView from './page/pagingView';
import './App.css';

function App() {

   const [data, setData] = useState({
      books: [],
      currentBook: 0,
      booksData: []
   })

   useEffect(() => {
      const initialiseApp = async () => {
         const books = await getBooks().then(response => response.json());
         const firstBook = await mergePagesAndCacheImages(books[0].chapter_ids)
         setData(data => ({
            ...data,
            books,
            booksData: [firstBook]
         }))

      }
      initialiseApp()
   }, []);


   useEffect(() => {
      const fetchOtherBooks = async () => {
         const [firstBook, ...otherBooks] = [...data.books]
         let otherBookDataArr = [];
         for (const book of otherBooks) {
            const otherBookData = await mergePagesAndCacheImages(book.chapter_ids)
            otherBookDataArr.push(otherBookData)
         }
         setData(data => ({
            ...data,
            booksData: [
               ...data.booksData, ...otherBookDataArr
            ]
         }))
      }
      if (data.books.length > 0) {
         fetchOtherBooks();
      }
      return;
   }, [data.books])

   const mergePagesAndCacheImages = async (chapters) => {
      let mergedPages = {}
      for (const [i, chapter] of Object.entries(chapters)) {
         const pages = await fetchAllPagesOfChapter(chapter)
         mergedPages[i] = pages;
         cacheImages(pages)
      }
      return mergedPages;
   }

   const cacheImages = async (pages) => {
      const promises = await pages.map((page) => {
         return new Promise(function (resolve, reject) {
            const img = new Image();
            img.src = page.image.file;
            img.onload = resolve();
            img.onerror = reject();
         })
      })
      await Promise.all(promises)
   }

   const fetchAllPagesOfChapter = async (chapter) => {
      const pages = await getChapter(chapter)
         .then(response => response.json())
         .then(({ pages }) => {
            return pages
         })
      return pages;
   }


   const handleBookChange = (i) => {
      //console.log(i)
      setData({
         ...data,
         currentBook: i
      })
   }
   if (Object.keys(data.books).length > 0) {
      return (
         <div className="App">
            <h4>Manga Reader</h4>
            <marquee>Click on <span style={{ color: "red" }}>left half</span> or <span style={{ color: "blue" }}>right half </span>of image to change page.</marquee>
            {data.books.map((book, i) => {
               return (
                  <button
                     key={i}
                     onClick={() => handleBookChange(i)}
                     className={`${data.currentBook === i ? 'activeManga' : ''}`}
                  >
                     {book.title}
                  </button>
               )
            })}
            <br />

            <PagingView
               currentBookData={data.booksData[data.currentBook] || null}
            />
         </div>
      )
   } else {
      return <div>Loading...</div>
   }
}

export default App;

import React, { useState, useEffect } from 'react';
import Page from './page';

function PagingView({ currentBookData }) {


   const [view, setView] = useState({
      currentChapter: 0,
      currentPage: 0,
      totalChapters: currentBookData ? Object.keys(currentBookData)?.length : null,
      totalPages: currentBookData ? currentBookData[0].length : null,
      currentImage: ''
   })
   // handle book change
   useEffect(() => {
      if (currentBookData && Object.keys(currentBookData).length > 0) {
         setView((view) => ({
            ...view,
            currentChapter: 0,
            currentPage: 0,
            totalPages: currentBookData[0].length,
            currentImage: currentBookData[0][0]["image"]["file"],
            totalChapters: Object.keys(currentBookData).length,
         }))
      }
      return;
   }, [currentBookData])

   const handleChapterChange = (i) => {
      console.log(i)
      setView({
         ...view,
         currentPage: 0,
         currentImage: currentBookData[i][0]["image"]["file"],
         currentChapter: i,
         totalPages: currentBookData[i].length
      })
   }

   const handleRightClick = () => {
      const { currentPage, currentChapter } = view;

      console.log('clicked left', currentPage, currentChapter)
      if (currentPage === 0 && currentChapter === 0) return;
      if (currentPage === 0 && currentChapter > 0) return handleChapterChange(currentChapter - 1,);

      return setView({
         ...view,
         currentPage: currentPage - 1,
         currentImage: currentBookData[currentChapter][currentPage - 1]["image"]["file"]
      })
      // console.log('img-----', currentChapter, currentPage + 1)
      // console.log('imgSRC', currentBookData[currentChapter - 1][currentPage]["image"]["file"])
   }
   const handleLeftClick = () => {
      const { currentPage, totalPages, currentChapter, totalChapters } = view;
      console.log('clicked right', currentPage, currentChapter)
      if (currentPage + 1 === totalPages && currentChapter + 1 === totalChapters) return;
      if (currentPage + 1 === totalPages) return handleChapterChange(currentChapter + 1);

      return setView({
         ...view,
         currentPage: currentPage + 1,
         currentImage: currentBookData[currentChapter][currentPage + 1]["image"]["file"]
      })
   }

   if (currentBookData) {
      return (
         <div>

            {Object.keys(currentBookData).map((_, i) => {
               return (
                  <button
                     key={i}
                     className={`${view.currentChapter === i ? 'activeChapter' : ''} btn`}
                     onClick={() => handleChapterChange(i)}
                  >
                     {i + 1}
                  </button>
               )
            })}
            <br />
            <Page
               url={view.currentImage}
               className=""
               handleRightClick={() => handleRightClick()}
               handleLeftClick={() => handleLeftClick()}
            />

            <div>{view.currentPage + 1} / {view.totalPages}</div>

         </div>
      )
   } else {
      return <div>Loading...</div>
   }

}

export default PagingView;

import React, { useEffect } from 'react';

function Page({ url, handleLeftClick, handleRightClick }) {

   useEffect(() => {
      if (!document.querySelector(".currentMangaImg")) return;
      function handleClickOnImg(e) {
         const clickTarget = e.target;
         const clickTargetWidth = clickTarget.offsetWidth;
         const xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;
         if (clickTargetWidth / 2 > xCoordInClickTarget) {
            // right click
            handleRightClick()
         } else {
            // left click
            handleLeftClick()
         }
      }

      document.querySelector(".currentMangaImg").addEventListener('click', handleClickOnImg)
      return () => {
         if (!document.querySelector(".currentMangaImg")) return;
         document.querySelector(".currentMangaImg").removeEventListener('click', handleClickOnImg)
      }
   }, [handleLeftClick, handleRightClick])



   return (
      <div className="currentMangaImg">
         <img className="mangaImg" src={url} alt={url} />
      </div>
   )
}

export default Page;
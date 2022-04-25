export function debounce(func, delay) {
       let time = null
       return function (...arg) {
         if (time !== null) {
           clearTimeout(time)
         }
         time = setTimeout(() => {
           func.apply(this, arg)
         }, delay)
       }
     }
     
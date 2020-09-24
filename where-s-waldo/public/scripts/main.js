document.querySelector('#img-where-waldo').addEventListener('click', event => {
    console.log(`widthRatio ${(event.pageX - event.target.offsetLeft)/event.target.clientWidth} heightRatio ${(event.pageY - event.target.offsetTop)/event.target.clientHeight}`)
});
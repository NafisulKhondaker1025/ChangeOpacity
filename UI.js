AFRAME.registerComponent('change-sky', {
    init() {
      const container = document.getElementById('container')

      const skyList = ['#pines', '#snow', '#beach']
      var currSky = 0

      function setPortal() {
          if (currSky === skyList.length - 1) {
              currSky = 0;
          } else {
              currSky++;
          }
          var sky = document.getElementById('sky')
          sky.setAttribute('src', skyList[currSky])
      }
      nextButton = document.getElementsByClassName('btn')
      nextButton.addEventListener('click', function () {
        setPortal()
      })
      nextButton.classList.add('carousel')

      // support horizontal scroll
      container.style.pointerEvents = 'auto'
    },
  })
  
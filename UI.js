AFRAME.registerComponent('change-sky', {
    init() {
      const container = document.getElementById('container')
      nextbtn = document.createElement('a')
      nextbtn.innerHTML = "x"
      nextbtn.classNAme = 'btn'
      nextbtn.setAttribute('href', 'javascript:void(0)')
      const skyList = ['#pines', '#snow', '#beach']
      var currSky = 0

      function setPortal() {
        console.log('called')
          if (currSky === skyList.length - 1) {
              currSky = 0;
          } else {
              currSky++;
          }
          var sky = document.getElementById('sky')
          sky.setAttribute('src', skyList[currSky])
      }
      nextbtn.addEventListener('onclick', function () {
        setPortal()
      })
      //nextButton.classList.add('carousel')

      // support horizontal scroll
      //container.style.pointerEvents = 'auto'
    },
  })
  
const changeskyComponent = {
    init() {
      const container = document.getElementById('container')
      // These hex colors are used by the UI buttons and car
      // default: purple, orange, green, blue, black
      const skyList = ['#pines', '#snow', '#beach']
      var currSky = 0
      // Named the specified mesh within the 3D model 'Car' (The mesh for the cars exterior/paint)
      function setPortal() {
          if (currSky === skyList.length - 1) {
              currSky = 0;
          } else {
              currSky++;
          }
          var sky = document.getElementById('sky')
          sky.setAttribute('src', skyList[currSky])
      }
      // create a UI button for each color in the list that changes the car color
      for (let i = 0; i < skyList.length; i++) {
        const nextButton = document.createElement('button')
        nextButton.classList.add('carousel')
        nextButton.style.backgroundColor = colorList[i]
        container.appendChild(nextButton)
        nextButton.addEventListener('click', function () {
          setPortal()
        })
      }
      this.el.sceneEl.addEventListener('realityready', () => {
        // Select first button in list
        const firstButton = container.getElementsByTagName('button')[0]
        // set car to first button's color
        setColor({newColor: colorList[0], button: firstButton})
      })
      // support horizontal scroll
      container.style.pointerEvents = 'auto'
    },
  }
  export {changeskyComponent}
  
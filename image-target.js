AFRAME.registerComponent('physics-image-target', {
    schema: {
      name: {type: 'string'},
    },
    init() {
      const {object3D} = this.el
      const {name} = this.data
      const scene = this.el.sceneEl
      const portalPos = this.el
      object3D.visible = false
  
      const attachment = scene.querySelector('#attachment')
      const obj = scene.querySelector('#civ')
  
      const showImage = ({detail}) => {
        if (name !== detail.name) {
          return
        }
        object3D.position.copy(detail.position)
        object3D.quaternion.copy(detail.rotation)
        object3D.scale.set(detail.scale, detail.scale, detail.scale)
        object3D.visible = true
      }
  
      const imageFound = (e) => {
        showImage(e)
  
        obj.setAttribute('animation__riseIn', {
          property: 'scale',
          dur: 1500,
          from: '0.001 0.001 0.001',
          to: '2 2 2',
          easing: 'easeInOutQuad',
        })
      }
  
      scene.addEventListener('xrimagefound', imageFound)
      scene.addEventListener('xrimageupdated', showImage)
      scene.addEventListener('xrimagelost', imageLost)
    },
  })
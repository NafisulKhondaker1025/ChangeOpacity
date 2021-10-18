const {Depthkit} = window

AFRAME.registerComponent('depthkitComponent', {
  schema: {
    capture: {type: 'string', default: 'John'},
    loop: {type: 'boolean', default: false},
    autoplay: {type: 'boolean', default: false},
    opacity: {type: 'number', default: 1},
    volume: {type: 'number', default: 1},
    meshScalar: {type: 'number', default: 8, oneOf: [1, 2, 3, 4]},
    play: {type: 'boolean', default: false},
    rotated: {type: 'boolean', default: false},
  },
  init() {
    this.character = new Depthkit()
    this.depthkitLoadedFlag = false
    this.prompt = document.getElementById('text')
    this.shadow = document.getElementById('shadow')
    const scope = this
    const {data} = this
    const {el} = this
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00, opacity: 0.0})
    material.transparent = true
    material.depthWrite = false
    const dkMesh = new THREE.Mesh(geometry, material)
    el.setObject3D('mesh', dkMesh)
    const depthkitLoadedCallback = this.depthkitLoaded.bind(this)
    // some depthkit captures come in rotated 90 degrees on the z-axis
    if (this.data.rotated) {
      this.el.setAttribute('rotation', '0 0 90')
    } else {
      this.el.setAttribute('rotation', '0 0 0')
    }
    this.character.load(require('./assets/dktext'),
      require(`https://biosphere2.blob.core.windows.net/asset-b485af1e-984e-48ea-8af0-9359daf19952/Take 3_Sarape_Porfirio Guitierez08_19_13_22_35_Export_10_06_10_22_44.mp4`), depthkitLoadedCallback)
    dkMesh.add(this.character)
  },
  depthkitLoaded() {
    const {data} = this
    this.depthkitLoadedFlag = true
    this.character.setOpacity(data.opacity)
    this.character.setVolume(data.volume)
    // show 'tap to place'
    this.prompt.style.display = 'block'
    this.el.sceneEl.addEventListener('mousedown', () => {
      this.character.setOpacity(1.0)
      this.character.play()
      this.shadow.setAttribute('visible', true)
      this.prompt.style.display = 'none'
    })
    this.character.setMeshScalar(data.meshScalar)
    if (data.autoplay) {
      this.character.play()
    }
  },
  update(previousData) {
    const {data} = this
    const {character} = this
    if (this.depthkitLoadedFlag) {
      if (data.play) {
        character.play()
      }
      character.setLoop(data.loop)
      character.setOpacity(data.opacity)
      character.setVolume(data.volume)
      character.setMeshScalar(data.meshScalar)
    }
  },
  remove() {
    this.el.removeObject3D('mesh')
  },
})
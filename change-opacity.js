AFRAME.registerComponent('change-opacity', {
  init: function () {
    this.el.addEventListener('model-loaded', this.update.bind(this));
  },
  update: function () {
    var mesh = this.el.getObject3D('mesh');
    if (!mesh) { return; }
    mesh.traverse(function (node) {
      if (node.isMesh) {
        if (node.name === 'walls') {
          node.material.opacity = 0.5;
          node.material.transparent = true;
          node.material.needsUpdate = true;
        }
        if (node.name === 'roof') {
          node.material.opacity = 0.5;
          node.material.transparent = true;
          node.material.needsUpdate = true;
        }
        if (node.name === 'floor') {
          node.material.opacity = 0.5;
          node.material.transparent = true;
          node.material.needsUpdate = true;
        }
      }
    });
  }
});
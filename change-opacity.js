AFRAME.registerComponent('change-opacity', {
    init: function () {
      this.el.addEventListener('model-loaded', this.update.bind(this));
    },
    update: function () {
      var mesh = this.el.getObject3D('mesh');
      var opacity = 1.0;
      if (!mesh) { return; }
      mesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.opacity = opacity;
          node.material.transparent = opacity < 1.0;
          node.material.needsUpdate = true;
        }
      });
    }
  });
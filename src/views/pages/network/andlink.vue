<template>
  <div ref="info" class="content">
    <h1>123123
    </h1>
  </div>
</template>

<script>
import * as THREE from "three";
import { AnaglyphEffect } from "../../../three/AnaglyphEffect.js";
export default {
  data() {
    return {
      container: null,
      camera: null,
      scene: null,
      renderer: null,
      effect: null,
      spheres: [],
      mouseX: 0,
      mouseY: 0,
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2
    };
  },
  mounted() {
    document.addEventListener("mousemove", this.onDocumentMouseMove);
    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.container = document.createElement("div");
      console.log(window.innerWidth / window.innerHeight)
      this.$refs.info.appendChild(this.container);

      this.camera = new THREE.PerspectiveCamera(
        60,
        1,
        0.01,
        50
      );
      this.camera.position.z = 3;
      this.camera.focalLength = 3;

      const path = "../../../assets/images/";
      const format = ".png";
      const urls = [
        path + "qr" + format,
        path + "qr" + format,
        path + "qr" + format,
        path + "qr" + format,
        path + "qr" + format,
        path + "qr" + format
      ];

      const textureCube = new THREE.CubeTextureLoader().load(urls);

      this.scene = new THREE.Scene();
      this.scene.background = textureCube;

      const geometry = new THREE.SphereGeometry(0.1, 32, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        envMap: textureCube
      });

      for (let i = 0; i < 500; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 10 - 5;
        mesh.position.y = Math.random() * 10 - 5;
        mesh.position.z = Math.random() * 10 - 5;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
        this.scene.add(mesh);
        this.spheres.push(mesh);
      }
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.container.appendChild(this.renderer.domElement);
      const width = window.innerWidth || 2;
      const height = window.innerHeight || 2;
      this.effect = new AnaglyphEffect(this.renderer);
      this.effect.setSize(width, height);
      window.addEventListener("resize", this.onWindowResize);
    },

    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.effect.setSize(window.innerWidth, window.innerHeight);
    },

    onDocumentMouseMove(event) {
      this.mouseX = (event.clientX - this.windowHalfX) / 100;
      this.mouseY = (event.clientY - this.windowHalfY) / 100;
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      const timer = 0.0001 * Date.now();
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.scene.position);
      for (let i = 0, il = this.spheres.length; i < il; i++) {
        const sphere = this.spheres[i];
        sphere.position.x = 5 * Math.cos(timer + i);
        sphere.position.y = 5 * Math.sin(timer + i * 1.1);
      }
      this.effect.render(this.scene, this.camera);
    }
  }
};
</script>

<style>
@import "../../../three/main.css";
</style>
<style lang="less">
.content{
    height: 100%;
    width: 100%
}
</style>
import * as THREE from 'three';
import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';
import { EffectComposer, RenderPass, ShaderPass, RGBShiftShader, DotScreenShader } from 'three/examples/jsm/Addons.js';
import { CustomPass } from './CustomPass';
import scrollProgress from './scrollAnimation.js';
import bg from './bg.jpg';

import t1 from '../img/t1.jpg';
import t2 from '../img/t2.jpg';
import t3 from '../img/t3.jpg';



class Sketch {
  constructor() {

    this.urls = [t1, t2, t3];
    this.textures = this.urls.map(url => new THREE.TextureLoader().load(url));

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearAlpha(0);
    this.renderer.setSize(width, height);
    this.renderer.physicallyCorrectLights = true;
    document.getElementById('container').appendChild(this.renderer.domElement);
    
    document.body.style.backgroundImage = `url(${bg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundRepeat = 'no-repeat';
    
    this.renderer.domElement.style.position = 'fixed';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.pointerEvents = 'none';

    this.camera = new THREE.PerspectiveCamera(70, width / height, 0.001, 1000);
    this.camera.position.z = 1;


    this.scene = new THREE.Scene();
    this.time = 0;
    this.params = { progress: 0, scale: 0.98 };

    // ensure the page can scroll (otherwise scrollPercent stays 0)
    document.documentElement.style.height = '200vh';
    document.body.style.height = '200vh';
    document.body.style.overflowY = 'auto';

    this.initPost();
    if (this.effect2?.uniforms?.scale) {
      this.effect2.uniforms.scale.value = this.params.scale;
    }

    this.addMesh();
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);

    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
    console.log(scrollProgress());

  }

  initPost() {

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    // this.effect1 = new ShaderPass(RGBShiftShader);
    // this.effect1.uniforms['amount'].value = 0.0015;
    // this.composer.addPass(this.effect1);

    this.effect2 = new ShaderPass(CustomPass);

    this.composer.addPass(this.effect2);
  }

  addMesh() {

    
    this.material = new THREE.ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        uTexture: { value: this.textures[0] }
      },
      side: THREE.DoubleSide,
    })
    this.geometry = new THREE.PlaneGeometry(1.9 / 2, 1 / 2, 1, 1);

    this.meshes = []

    this.textures.forEach((t, i) => {
      let m = this.material.clone();
      m.uniforms.uTexture.value = t;
      const mesh = new THREE.Mesh(this.geometry, m);
      this.scene.add(mesh);
      this.meshes.push(mesh);
      mesh.position.x = i - 1;
      // mesh.position.y = -1;
    })

  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  onScroll() {
    this.params.progress = scrollProgress(0, 100, 0.1);
  }

  render() {
    this.time += 0.01;
    this.params.progress = scrollProgress(0, 100, 0.1);
    this.meshes.forEach((mesh, i) => {
      mesh.material.uniforms.time.value = this.time;
      mesh.position.y = -this.params.progress / 100;
      mesh.rotation.z = (this.params.progress / 100) * Math.PI / 2;
    });
    if (this.effect2?.uniforms?.time) {
      this.effect2.uniforms.time.value = this.time;
    }
    if (this.effect2?.uniforms?.progress) {
      this.effect2.uniforms.progress.value = this.params.progress / 100;
    }
    requestAnimationFrame(this.render);
    this.composer.render();
  }
}

new Sketch();
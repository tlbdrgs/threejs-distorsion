# Three.js Distortion Scroll Effect

A smooth **scroll-based distortion and shader experiment** built with [Three.js](https://threejs.org/).  
As you scroll, images transition and distort beautifully using a **custom GLSL pass**.

---

# Preview

![](https://github.com/tlbdrgs/threejs-distorsion/blob/main/demo%20distorsion.gif)


---

## Overview

This project uses:
- **Three.js** for WebGL rendering  
- **Custom ShaderPass** for distortion  
- **Scroll tracking** to control animation progress  
- A **scroll-linked post-processing effect** for a fluid transition experience  

---

## Features

- Custom shader distortion (`CustomPass.js`)  
- Scroll-driven transitions (`scrollAnimation.js`)  
- Multi-texture scene (`main.js`)  
- Post-processing via `EffectComposer` and `ShaderPass`  
- Background with smooth blending  
- Responsive resizing  

---
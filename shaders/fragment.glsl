precision highp float;
uniform sampler2D uTexture;
uniform float time;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  gl_FragColor = texture2D(uTexture, uv);
}
// Original, finite-lived ripple shader. No textures or floating-point extensions
// required: overlapping damped waves tilt a dark water surface under soft lights.
const vertexSource = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const fragmentSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uSize;
uniform vec2 uResolution;
uniform float uTime;
uniform vec4 uRipples[12];

void main() {
  vec2 p = gl_FragCoord.xy / uResolution * uSize;
  vec2 slope = vec2(0.0);
  for (int i = 0; i < 12; i++) {
    vec4 ripple = uRipples[i];
    float age = uTime - ripple.z;
    if (age >= 0.0 && age < 3.5 && ripple.w > 0.0) {
      vec2 delta = p - ripple.xy;
      float distance = length(delta);
      float front = distance - age * 135.0;
      float envelope = exp(-front * front / 10000.0) * exp(-age * 1.15);
      float wave = cos(front * 0.045) * envelope * ripple.w;
      slope += delta / max(distance, 1.0) * wave;
    }
  }
  // A smooth normal field gives continuous reflections, without a visible
  // texture underneath. Narrow and broad lights pick out the wave crests.
  vec3 normal = normalize(vec3(-slope * 0.65, 1.0));
  vec3 reflection = reflect(vec3(0.0, 0.0, -1.0), normal);
  vec3 keyLight = normalize(vec3(-0.8, 0.65, 1.0));
  vec3 fillLight = normalize(vec3(0.7, -0.4, 0.65));
  float key = pow(max(dot(reflection, keyLight), 0.0), 26.0);
  float fill = pow(max(dot(reflection, fillLight), 0.0), 9.0);
  float activity = smoothstep(0.0, 0.3, length(slope));
  float fresnel = pow(1.0 - normal.z, 2.0);
  vec2 uv = p / uSize;
  float pool = exp(-dot((uv - vec2(0.6, 0.55)) * vec2(1.4, 2.0),
                        (uv - vec2(0.6, 0.55)) * vec2(1.4, 2.0)) * 3.0);
  vec3 color = vec3(0.063, 0.063, 0.059) + vec3(0.012, 0.015, 0.018) * pool;
  color += vec3(0.56, 0.60, 0.63) * key * activity * 0.48;
  color += vec3(0.28, 0.31, 0.34) * fill * activity * 0.22;
  color += vec3(0.12, 0.15, 0.18) * fresnel;
  gl_FragColor = vec4(color, 1.0);
}
`;

export function createLiquidBackground(canvas: HTMLCanvasElement, hero: HTMLElement): (() => void) | undefined {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return;

  const shaders: WebGLShader[] = [];
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const release = () => {
    delete canvas.dataset.ready;
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    shaders.forEach(shader => gl.deleteShader(shader));
  };
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!program || !buffer || !vertex || !fragment) { release(); return; }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { release(); return; }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const size = gl.getUniformLocation(program, "uSize");
  const resolution = gl.getUniformLocation(program, "uResolution");
  const time = gl.getUniformLocation(program, "uTime");
  const waves = gl.getUniformLocation(program, "uRipples[0]");
  const ripples = new Float32Array(12 * 4);
  const epoch = performance.now();
  let frame = 0;
  let slot = 0;
  let lastInput = -1000;
  let expires = 0;
  let visible = false;
  let lost = false;
  let width = 1;
  let height = 1;
  let previous: { x: number; y: number } | undefined;
  const seconds = () => (performance.now() - epoch) / 1000;

  const draw = () => {
    frame = 0;
    if (lost || !visible || document.hidden) return;
    gl.uniform1f(time, seconds());
    gl.uniform4fv(waves, ripples);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    canvas.dataset.ready = "";
    if (seconds() < expires) frame = requestAnimationFrame(draw);
  };
  const wake = () => {
    if (!frame && visible && !document.hidden && !lost) frame = requestAnimationFrame(draw);
  };
  const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = undefined; };
  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    // Cap the fill rate on high-density screens.
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(size, width, height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
    ripples.fill(0);
    previous = undefined;
    expires = 0;
    wake();
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch" || !visible || lost || document.hidden) return;
    const now = seconds();
    if (now - lastInput < 0.045) return;
    const bounds = canvas.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = height - (event.clientY - bounds.top);
    const distance = previous ? Math.hypot(x - previous.x, y - previous.y) : 24;
    if (distance < 5) return;
    ripples.set([x, y, now, Math.min(1, 0.35 + distance / 100)], slot * 4);
    slot = (slot + 1) % 12;
    lastInput = now;
    previous = { x, y };
    expires = now + 3.5;
    wake();
  };
  const leave = () => { previous = undefined; };
  const visibility = () => { if (document.hidden) stop(); else wake(); };
  const contextLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    stop();
    delete canvas.dataset.ready;
  };
  // On context loss keep the CSS fallback until remount, rather than retain
  // invalid GPU resources or draw against a restored empty context.
  canvas.addEventListener("webglcontextlost", contextLost);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake(); else stop();
  });
  observer.observe(hero);
  const sizing = new ResizeObserver(resize);
  sizing.observe(canvas);
  resize();
  hero.addEventListener("pointermove", move);
  hero.addEventListener("pointerleave", leave);
  window.addEventListener("blur", leave);
  window.addEventListener("scroll", leave, { passive: true });
  document.addEventListener("visibilitychange", visibility);

  return () => {
    stop();
    observer.disconnect();
    sizing.disconnect();
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerleave", leave);
    window.removeEventListener("blur", leave);
    window.removeEventListener("scroll", leave);
    document.removeEventListener("visibilitychange", visibility);
    canvas.removeEventListener("webglcontextlost", contextLost);
    release();
  };
}

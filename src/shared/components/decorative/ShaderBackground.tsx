import { useEffect, useRef } from 'react';
import { Renderer, Triangle, Program, Mesh } from 'ogl';

export type ShaderVariant = 'waves' | 'dust';

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// helpers compartilhados: simplex noise 3D (Ashima), fbm e rand
const GLSL_HELPERS = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 p){
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 2; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  float rand(vec2 c){ return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
`;

// fundo "ondas" (domain warping)
const WAVES_MAIN = /* glsl */ `
  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= aspect;

    float t = uTime * 0.045;
    vec2 sp = p * 1.4;

    vec2 q = vec2(
      fbm(vec3(sp, t)),
      fbm(vec3(sp + vec2(3.2, 1.3), t))
    );
    vec2 r = vec2(
      fbm(vec3(sp + 1.8 * q + vec2(1.7, 9.2), t * 0.6)),
      fbm(vec3(sp + 1.8 * q + vec2(8.3, 2.8), t * 0.6))
    );
    float f = fbm(vec3(sp + 2.2 * r, t));
    f = f * 0.5 + 0.5;

    vec3 base   = vec3(0.0235, 0.0, 0.0392); // #06000a
    vec3 deep   = vec3(0.157,  0.031,  0.216);  // #280837
    vec3 bright = vec3(0.2824, 0.0549, 0.3882); // #480e63
    vec3 shadow = vec3(0.003,  0.008,  0.045);

    vec3 col = base;
    col = mix(shadow, col, smoothstep(0.0, 0.55, f));
    col = mix(col, deep,   smoothstep(0.30, 0.70, f) * 1.0);
    col = mix(col, bright, smoothstep(0.52, 0.98, f) * 1.0);
    col += bright * pow(clamp(length(r), 0.0, 1.0), 2.0) * 0.5 * smoothstep(0.4, 1.0, f);

    vec2 lc = vec2(0.5 + 0.22 * sin(t * 0.7), 0.45 + 0.18 * cos(t * 0.55));
    lc.x *= aspect;
    float light = smoothstep(0.8, 0.0, distance(p, lc));
    col += bright * light * 0.10 * (0.4 + 0.6 * f);

    float vig = smoothstep(1.2, 0.28, distance(uv, vec2(0.5)));
    col *= 0.5 + 0.5 * vig;

    float g = rand(uv + fract(uTime));
    col += (g - 0.5) * 0.04;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// fundo "poeira": particulas roxas flutuando devagar
const DUST_MAIN = /* glsl */ `
  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= aspect;
    vec2 px = gl_FragCoord.xy;

    float t = uTime * 0.05;

    vec3 base   = vec3(0.0235, 0.0,    0.0392); // #06000a
    vec3 deep   = vec3(0.157,  0.031,  0.216);  // #280837
    vec3 dust   = vec3(0.45,   0.28,   0.62);   // roxo claro da poeira

    vec3 col = base;

    // bruma roxa de fundo bem sutil (profundidade)
    float n = fbm(vec3(p * 1.6, t * 0.4));
    n = n * 0.5 + 0.5;
    col = mix(col, deep, smoothstep(0.45, 0.95, n) * 0.35);

    // particulas de poeira em 3 camadas (parallax), subindo devagar
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      float cell = 70.0 + fi * 35.0;
      vec2 gv = px / cell + vec2(0.0, t * (6.0 + fi * 3.0));
      vec2 id = floor(gv);
      vec2 fpos = fract(gv);
      vec2 rp = vec2(rand(id + fi * 11.0), rand(id + fi * 23.0 + 4.0));
      float present = step(0.55, rand(id + fi * 7.0));
      float d = length(fpos - rp);
      float dot = smoothstep(0.05, 0.0, d) * present;
      float tw = 0.6 + 0.4 * sin(t * 6.0 + rand(id) * 30.0);
      col += dust * dot * (0.18 - fi * 0.04) * tw;
    }

    // grao fino discreto
    float g = rand(uv + fract(uTime));
    col += (g - 0.5) * 0.025;

    // vinheta
    float vig = smoothstep(1.3, 0.35, distance(uv, vec2(0.5)));
    col *= 0.6 + 0.4 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const FRAGMENTS: Record<ShaderVariant, string> = {
  waves: GLSL_HELPERS + WAVES_MAIN,
  dust: GLSL_HELPERS + DUST_MAIN,
};

interface ShaderBackgroundProps {
  variant?: ShaderVariant;
  className?: string;
}

export function ShaderBackground({ variant = 'waves', className = '' }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new Renderer({ alpha: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) });
    const gl = renderer.gl;
    gl.clearColor(0.0235, 0.0, 0.0392, 1);

    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment: FRAGMENTS[variant],
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      program.uniforms.uResolution.value = [canvas.width, canvas.height];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let raf = 0;
    const update = (time: number) => {
      program.uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(update);
    };

    if (reducedMotion) {
      program.uniforms.uTime.value = 4.0;
      renderer.render({ scene: mesh });
    } else {
      raf = requestAnimationFrame(update);
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reducedMotion && raf === 0) {
        raf = requestAnimationFrame(update);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [variant]);

  return <div ref={containerRef} aria-hidden="true" className={`w-full h-full ${className}`} />;
}

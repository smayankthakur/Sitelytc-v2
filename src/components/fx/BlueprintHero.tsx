"use client";

import { useEffect, useRef } from "react";

/**
 * Signature WebGL hero — an interactive gold "blueprint": a layered grid plus
 * the SL diamond lattice that brightens, glows and ripples under the cursor.
 * Raw WebGL (no Three.js), DPR-capped, reduced-motion = single static frame,
 * pointer-fine = cursor interaction. Bails silently if WebGL is unavailable.
 */
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_motion;

const vec3 BG    = vec3(0.027, 0.031, 0.051);
const vec3 GOLD  = vec3(0.945, 0.760, 0.360);
const vec3 GOLDD = vec3(0.769, 0.533, 0.114);
const vec3 BRAND = vec3(0.31, 0.27, 0.90);

float gridLine(vec2 p, float cell, float w) {
  vec2 f = abs(fract(p / cell - 0.5) - 0.5);
  vec2 l = smoothstep(w, 0.0, f);
  return max(l.x, l.y);
}

float diamondEdge(vec2 p, float r, float w) {
  float d = abs(abs(p.x) + abs(p.y) - r);
  return smoothstep(w, 0.0, d);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_motion > 0.5 ? u_time : 0.0;
  vec2 m = (u_mouse - 0.5 * u_res) / u_res.y;

  vec2 p = uv + vec2(sin(t * 0.05) * 0.02, cos(t * 0.04) * 0.02);

  // layered blueprint grid
  float minor = gridLine(p, 0.075, 0.010);
  float major = gridLine(p, 0.30, 0.016);
  // 45deg lattice (echoes the SL diamond mark)
  vec2 dp = vec2(p.x - p.y, p.x + p.y);
  float latt = gridLine(dp, 0.15, 0.009);

  // breathing central diamond + inner diamond
  float br = 0.36 + (u_motion > 0.5 ? sin(t * 0.6) * 0.012 : 0.0);
  float dia = diamondEdge(p, br, 0.006) + diamondEdge(p, br * 0.6, 0.005);

  // cursor influence
  float md = length(uv - m);
  float near = smoothstep(0.5, 0.0, md);
  float glow = smoothstep(0.34, 0.0, md);
  float ripple = u_motion > 0.5
    ? (sin(md * 26.0 - t * 3.2) * 0.5 + 0.5) * smoothstep(0.5, 0.0, md)
    : 0.0;

  // faint scan sweep
  float scan = u_motion > 0.5
    ? smoothstep(0.015, 0.0, abs(fract(p.y * 0.4 - t * 0.05) - 0.5))
    : 0.0;

  float lines = minor * 0.08 + major * 0.19 + latt * 0.055;
  lines *= 1.0 + near * 2.7 + ripple * near * 1.5;
  lines += dia * (0.55 + near * 0.8);
  lines += scan * 0.04;

  vec3 col = BG;
  col += mix(GOLDD, GOLD, near) * lines;
  col += GOLD * glow * 0.58;                 // cursor glow

  // drifting brand + gold aurora for depth
  vec2 a1 = vec2(-0.42 + sin(t * 0.05) * 0.05, 0.22);
  col += BRAND * smoothstep(0.9, 0.0, length(uv - a1)) * 0.07;
  vec2 a2 = vec2(0.5, -0.12 + cos(t * 0.04) * 0.04);
  col += GOLD * smoothstep(0.8, 0.0, length(uv - a2)) * 0.045;

  // gentle center dim so headline text keeps contrast
  col *= mix(1.0, 0.6, smoothstep(0.55, 0.0, length(uv)));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("[blueprint] shader error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function BlueprintHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const gl =
      canvas.getContext("webgl", { antialias: true, alpha: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[blueprint] link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uMotion = gl.getUniformLocation(prog, "u_motion");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };
    const target = { x: -9999, y: -9999 };

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width * dpr));
      h = Math.max(1, Math.floor(r.height * dpr));
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      gl.viewport(0, 0, w, h);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      target.x = (e.clientX - r.left) * dpr;
      target.y = h - (e.clientY - r.top) * dpr; // flip to gl_FragCoord origin
    };
    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };
    if (fine && !reduce) {
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", resize);

    const start = performance.now();
    let raf = 0;

    const render = (now: number) => {
      mouse.x += (target.x - mouse.x) * 0.12;
      mouse.y += (target.y - mouse.y) * 0.12;
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMotion, reduce ? 0 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      // single static frame
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, 0);
      gl.uniform2f(uMouse, -9999, -9999);
      gl.uniform1f(uMotion, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

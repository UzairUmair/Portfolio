# Mobile rendering

The portfolio keeps its real WebGL scene, materials, composition and scrolling animations.

- `RenderBudget.jsx` requests up to 30 3D frames per second on touch/small-screen or reported low-memory/low-core devices, and up to 60 elsewhere. This is a scheduling target, not a guaranteed measured frame rate.
- Hidden tabs and still project-detail scenes do not continuously render. Reduced motion remains supported.
- The editorial portfolio also pauses the GPU scene when its clipped windows are outside the viewport, and shares one sphere geometry among its forms.
- Touch scrolling stays native (`syncTouch: false`). Gallery rain retains its existing off-screen pause and user controls.
- All scheduling timers and intersection observers are removed on cleanup.

Validation: production build; emulated 390 × 844 touch viewport with reported 4 GB / 4 cores; live canvas, scrolling camera, case-study routes, no horizontal overflow or JavaScript page errors. Physical low-end phone frame rate and thermal behavior still need device testing.

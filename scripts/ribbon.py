from pathlib import Path
from math import sin,cos,pi,sqrt
# Original twisted ribbon surface, projected with a fixed studio camera.
def point(u,v):
 r=2.15+v*cos(u/2);x=r*cos(u);y=r*sin(u);z=v*sin(u/2)
 y,z=y*cos(.8)-z*sin(.8),y*sin(.8)+z*cos(.8)
 x,z=x*cos(.38)+z*sin(.38),-x*sin(.38)+z*cos(.38)
 x,y=x*cos(-.5)-y*sin(-.5),x*sin(-.5)+y*cos(-.5)
 return x,y,z
N=240;M=22;faces=[]
for i in range(N):
 for j in range(M):
  u=i/N*2*pi;v=-.74+j/M*1.48;du=2*pi/N;dv=1.48/M
  pts=[point(u,v),point(u+du,v),point(u+du,v+dv),point(u,v+dv)]
  a=[pts[1][k]-pts[0][k] for k in range(3)];b=[pts[3][k]-pts[0][k] for k in range(3)]
  n=[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];length=sqrt(sum(q*q for q in n));n=[q/length for q in n]
  light=abs(n[0]*-.35+n[1]*-.65+n[2]*.67);shine=abs(n[2])**16
  hue=sin(u*1.3+v*2);base=[146+light*67+shine*30+12*hue,151+light*70+shine*24+15*cos(u),190+light*45+shine*18]
  color='#'+''.join(f'{max(0,min(255,int(c))):02x}' for c in base)
  screen=[(400+x*119,440+y*157) for x,y,z in pts]
  d='M'+' L'.join(f'{x:.2f},{y:.2f}' for x,y in screen)+'Z'
  faces.append((sum(q[2] for q in pts)/4,f'<path d="{d}" fill="{color}" stroke="{color}" stroke-width=".65"/>'))
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900"><defs><radialGradient id="shadow"><stop stop-color="#736388" stop-opacity=".14"/><stop offset="1" stop-color="#736388" stop-opacity="0"/></radialGradient></defs><ellipse cx="410" cy="793" rx="260" ry="32" fill="url(#shadow)"/>'
svg+=''.join(s for _,s in sorted(faces))+'</svg>'
Path('assets/sources/ribbon.svg').write_text(svg)

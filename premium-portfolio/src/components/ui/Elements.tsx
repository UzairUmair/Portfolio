import Link from 'next/link';import {ArrowUpRight,ArrowDown} from 'lucide-react';
export function Button({href,children,secondary=false}:{href:string;children:React.ReactNode;secondary?:boolean}){return <Link className={`button magnetic ${secondary?'secondary':''}`} href={href}>{children}<ArrowUpRight size={17}/></Link>}
export function Label({children}:{children:React.ReactNode}){return <p className="eyebrow">{children}</p>}
export function Heading({children,className=''}:{children:React.ReactNode;className?:string}){return <h2 className={`section-title ${className}`} data-reveal>{children}</h2>}
export function JsonLd({data}:{data:unknown}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}}/>}
export function ScrollHint(){return <a className="scroll-hint" href="#about"><span>SCROLL TO DISCOVER</span><ArrowDown size={18}/></a>}

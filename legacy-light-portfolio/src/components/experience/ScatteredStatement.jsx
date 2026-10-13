const statement = 'Every project starts with an idea. I bring the right tools, thoughtful design and careful development together to turn that idea into an experience worth exploring.';
export default function ScatteredStatement(){
  return <section className="scattered-section" aria-label="My creative approach"><p className="editorial-label">FROM A FIRST IDEA / TO THE FINAL DETAIL</p><p className="scattered-statement" aria-label={statement}>{statement.split(' ').map((word,index)=><span className="scatter-word" aria-hidden="true" key={index}>{word}</span>)}</p><span className="scatter-footnote">SCROLL TO BRING IT TOGETHER</span></section>;
}

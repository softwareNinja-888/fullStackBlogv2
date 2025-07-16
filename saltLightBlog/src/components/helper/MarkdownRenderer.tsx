const processMarkdown = (text) => {
  // Split content by lines
  const lines = text.split('\n');
  const elements = [];
  let currentElement = '';
  let elementType = 'p';
  let listItems = [];
  let inList = false;
  let inBlockquote = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle horizontal rules
    if (line.trim() === '---') {
      if (currentElement.trim()) {
        elements.push(createElement(elementType, currentElement.trim()));
        currentElement = '';
      }
      if (inList) {
        elements.push(createList(listItems));
        listItems = [];
        inList = false;
      }
      elements.push(<hr key={i} className="my-8 border-t-2 border-gradient-to-r from-transparent via-blue-500 to-transparent" />);
      continue;
    }
    
    // Handle headings
    if (line.startsWith('# ')) {
      if (currentElement.trim()) {
        elements.push(createElement(elementType, currentElement.trim()));
        currentElement = '';
      }
      if (inList) {
        elements.push(createList(listItems));
        listItems = [];
        inList = false;
      }
      elements.push(<h1 key={i} className="text-4xl font-bold mb-6 mt-8 text-gray-800 border-b-4 border-blue-500 pb-2">{line.substring(2)}</h1>);
      continue;
    }
    
    if (line.startsWith('## ')) {
      if (currentElement.trim()) {
        elements.push(createElement(elementType, currentElement.trim()));
        currentElement = '';
      }
      if (inList) {
        elements.push(createList(listItems));
        listItems = [];
        inList = false;
      }
      elements.push(<h2 key={i} className="text-3xl font-semibold mb-4 mt-6 text-gray-700 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-blue-500 before:to-purple-600">{line.substring(3)}</h2>);
      continue;
    }
    
    if (line.startsWith('### ')) {
      if (currentElement.trim()) {
        elements.push(createElement(elementType, currentElement.trim()));
        currentElement = '';
      }
      if (inList) {
        elements.push(createList(listItems));
        listItems = [];
        inList = false;
      }
      elements.push(<h3 key={i} className="text-2xl font-semibold mb-3 mt-5 text-gray-700">{line.substring(4)}</h3>);
      continue;
    }
    
    // Handle blockquotes
    if (line.startsWith('> ')) {
      if (currentElement.trim()) {
        elements.push(createElement(elementType, currentElement.trim()));
        currentElement = '';
      }
      if (inList) {
        elements.push(createList(listItems));
        listItems = [];
        inList = false;
      }
      elements.push(<blockquote key={i} className="my-6 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 italic text-lg text-gray-700 rounded-r-lg">{line.substring(2)}</blockquote>);
      continue;
    }
    
    // Handle list items
    if (line.startsWith('- ')) {
      if (currentElement.trim()) {
        elements.push(createElement(elementType, currentElement.trim()));
        currentElement = '';
      }
      listItems.push(line.substring(2));
      inList = true;
      continue;
    }
    
    // Handle empty lines
    if (line.trim() === '') {
      if (currentElement.trim()) {
        elements.push(createElement(elementType, currentElement.trim()));
        currentElement = '';
      }
      if (inList) {
        elements.push(createList(listItems));
        listItems = [];
        inList = false;
      }
      continue;
    }
    
    // Regular paragraph content
    if (!inList) {
      if (currentElement) {
        currentElement += ' ';
      }
      currentElement += line;
      elementType = 'p';
    }
  }
  
  // Handle remaining content
  if (currentElement.trim()) {
    elements.push(createElement(elementType, currentElement.trim()));
  }
  if (inList) {
    elements.push(createList(listItems));
  }
  
  return elements;
};
    
const createElement = (type, content) => {
  const key = Math.random().toString(36).substring(7);
  if (type === 'p') {
    return <p key={key} className="mb-6 text-lg leading-relaxed text-gray-600 text-justify">{content}</p>;
  }
  return <div key={key}>{content}</div>;
};


const createList = (items) => {
  const key = Math.random().toString(36).substring(7);
  return (
    <ul key={key} className="mb-6 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-500 mr-3 mt-1">•</span>
          <span className="text-lg text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  );
};
    
return <div className="prose max-w-none">{processMarkdown(content)}</div>;


export function MarkdownRenderer({content}){
	return (
		<>

		</>
	)
}
import {
  Completion,
  CompletionContext,
  autocompletion,
} from '@codemirror/autocomplete';

type LanguageKey =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'go'
  | 'rust'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'sql'
  | 'xml'
  | 'php';

const JS_UTILS: Completion[] = [
  { label: 'console.log', type: 'function', apply: 'console.log("message")' },
  { label: 'console.error', type: 'function', apply: 'console.error("error")' },
  {
    label: 'fetch',
    type: 'function',
    apply: 'fetch("https://api.example.com/data").then(res => res.json())',
  },
  {
    label: 'setTimeout',
    type: 'function',
    apply: 'setTimeout(() => {\n  console.log("delayed");\n}, 1000)',
  },
  {
    label: 'setInterval',
    type: 'function',
    apply: 'setInterval(() => {\n  console.log("interval");\n}, 1000)',
  },
  {
    label: 'JSON.stringify',
    type: 'function',
    apply: 'JSON.stringify({ key: "value" })',
  },
  {
    label: 'JSON.parse',
    type: 'function',
    apply: 'JSON.parse(\'{ "key": "value" }\')',
  },
  { label: 'Math.random', type: 'function', apply: 'Math.random()' },
  { label: 'Date.now', type: 'function', apply: 'Date.now()' },
  { label: 'Array.from', type: 'function', apply: 'Array.from("abc")' },
  {
    label: 'Object.keys',
    type: 'function',
    apply: 'Object.keys({ a: 1, b: 2 })',
  },
  {
    label: 'Object.values',
    type: 'function',
    apply: 'Object.values({ a: 1, b: 2 })',
  },
  {
    label: 'Promise.resolve',
    type: 'function',
    apply: 'Promise.resolve("success")',
  },
  {
    label: 'async',
    type: 'keyword',
    apply:
      'async function fetchData() {\n  const response = await fetch("https://api.example.com");\n  return response.json();\n}',
  },
  {
    label: 'await',
    type: 'keyword',
    apply: 'await fetch("https://api.example.com")',
  },
  {
    label: 'map',
    type: 'method',
    apply: 'const doubled = numbers.map((num) => num * 2)',
  },
  {
    label: 'filter',
    type: 'method',
    apply: 'const evens = numbers.filter((num) => num % 2 === 0)',
  },
  {
    label: 'reduce',
    type: 'method',
    apply: 'const sum = numbers.reduce((acc, num) => acc + num, 0)',
  },
  {
    label: 'forEach',
    type: 'method',
    apply: 'numbers.forEach((num) => console.log(num))',
  },
  {
    label: 'addEventListener',
    type: 'function',
    apply:
      'element.addEventListener("click", (event) => {\n  console.log("clicked");\n})',
  },
  {
    label: 'try catch',
    type: 'structure',
    apply:
      'try {\n  const result = riskyOperation();\n} catch (error) {\n  console.error("Error:", error);\n}',
  },
  {
    label: 'class',
    type: 'keyword',
    apply:
      'class MyClass {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    console.log(`Hello, ${this.name}`);\n  }\n}',
  },
  { label: 'const', type: 'keyword', apply: 'const message = "Hello World"' },
  { label: 'let', type: 'keyword', apply: 'let count = 0' },
  { label: 'var', type: 'keyword', apply: 'var globalVar = "global"' },
  {
    label: 'function',
    type: 'keyword',
    apply: 'function add(a, b) {\n  return a + b;\n}',
  },
  { label: 'arrow function', type: 'function', apply: '(x) => x * 2' },
  {
    label: 'debounce',
    type: 'function',
    apply:
      'const debounce = (func, delay) => {\n  let timeout;\n  return (...args) => {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), delay);\n  };\n};',
  },
  {
    label: 'throttle',
    type: 'function',
    apply:
      'const throttle = (func, limit) => {\n  let inThrottle;\n  return (...args) => {\n    if (!inThrottle) {\n      func.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n};',
  },
];

const REACT_UTILS: Completion[] = [
  {
    label: 'useState',
    type: 'function',
    apply: 'const [count, setCount] = useState(0)',
  },
  {
    label: 'useEffect',
    type: 'function',
    apply: 'useEffect(() => {\n  console.log("mounted");\n}, [])',
  },
  {
    label: 'useContext',
    type: 'function',
    apply: 'const theme = useContext(ThemeContext)',
  },
  { label: 'useRef', type: 'function', apply: 'const inputRef = useRef(null)' },
  {
    label: 'useMemo',
    type: 'function',
    apply:
      'const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b])',
  },
  {
    label: 'useCallback',
    type: 'function',
    apply:
      'const memoizedCallback = useCallback(() => {\n  doSomething(a, b);\n}, [a, b])',
  },
  {
    label: 'useReducer',
    type: 'function',
    apply: 'const [state, dispatch] = useReducer(reducer, initialState)',
  },
  {
    label: 'useLayoutEffect',
    type: 'function',
    apply: 'useLayoutEffect(() => {\n  console.log("layout effect");\n}, [])',
  },
  {
    label: 'Fragment',
    type: 'component',
    apply: '<> <h1>Title</h1> <p>Content</p> </>',
  },
  {
    label: 'useImperativeHandle',
    type: 'function',
    apply:
      'useImperativeHandle(ref, () => ({\n  focus: () => inputRef.current.focus()\n}))',
  },
  {
    label: 'forwardRef',
    type: 'function',
    apply:
      'const FancyInput = forwardRef((props, ref) => (\n  <input ref={ref} {...props} />\n));',
  },
  {
    label: 'memo',
    type: 'function',
    apply:
      'const MyComponent = memo((props) => (\n  <div>{props.value}</div>\n));',
  },
  {
    label: 'lazy',
    type: 'function',
    apply: 'const LazyComponent = lazy(() => import("./LazyComponent")); ',
  },
  {
    label: 'Suspense',
    type: 'component',
    apply:
      '<Suspense fallback={<div>Loading...</div>}>\n  <LazyComponent />\n</Suspense>',
  },
];

const TS_UTILS: Completion[] = [
  {
    label: 'interface',
    type: 'keyword',
    apply: 'interface User {\n  id: number;\n  name: string;\n}',
  },
  {
    label: 'type',
    type: 'keyword',
    apply: 'type Status = "loading" | "success" | "error";',
  },
  { label: 'declare', type: 'keyword', apply: 'declare const globalVar: any;' },
  {
    label: 'namespace',
    type: 'keyword',
    apply: 'namespace Utils {\n  export function helper() {}\n}',
  },
  {
    label: 'enum',
    type: 'keyword',
    apply: 'enum Direction {\n  Up,\n  Down,\n  Left,\n  Right\n}',
  },
  {
    label: 'generic function',
    type: 'function',
    apply: 'function identity<T>(arg: T): T {\n  return arg;\n}',
  },
  {
    label: 'React.FC',
    type: 'type',
    apply:
      'const MyComponent: React.FC<{ title: string }> = ({ title }) => {\n  return <h1>{title}</h1>;\n};',
  },
];

const DOM_UTILS: Completion[] = [
  {
    label: 'document.querySelector',
    type: 'function',
    apply: 'document.querySelector("#myId")',
  },
  {
    label: 'document.getElementById',
    type: 'function',
    apply: 'document.getElementById("myId")',
  },
  {
    label: 'localStorage.getItem',
    type: 'function',
    apply: 'localStorage.getItem("key")',
  },
  {
    label: 'localStorage.setItem',
    type: 'function',
    apply: 'localStorage.setItem("key", "value")',
  },
  { label: 'window.alert', type: 'function', apply: 'window.alert("Hello")' },
  {
    label: 'window.confirm',
    type: 'function',
    apply: 'window.confirm("Are you sure?")',
  },
  {
    label: 'window.prompt',
    type: 'function',
    apply: 'window.prompt("Enter name")',
  },
  {
    label: 'createElement',
    type: 'function',
    apply: 'document.createElement("div")',
  },
  {
    label: 'appendChild',
    type: 'function',
    apply: 'parent.appendChild(childElement)',
  },
  {
    label: 'getAttribute',
    type: 'function',
    apply: 'element.getAttribute("href")',
  },
  {
    label: 'setAttribute',
    type: 'function',
    apply: 'element.setAttribute("class", "active")',
  },
  {
    label: 'innerHTML',
    type: 'property',
    apply: 'element.innerHTML = "<p>Content</p>"',
  },
  {
    label: 'textContent',
    type: 'property',
    apply: 'element.textContent = "Text"',
  },
  {
    label: 'classList.add',
    type: 'method',
    apply: 'element.classList.add("highlight")',
  },
  {
    label: 'classList.remove',
    type: 'method',
    apply: 'element.classList.remove("highlight")',
  },
  { label: 'style', type: 'property', apply: 'element.style.color = "red"' },
];

const PYTHON_KEYWORDS: Completion[] = [
  { label: 'if', type: 'keyword', apply: 'if condition:\n  print("True")' },
  { label: 'else', type: 'keyword', apply: 'else:\n  print("False")' },
  {
    label: 'for',
    type: 'keyword',
    apply: 'for item in range(5):\n  print(item)',
  },
  {
    label: 'while',
    type: 'keyword',
    apply: 'while condition:\n  print("Looping")',
  },
  {
    label: 'def',
    type: 'keyword',
    apply: 'def my_function(param):\n  return param * 2',
  },
  {
    label: 'class',
    type: 'keyword',
    apply: 'class MyClass:\n  def __init__(self, name):\n    self.name = name',
  },
  { label: 'import', type: 'keyword', apply: 'import math' },
  { label: 'from', type: 'keyword', apply: 'from math import sqrt' },
  {
    label: 'try',
    type: 'keyword',
    apply:
      'try:\n  risky_code()\nexcept Exception as e:\n  print(f"Error: {e}")',
  },
  {
    label: 'with',
    type: 'keyword',
    apply: 'with open("file.txt", "r") as f:\n  content = f.read()',
  },
];

const PYTHON_BUILTINS: Completion[] = [
  { label: 'print', type: 'function', apply: 'print("Hello World")' },
  { label: 'len', type: 'function', apply: 'len("string")' },
  { label: 'range', type: 'function', apply: 'range(5)' },
  { label: 'list', type: 'function', apply: 'list("abc")' },
  { label: 'dict', type: 'function', apply: 'dict(a=1, b=2)' },
  { label: 'str', type: 'function', apply: 'str(123)' },
  { label: 'int', type: 'function', apply: 'int("123")' },
  { label: 'float', type: 'function', apply: 'float("3.14")' },
  { label: 'open', type: 'function', apply: 'open("file.txt", "r")' },
  { label: 'input', type: 'function', apply: 'input("Enter text: ")' },
  { label: 'enumerate', type: 'function', apply: 'enumerate(["a", "b"])' },
  { label: 'sorted', type: 'function', apply: 'sorted([3, 1, 2])' },
  { label: 'sum', type: 'function', apply: 'sum([1, 2, 3])' },
  { label: 'max', type: 'function', apply: 'max([1, 2, 3])' },
  { label: 'min', type: 'function', apply: 'min([1, 2, 3])' },
];

const JAVA_KEYWORDS: Completion[] = [
  {
    label: 'public class',
    type: 'keyword',
    apply:
      'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}',
  },
  {
    label: 'if',
    type: 'keyword',
    apply: 'if (condition) {\n  System.out.println("True");\n}',
  },
  {
    label: 'else',
    type: 'keyword',
    apply: 'else {\n  System.out.println("False");\n}',
  },
  {
    label: 'for',
    type: 'keyword',
    apply: 'for (int i = 0; i < 5; i++) {\n  System.out.println(i);\n}',
  },
  {
    label: 'while',
    type: 'keyword',
    apply: 'while (condition) {\n  System.out.println("Looping");\n}',
  },
  {
    label: 'try',
    type: 'keyword',
    apply:
      'try {\n  riskyCode();\n} catch (Exception e) {\n  System.out.println("Error: " + e.getMessage());\n}',
  },
  { label: 'import', type: 'keyword', apply: 'import java.util.Scanner;' },
];

const JAVA_UTILS: Completion[] = [
  {
    label: 'System.out.println',
    type: 'function',
    apply: 'System.out.println("Hello World");',
  },
  {
    label: 'Scanner',
    type: 'class',
    apply:
      'Scanner sc = new Scanner(System.in);\nString input = sc.nextLine();',
  },
  {
    label: 'ArrayList',
    type: 'class',
    apply: 'ArrayList<String> list = new ArrayList<>();\nlist.add("item");',
  },
  {
    label: 'HashMap',
    type: 'class',
    apply:
      'HashMap<String, Integer> map = new HashMap<>();\nmap.put("key", 1);',
  },
  { label: 'Math.random', type: 'function', apply: 'Math.random()' },
  { label: 'Math.max', type: 'function', apply: 'Math.max(1, 2)' },
  {
    label: 'StringBuilder',
    type: 'class',
    apply: 'StringBuilder sb = new StringBuilder();\nsb.append("text");',
  },
];

const CPP_KEYWORDS: Completion[] = [
  {
    label: 'int main',
    type: 'keyword',
    apply:
      '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World" << endl;\n  return 0;\n}',
  },
  {
    label: 'if',
    type: 'keyword',
    apply: 'if (condition) {\n  cout << "True" << endl;\n}',
  },
  {
    label: 'else',
    type: 'keyword',
    apply: 'else {\n  cout << "False" << endl;\n}',
  },
  {
    label: 'for',
    type: 'keyword',
    apply: 'for (int i = 0; i < 5; i++) {\n  cout << i << endl;\n}',
  },
  {
    label: 'while',
    type: 'keyword',
    apply: 'while (condition) {\n  cout << "Looping" << endl;\n}',
  },
  { label: '#include', type: 'keyword', apply: '#include <vector>' },
];

const CPP_UTILS: Completion[] = [
  { label: 'cout', type: 'function', apply: 'cout << "Hello" << endl;' },
  { label: 'cin', type: 'function', apply: 'cin >> input;' },
  {
    label: 'vector',
    type: 'class',
    apply: 'vector<int> vec;\nvec.push_back(1);',
  },
  { label: 'map', type: 'class', apply: 'map<string, int> m;\nm["key"] = 1;' },
  { label: 'rand', type: 'function', apply: 'rand() % 10' },
  { label: 'sort', type: 'function', apply: 'sort(vec.begin(), vec.end());' },
];

const GO_KEYWORDS: Completion[] = [
  {
    label: 'package main',
    type: 'keyword',
    apply:
      'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello World")\n}',
  },
  {
    label: 'if',
    type: 'keyword',
    apply: 'if condition {\n  fmt.Println("True")\n}',
  },
  {
    label: 'else',
    type: 'keyword',
    apply: 'else {\n  fmt.Println("False")\n}',
  },
  {
    label: 'for',
    type: 'keyword',
    apply: 'for i := 0; i < 5; i++ {\n  fmt.Println(i)\n}',
  },
  {
    label: 'func',
    type: 'keyword',
    apply: 'func add(a int, b int) int {\n  return a + b\n}',
  },
  { label: 'import', type: 'keyword', apply: 'import (\n  "fmt"\n)' },
];

const GO_UTILS: Completion[] = [
  {
    label: 'fmt.Println',
    type: 'function',
    apply: 'fmt.Println("Hello World")',
  },
  {
    label: 'fmt.Printf',
    type: 'function',
    apply: 'fmt.Printf("Value: %d", 42)',
  },
  { label: 'len', type: 'function', apply: 'len([]int{1, 2, 3})' },
  { label: 'append', type: 'function', apply: 'append(slice, 4)' },
  { label: 'make', type: 'function', apply: 'make([]int, 5)' },
  {
    label: 'range',
    type: 'keyword',
    apply: 'for _, v := range slice {\n  fmt.Println(v)\n}',
  },
];

const RUST_KEYWORDS: Completion[] = [
  {
    label: 'fn main',
    type: 'keyword',
    apply: 'fn main() {\n  println!("Hello World");\n}',
  },
  {
    label: 'if',
    type: 'keyword',
    apply: 'if condition {\n  println!("True");\n}',
  },
  { label: 'else', type: 'keyword', apply: 'else {\n  println!("False");\n}' },
  {
    label: 'for',
    type: 'keyword',
    apply: 'for i in 0..5 {\n  println!("{}", i);\n}',
  },
  {
    label: 'loop',
    type: 'keyword',
    apply: 'loop {\n  println!("Infinite loop");\n  break;\n}',
  },
  {
    label: 'match',
    type: 'keyword',
    apply:
      'match value {\n  1 => println!("one"),\n  _ => println!("other"),\n}',
  },
  { label: 'use', type: 'keyword', apply: 'use std::io::stdin;' },
];

const RUST_UTILS: Completion[] = [
  { label: 'println!', type: 'macro', apply: 'println!("Hello World");' },
  { label: 'vec!', type: 'macro', apply: 'vec![1, 2, 3]' },
  { label: 'String::new', type: 'function', apply: 'String::new()' },
  { label: 'format!', type: 'macro', apply: 'format!("Value: {}", 42)' },
  {
    label: 'read_line',
    type: 'function',
    apply: 'io::stdin().read_line(&mut String::new())',
  },
];

const HTML_TAGS: Completion[] = [
  { label: 'div', type: 'tag', apply: '<div>\n  Content\n</div>' },
  { label: 'p', type: 'tag', apply: '<p>Paragraph text</p>' },
  { label: 'h1', type: 'tag', apply: '<h1>Main Title</h1>' },
  { label: 'h2', type: 'tag', apply: '<h2>Subtitle</h2>' },
  { label: 'h3', type: 'tag', apply: '<h3>Section</h3>' },
  { label: 'h4', type: 'tag', apply: '<h4>Subsection</h4>' },
  { label: 'h5', type: 'tag', apply: '<h5>Detail</h5>' },
  { label: 'h6', type: 'tag', apply: '<h6>Small</h6>' },
  { label: 'span', type: 'tag', apply: '<span>Inline text</span>' },
  { label: 'a', type: 'tag', apply: '<a href="https://example.com">Link</a>' },
  {
    label: 'img',
    type: 'tag',
    apply: '<img src="image.jpg" alt="Description" />',
  },
  {
    label: 'ul',
    type: 'tag',
    apply: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>',
  },
  {
    label: 'ol',
    type: 'tag',
    apply: '<ol>\n  <li>Step 1</li>\n  <li>Step 2</li>\n</ol>',
  },
  { label: 'li', type: 'tag', apply: '<li>List item</li>' },
  {
    label: 'script',
    type: 'tag',
    apply: '<script>\n  console.log("JS");\n</script>',
  },
  {
    label: 'style',
    type: 'tag',
    apply: '<style>\n  body { color: blue; }\n</style>',
  },
  {
    label: 'link',
    type: 'tag',
    apply: '<link rel="stylesheet" href="styles.css" />',
  },
  {
    label: 'form',
    type: 'tag',
    apply:
      '<form>\n  <input type="text" name="name" />\n  <button>Submit</button>\n</form>',
  },
  {
    label: 'input',
    type: 'tag',
    apply: '<input type="text" name="username" />',
  },
  {
    label: 'button',
    type: 'tag',
    apply: '<button type="button">Click me</button>',
  },
  {
    label: 'textarea',
    type: 'tag',
    apply: '<textarea name="message">Default text</textarea>',
  },
  {
    label: 'select',
    type: 'tag',
    apply:
      '<select name="option">\n  <option value="1">One</option>\n  <option value="2">Two</option>\n</select>',
  },
  {
    label: 'table',
    type: 'tag',
    apply:
      '<table>\n  <tr>\n    <th>Header 1</th>\n    <th>Header 2</th>\n  </tr>\n  <tr>\n    <td>Data 1</td>\n    <td>Data 2</td>\n  </tr>\n</table>',
  },
  { label: 'tr', type: 'tag', apply: '<tr>\n  <td>Row data</td>\n</tr>' },
  { label: 'th', type: 'tag', apply: '<th>Table header</th>' },
  { label: 'td', type: 'tag', apply: '<td>Cell data</td>' },
  {
    label: 'header',
    type: 'tag',
    apply: '<header>\n  <h1>Site Header</h1>\n</header>',
  },
  {
    label: 'footer',
    type: 'tag',
    apply: '<footer>\n  <p>&copy; 2025</p>\n</footer>',
  },
  {
    label: 'nav',
    type: 'tag',
    apply: '<nav>\n  <ul>\n    <li><a href="/">Home</a></li>\n  </ul>\n</nav>',
  },
  {
    label: 'section',
    type: 'tag',
    apply: '<section>\n  <h2>Section</h2>\n  <p>Content</p>\n</section>',
  },
  {
    label: 'article',
    type: 'tag',
    apply: '<article>\n  <h2>Article</h2>\n  <p>Body</p>\n</article>',
  },
  { label: 'aside', type: 'tag', apply: '<aside>\n  <p>Sidebar</p>\n</aside>' },
  {
    label: 'main',
    type: 'tag',
    apply: '<main>\n  <p>Main content</p>\n</main>',
  },
  {
    label: 'figure',
    type: 'tag',
    apply:
      '<figure>\n  <img src="img.jpg" alt="Image" />\n  <figcaption>Caption</figcaption>\n</figure>',
  },
  {
    label: 'figcaption',
    type: 'tag',
    apply: '<figcaption>Figure caption</figcaption>',
  },
  {
    label: 'iframe',
    type: 'tag',
    apply:
      '<iframe src="https://example.com" width="600" height="400"></iframe>',
  },
  {
    label: 'video',
    type: 'tag',
    apply:
      '<video src="video.mp4" controls>\n  Your browser does not support video.\n</video>',
  },
  {
    label: 'audio',
    type: 'tag',
    apply:
      '<audio src="audio.mp3" controls>\n  Your browser does not support audio.\n</audio>',
  },
];

const CSS_PROPERTIES: Completion[] = [
  { label: 'color', type: 'property', apply: 'color: #333;' },
  { label: 'font-size', type: 'property', apply: 'font-size: 16px;' },
  { label: 'margin', type: 'property', apply: 'margin: 10px;' },
  { label: 'padding', type: 'property', apply: 'padding: 10px;' },
  {
    label: 'background-color',
    type: 'property',
    apply: 'background-color: #f0f0f0;',
  },
  { label: 'border', type: 'property', apply: 'border: 1px solid #ccc;' },
  { label: 'display', type: 'property', apply: 'display: flex;' },
  { label: 'position', type: 'property', apply: 'position: relative;' },
  { label: 'width', type: 'property', apply: 'width: 100%;' },
  { label: 'height', type: 'property', apply: 'height: 200px;' },
  { label: 'text-align', type: 'property', apply: 'text-align: center;' },
  { label: 'float', type: 'property', apply: 'float: left;' },
  { label: 'clear', type: 'property', apply: 'clear: both;' },
  { label: 'cursor', type: 'property', apply: 'cursor: pointer;' },
  { label: 'z-index', type: 'property', apply: 'z-index: 10;' },
  {
    label: 'font-family',
    type: 'property',
    apply: 'font-family: Arial, sans-serif;',
  },
  { label: 'font-weight', type: 'property', apply: 'font-weight: bold;' },
  { label: 'line-height', type: 'property', apply: 'line-height: 1.5;' },
  {
    label: 'text-decoration',
    type: 'property',
    apply: 'text-decoration: underline;',
  },
  {
    label: 'background-image',
    type: 'property',
    apply: 'background-image: url("bg.jpg");',
  },
  {
    label: 'background-size',
    type: 'property',
    apply: 'background-size: cover;',
  },
  { label: 'border-radius', type: 'property', apply: 'border-radius: 5px;' },
  {
    label: 'box-shadow',
    type: 'property',
    apply: 'box-shadow: 0 2px 5px rgba(0,0,0,0.1);',
  },
  { label: 'flex-direction', type: 'property', apply: 'flex-direction: row;' },
  {
    label: 'justify-content',
    type: 'property',
    apply: 'justify-content: center;',
  },
  { label: 'align-items', type: 'property', apply: 'align-items: center;' },
  { label: 'flex-wrap', type: 'property', apply: 'flex-wrap: wrap;' },
  {
    label: 'grid-template-columns',
    type: 'property',
    apply: 'grid-template-columns: 1fr 1fr;',
  },
  {
    label: 'grid-template-rows',
    type: 'property',
    apply: 'grid-template-rows: auto 1fr;',
  },
  { label: 'gap', type: 'property', apply: 'gap: 10px;' },
  {
    label: 'transition',
    type: 'property',
    apply: 'transition: all 0.3s ease;',
  },
  { label: 'animation', type: 'property', apply: 'animation: fadeIn 1s;' },
  { label: 'transform', type: 'property', apply: 'transform: rotate(45deg);' },
  { label: 'opacity', type: 'property', apply: 'opacity: 0.5;' },
  { label: 'visibility', type: 'property', apply: 'visibility: hidden;' },
  { label: 'overflow', type: 'property', apply: 'overflow: auto;' },
  { label: 'white-space', type: 'property', apply: 'white-space: nowrap;' },
  { label: 'word-break', type: 'property', apply: 'word-break: break-word;' },
  { label: 'list-style', type: 'property', apply: 'list-style: none;' },
  { label: 'content', type: 'property', apply: 'content: "•";' },
];

const JSON_SNIPPETS: Completion[] = [
  {
    label: 'object',
    type: 'structure',
    apply: '{\n  "name": "John Doe",\n  "age": 30\n}',
  },
  { label: 'array', type: 'structure', apply: '[\n  "item1",\n  "item2"\n]' },
  { label: 'pair', type: 'structure', apply: '"key": "value"' },
];

const MARKDOWN_ELEMENTS: Completion[] = [
  { label: 'h1', type: 'heading', apply: '# Main Title\n' },
  { label: 'h2', type: 'heading', apply: '## Subtitle\n' },
  { label: 'h3', type: 'heading', apply: '### Section\n' },
  { label: 'bold', type: 'formatting', apply: '**bold text**' },
  { label: 'italic', type: 'formatting', apply: '*italic text*' },
  { label: 'code', type: 'formatting', apply: '`code` ' },
  { label: 'codeblock', type: 'formatting', apply: '```\ncode block\n```' },
  {
    label: 'link',
    type: 'formatting',
    apply: '[Link text](https://example.com)',
  },
  { label: 'image', type: 'formatting', apply: '![Alt text](image.jpg)' },
  { label: 'list', type: 'list', apply: '- List item\n' },
  { label: 'ordered list', type: 'list', apply: '1. Ordered item\n' },
  {
    label: 'table',
    type: 'structure',
    apply: '| Header 1 | Header 2 |\n| --- | --- |\n| Data 1 | Data 2 |',
  },
];

const SQL_KEYWORDS: Completion[] = [
  { label: 'SELECT', type: 'keyword', apply: 'SELECT * FROM users;' },
  {
    label: 'INSERT INTO',
    type: 'keyword',
    apply:
      'INSERT INTO users (name, email) VALUES ("John", "john@example.com");',
  },
  {
    label: 'UPDATE',
    type: 'keyword',
    apply: 'UPDATE users SET name = "Jane" WHERE id = 1;',
  },
  {
    label: 'DELETE FROM',
    type: 'keyword',
    apply: 'DELETE FROM users WHERE id = 1;',
  },
  {
    label: 'CREATE TABLE',
    type: 'keyword',
    apply:
      'CREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);',
  },
  { label: 'WHERE', type: 'keyword', apply: 'WHERE id = 1;' },
  {
    label: 'JOIN',
    type: 'keyword',
    apply: 'JOIN orders ON users.id = orders.user_id;',
  },
  { label: 'GROUP BY', type: 'keyword', apply: 'GROUP BY users.id;' },
  { label: 'ORDER BY', type: 'keyword', apply: 'ORDER BY name ASC;' },
  { label: 'HAVING', type: 'keyword', apply: 'HAVING COUNT(*) > 1;' },
];

const XML_TAGS: Completion[] = [
  {
    label: 'element',
    type: 'tag',
    apply: '<root>\n  <child>Content</child>\n</root>',
  },
  { label: 'attribute', type: 'attribute', apply: ' id="123"' },
  { label: 'comment', type: 'comment', apply: '<!-- Comment -->' },
  { label: 'cdata', type: 'structure', apply: '<![CDATA[Raw data]]>' },
];

const PHP_KEYWORDS: Completion[] = [
  {
    label: '<?php',
    type: 'keyword',
    apply: '<?php\n  echo "Hello World";\n?>',
  },
  {
    label: 'if',
    type: 'keyword',
    apply: 'if ($condition) {\n  echo "True";\n}',
  },
  { label: 'else', type: 'keyword', apply: 'else {\n  echo "False";\n}' },
  {
    label: 'for',
    type: 'keyword',
    apply: 'for ($i = 0; $i < 5; $i++) {\n  echo $i;\n}',
  },
  {
    label: 'while',
    type: 'keyword',
    apply: 'while ($condition) {\n  echo "Looping";\n}',
  },
  {
    label: 'function',
    type: 'keyword',
    apply: 'function add($a, $b) {\n  return $a + $b;\n}',
  },
  {
    label: 'class',
    type: 'keyword',
    apply:
      'class MyClass {\n  public function __construct($name) {\n    $this->name = $name;\n  }\n}',
  },
];

const PHP_UTILS: Completion[] = [
  { label: 'echo', type: 'function', apply: 'echo "Hello World";' },
  { label: 'print_r', type: 'function', apply: 'print_r($array);' },
  { label: 'var_dump', type: 'function', apply: 'var_dump($variable);' },
  { label: 'include', type: 'function', apply: 'include "file.php";' },
  { label: 'require', type: 'function', apply: 'require "file.php";' },
  {
    label: 'json_encode',
    type: 'function',
    apply: 'json_encode(["key" => "value"])',
  },
  {
    label: 'json_decode',
    type: 'function',
    apply: 'json_decode(\'{ "key": "value" }\')',
  },
  { label: 'strlen', type: 'function', apply: 'strlen("text")' },
  { label: 'explode', type: 'function', apply: 'explode(",", "a,b,c")' },
];

const LANGUAGE_MAP: Record<LanguageKey, Completion[]> = {
  javascript: [...JS_UTILS, ...DOM_UTILS],
  typescript: [...JS_UTILS, ...DOM_UTILS, ...REACT_UTILS, ...TS_UTILS],
  python: [...PYTHON_KEYWORDS, ...PYTHON_BUILTINS],
  java: [...JAVA_KEYWORDS, ...JAVA_UTILS],
  cpp: [...CPP_KEYWORDS, ...CPP_UTILS],
  go: [...GO_KEYWORDS, ...GO_UTILS],
  rust: [...RUST_KEYWORDS, ...RUST_UTILS],
  html: [...HTML_TAGS],
  css: [...CSS_PROPERTIES],
  json: [...JSON_SNIPPETS],
  markdown: [...MARKDOWN_ELEMENTS],
  sql: [...SQL_KEYWORDS],
  xml: [...XML_TAGS],
  php: [...PHP_KEYWORDS, ...PHP_UTILS],
};

function completionSource(completions: Completion[]) {
  return (ctx: CompletionContext) => {
    const word = ctx.matchBefore(/\w*/);
    if (!word || (word.from === word.to && !ctx.explicit)) return null;
    return {
      from: word.from,
      options: completions,
    };
  };
}

export function smartAutocomplete(language: LanguageKey) {
  return autocompletion({
    override: [completionSource(LANGUAGE_MAP[language] ?? [])],
    activateOnTyping: true,
  });
}

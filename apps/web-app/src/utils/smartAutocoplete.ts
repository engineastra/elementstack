import { Completion } from '@codemirror/autocomplete';

export enum LanguageKey {
  JavaScript = 'javascript',
  TypeScript = 'typescript',
  Python = 'python',
  Java = 'java',
  Cpp = 'cpp',
  Go = 'go',
  Rust = 'rust',
  Html = 'html',
  Css = 'css',
  Json = 'json',
  Markdown = 'markdown',
  Sql = 'sql',
  Xml = 'xml',
  Php = 'php',
}

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

export const LANGUAGE_COMPLETION_MAP: Partial<
  Record<LanguageKey, Completion[]>
> = {
  [LanguageKey.Java]: [...JAVA_KEYWORDS, ...JAVA_UTILS],
  [LanguageKey.Cpp]: [...CPP_KEYWORDS, ...CPP_UTILS],
  [LanguageKey.Go]: [...GO_KEYWORDS, ...GO_UTILS],
  [LanguageKey.Rust]: [...RUST_KEYWORDS, ...RUST_UTILS],
  [LanguageKey.Html]: [...HTML_TAGS],
  [LanguageKey.Css]: [...CSS_PROPERTIES],
  [LanguageKey.Json]: [...JSON_SNIPPETS],
  [LanguageKey.Markdown]: [...MARKDOWN_ELEMENTS],
  [LanguageKey.Sql]: [...SQL_KEYWORDS],
  [LanguageKey.Xml]: [...XML_TAGS],
  [LanguageKey.Php]: [...PHP_KEYWORDS, ...PHP_UTILS],
};

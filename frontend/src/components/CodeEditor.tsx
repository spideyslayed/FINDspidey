type CodeEditorProps = {
  code: string;
  language: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
};

export default function CodeEditor({
  code,
  language,
  onCodeChange,
  onLanguageChange,
}: CodeEditorProps) {
  return (
    <section className="editor-card">
      <div className="editor-header">
        <div>
          <h2>Code Scanner</h2>

          <p>
            Paste your code and let Spidey inspect it.
          </p>
        </div>

        <select
          value={language}
          onChange={(event) =>
            onLanguageChange(event.target.value)
          }
          className="language-select"
        >
          <option value="javascript">
            JavaScript
          </option>

          <option value="typescript">
            TypeScript
          </option>

          <option value="python">
            Python
          </option>

          <option value="java">Java</option>

          <option value="c">C</option>

          <option value="cpp">C++</option>

          <option value="csharp">C#</option>

          <option value="go">Go</option>

          <option value="rust">Rust</option>

          <option value="php">PHP</option>

          <option value="ruby">Ruby</option>

          <option value="kotlin">Kotlin</option>

          <option value="swift">Swift</option>

          <option value="sql">SQL</option>

          <option value="bash">Bash</option>

          <option value="html">HTML</option>

          <option value="css">CSS</option>
        </select>
      </div>

      <div className="editor-wrapper">
        <div className="editor-toolbar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />

          <span className="editor-language">
            {language}
          </span>
        </div>

        <textarea
          value={code}
          onChange={(event) =>
            onCodeChange(event.target.value)
          }
          placeholder={`// Paste your code here...

function add(a, b) {
  return a - b;
}`}
          spellCheck={false}
          className="code-input"
        />
      </div>
    </section>
  );
}
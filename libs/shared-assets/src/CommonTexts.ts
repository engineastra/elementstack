export default {
  APP_NAME: 'ElementStack',
  TAG_LINE: 'The Front-end Codex',
  SUB_TAG:
    'The definitive, interactive library of algorithms, system design patterns, and production-grade projects.',
  HOME_EDITOR_DEFAULT_VALUE: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function App() {
  const [name, setName] = useLocalStorage("name", "");
  return <input value={name} onChange={e => setName(e.target.value)} />;
}`,
  LOGIN: 'Login',
  NEW_FOLDER: 'New Folder',
  NEW_PROJECT: 'New Project',
  DELETE_PROJECT: 'Delete',
};

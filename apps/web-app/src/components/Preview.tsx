import { Folder } from '@elementstack/shared-assets/Types';
import { useEsbuildSandbox } from '../hooks/useEsbuildSandbox';

export function SandboxPreview({ folder }: { folder: Folder }) {
  const { iframeRef, error } = useEsbuildSandbox(folder);

  return (
    <div className="h-full w-full">
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #ddd',
        }}
      />
    </div>
  );
}

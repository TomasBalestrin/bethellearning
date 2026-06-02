import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, CheckCircle2, XCircle } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  expectedOutput?: string;
  testCases?: Array<{ input: string; expected: string }>;
}

export function CodeEditor({
  initialCode = '// Escreva seu código aqui\n',
  language = 'javascript',
  expectedOutput,
  testCases = []
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);

    try {
      // Capturar console.log
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        logs.push(args.map(arg => String(arg)).join(' '));
      };

      // Executar código
      // eslint-disable-next-line no-eval
      eval(code);

      // Restaurar console.log
      console.log = originalLog;

      const result = logs.join('\n');
      setOutput(result || 'Código executado com sucesso!');

      // Validar output esperado
      if (expectedOutput && result === expectedOutput) {
        setTestResults([{ passed: true, message: 'Output correto!' }]);
      } else if (expectedOutput) {
        setTestResults([{
          passed: false,
          message: `Esperado: "${expectedOutput}", Recebido: "${result}"`
        }]);
      }

      // Executar test cases
      if (testCases.length > 0) {
        const results = testCases.map((test, index) => {
          try {
            // Executar teste
            const testLogs: string[] = [];
            console.log = (...args: any[]) => {
              testLogs.push(args.map(arg => String(arg)).join(' '));
            };

            // eslint-disable-next-line no-eval
            eval(test.input);

            console.log = originalLog;

            const testResult = testLogs.join('\n');
            const passed = testResult === test.expected;

            return {
              passed,
              message: passed
                ? `Teste ${index + 1}: ✓ Passou`
                : `Teste ${index + 1}: ✗ Esperado "${test.expected}", Recebido "${testResult}"`
            };
          } catch (err: any) {
            return {
              passed: false,
              message: `Teste ${index + 1}: ✗ Erro: ${err.message}`
            };
          }
        });

        setTestResults(results);
      }
    } catch (err: any) {
      setOutput(`Erro: ${err.message}`);
      setTestResults([{ passed: false, message: `Erro de execução: ${err.message}` }]);
    } finally {
      setIsRunning(false);
    }
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Editor de Código</CardTitle>
            <Button onClick={runCode} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Executando...' : 'Executar'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Editor
              height="300px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{output}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {allTestsPassed ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-green-500">Todos os testes passaram!</CardTitle>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-red-500">Alguns testes falharam</CardTitle>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 p-3 rounded-lg ${
                    result.passed ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'
                  }`}
                >
                  {result.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  )}
                  <span className={result.passed ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                    {result.message}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

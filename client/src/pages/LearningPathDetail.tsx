import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Circle,
  Lock,
  Play,
  FileText,
  Code2,
  Video
} from "lucide-react";

export default function LearningPathDetail() {
  const [, params] = useRoute("/trilha/:id");
  const [, setLocation] = useLocation();
  
  // Mock data - Em produção, buscar do backend via tRPC
  const pathData = {
    iniciante: {
      id: "iniciante",
      title: "Trilha Iniciante",
      description: "Fundamentos de programação e ferramentas essenciais para começar sua jornada no desenvolvimento de software",
      progress: 65,
      modules: [
        {
          id: 1,
          title: "Introdução à Programação",
          description: "Conceitos fundamentais de lógica e algoritmos",
          steps: [
            { id: 1, title: "O que é programação?", type: "article", duration: "10 min", completed: true },
            { id: 2, title: "Variáveis e Tipos de Dados", type: "article", duration: "15 min", completed: true },
            { id: 3, title: "Exercício: Primeiro Programa", type: "exercise", duration: "20 min", completed: true }
          ]
        },
        {
          id: 2,
          title: "Git e Controle de Versão",
          description: "Aprenda a gerenciar código com Git e GitHub",
          steps: [
            { id: 4, title: "Introdução ao Git", type: "video", duration: "12 min", completed: true },
            { id: 5, title: "Comandos Básicos", type: "article", duration: "18 min", completed: true },
            { id: 6, title: "Trabalhando com Branches", type: "article", duration: "20 min", completed: false },
            { id: 7, title: "Exercício: Git Workflow", type: "exercise", duration: "30 min", completed: false }
          ]
        },
        {
          id: 3,
          title: "Terminal e Linha de Comando",
          description: "Domine o terminal para aumentar sua produtividade",
          steps: [
            { id: 8, title: "Navegação no Terminal", type: "article", duration: "15 min", completed: false },
            { id: 9, title: "Comandos Essenciais", type: "article", duration: "20 min", completed: false },
            { id: 10, title: "Scripts Bash", type: "article", duration: "25 min", completed: false }
          ]
        }
      ]
    },
    intermediario: {
      id: "intermediario",
      title: "Trilha Intermediária",
      description: "Desenvolvimento web moderno e bancos de dados relacionais e NoSQL",
      progress: 40,
      modules: [
        {
          id: 1,
          title: "JavaScript Moderno",
          description: "ES6+, async/await e conceitos avançados",
          steps: [
            { id: 1, title: "Arrow Functions e Destructuring", type: "article", duration: "20 min", completed: true },
            { id: 2, title: "Promises e Async/Await", type: "article", duration: "25 min", completed: true },
            { id: 3, title: "Exercício: API Fetch", type: "exercise", duration: "30 min", completed: false }
          ]
        },
        {
          id: 2,
          title: "React Fundamentals",
          description: "Construa interfaces modernas com React",
          steps: [
            { id: 4, title: "Componentes e Props", type: "video", duration: "18 min", completed: false },
            { id: 5, title: "Hooks: useState e useEffect", type: "article", duration: "22 min", completed: false },
            { id: 6, title: "Projeto: Todo App", type: "exercise", duration: "45 min", completed: false }
          ]
        }
      ]
    },
    avancado: {
      id: "avancado",
      title: "Trilha Avançada",
      description: "Arquitetura de software, DevOps e práticas avançadas de desenvolvimento",
      progress: 15,
      modules: [
        {
          id: 1,
          title: "Arquitetura de Microserviços",
          description: "Design patterns e best practices",
          steps: [
            { id: 1, title: "Introdução a Microserviços", type: "article", duration: "25 min", completed: true },
            { id: 2, title: "API Gateway Pattern", type: "article", duration: "30 min", completed: false },
            { id: 3, title: "Service Discovery", type: "article", duration: "28 min", completed: false }
          ]
        }
      ]
    }
  };

  const pathId = params?.id || "iniciante";
  const path = pathData[pathId as keyof typeof pathData];

  if (!path) {
    return <div>Trilha não encontrada</div>;
  }

  const totalSteps = path.modules.reduce((acc, module) => acc + module.steps.length, 0);
  const completedSteps = path.modules.reduce(
    (acc, module) => acc + module.steps.filter(s => s.completed).length, 
    0
  );

  const getStepIcon = (type: string) => {
    switch (type) {
      case "article": return <FileText className="w-5 h-5" />;
      case "video": return <Video className="w-5 h-5" />;
      case "exercise": return <Code2 className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "article": return "Artigo";
      case "video": return "Vídeo";
      case "exercise": return "Exercício";
      default: return "Conteúdo";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            className="gap-2 mb-4"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{path.title}</h1>
              <p className="text-gray-600 max-w-2xl">{path.description}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-blue-600">{path.progress}%</p>
              <p className="text-sm text-gray-600">Concluído</p>
            </div>
          </div>

          <div className="mt-6">
            <Progress value={path.progress} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              {completedSteps} de {totalSteps} etapas concluídas
            </p>
          </div>
        </div>
      </header>

      {/* Modules */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {path.modules.map((module, moduleIndex) => {
            const moduleCompleted = module.steps.every(s => s.completed);
            const moduleProgress = (module.steps.filter(s => s.completed).length / module.steps.length) * 100;

            return (
              <Card key={module.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          moduleCompleted ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {moduleCompleted ? <CheckCircle2 className="w-6 h-6" /> : moduleIndex + 1}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{module.title}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                    <Badge variant={moduleCompleted ? "default" : "secondary"} className="ml-4">
                      {Math.round(moduleProgress)}% completo
                    </Badge>
                  </div>
                  <Progress value={moduleProgress} className="mt-4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {module.steps.map((step, stepIndex) => {
                      const isLocked = stepIndex > 0 && !module.steps[stepIndex - 1].completed;
                      
                      return (
                        <div
                          key={step.id}
                          className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                            step.completed 
                              ? 'bg-green-50 border-green-200' 
                              : isLocked
                              ? 'bg-gray-50 border-gray-200 opacity-60'
                              : 'bg-white border-gray-200 hover:border-blue-300 cursor-pointer'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-500 text-white' 
                              : isLocked
                              ? 'bg-gray-300 text-gray-500'
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {step.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : isLocked ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getStepIcon(step.type)}
                              <h4 className="font-semibold text-gray-900">{step.title}</h4>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <Badge variant="outline" className="text-xs">
                                {getTypeLabel(step.type)}
                              </Badge>
                              <span>{step.duration}</span>
                            </div>
                          </div>

                          {!step.completed && !isLocked && (
                            <Button size="sm" className="gap-2">
                              <Play className="w-4 h-4" />
                              Iniciar
                            </Button>
                          )}
                          
                          {step.completed && (
                            <Button size="sm" variant="outline">
                              Revisar
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

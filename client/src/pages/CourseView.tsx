import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle2, Circle, Play } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { CodeEditor } from "@/components/CodeEditor";

export default function CourseView() {
  const [, params] = useRoute("/courses/:id");
  const [, setLocation] = useLocation();
  const courseId = Number(params?.id);

  const { data: course } = trpc.courses.getById.useQuery({ id: courseId });
  const { data: modules = [] } = trpc.modules.listByCourse.useQuery({ courseId });
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1]));

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  if (!course) {
    return <div className="container py-8">Carregando...</div>;
  }

  const totalLessons = modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);
  const completedLessons = 0; // TODO: Implementar progresso real
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => setLocation("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progresso do Curso</span>
              <span className="font-medium">{completedLessons}/{totalLessons} aulas concluídas</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Lista de Módulos e Aulas */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold">Conteúdo do Curso</h2>
            {modules.map((module: any, idx: number) => (
              <ModuleLessonList
                key={module.id}
                module={module}
                isExpanded={expandedModules.has(module.id)}
                onToggle={() => toggleModule(module.id)}
                selectedLessonId={selectedLesson?.id}
                onSelectLesson={setSelectedLesson}
                moduleNumber={idx + 1}
              />
            ))}
          </div>

          {/* Main Content - Visualização da Aula */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <LessonContent lesson={selectedLesson} />
            ) : (
              <Card className="p-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Selecione uma aula para começar</h3>
                <p className="text-muted-foreground">
                  Escolha uma aula na lista ao lado para visualizar o conteúdo
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleLessonList({ module, isExpanded, onToggle, selectedLessonId, onSelectLesson, moduleNumber }: any) {
  const { data: lessons = [] } = trpc.lessons.listByModule.useQuery({ moduleId: module.id });

  return (
    <Card>
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-accent transition-colors"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-muted-foreground">Módulo {moduleNumber}</span>
            </div>
            <h3 className="font-semibold">{module.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{lessons.length} aulas</p>
          </div>
          <div className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </div>
        </div>
      </button>
      {isExpanded && (
        <CardContent className="pt-0 pb-2">
          <div className="space-y-1">
            {lessons.map((lesson: any, idx: number) => (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  selectedLessonId === lesson.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Circle className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lesson.title}</p>
                    <p className="text-sm opacity-80">{lesson.duration} min</p>
                  </div>
                  {lesson.videoUrl && <Play className="h-4 w-4 flex-shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function LessonContent({ lesson, onComplete }: any) {
  const completeLesson = trpc.progress.completeLesson.useMutation({
    onSuccess: (data) => {
      if (data.newBadges && data.newBadges.length > 0) {
        alert(`🎉 Parabéns! Você desbloqueou: ${data.newBadges.map((b: any) => b.name).join(', ')}`);
      }
      onComplete?.();
    },
  });

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
        <p className="text-sm text-muted-foreground">{lesson.duration} minutos</p>
      </div>

      {lesson.videoUrl && (
        <div className="mb-6 aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Play className="h-16 w-16 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Vídeo: {lesson.videoUrl}</p>
          </div>
        </div>
      )}

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <ReactMarkdown>{lesson.content}</ReactMarkdown>
      </div>

      {/* Editor de Código Interativo */}
      {lesson.exerciseData && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">🎯 {lesson.exerciseData.title}</h3>
          <p className="text-muted-foreground mb-4">{lesson.exerciseData.description}</p>
          <CodeEditor
            initialCode={lesson.exerciseData.initialCode || "// Seu código aqui\n"}
            language="javascript"
            testCases={lesson.exerciseData.testCases || []}
          />
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Button 
          className="flex-1"
          onClick={() => completeLesson.mutate({ lessonId: lesson.id })}
          disabled={completeLesson.isPending}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          {completeLesson.isPending ? 'Salvando...' : 'Marcar como Concluída'}
        </Button>
        <Button variant="outline" className="flex-1">
          Próxima Aula
        </Button>
      </div>
    </Card>
  );
}

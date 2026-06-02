import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Plus, Pencil, Trash2, BookOpen, Video } from "lucide-react";

export default function ManageCourseContent() {
  const [, params] = useRoute("/admin/courses/:id");
  const [, setLocation] = useLocation();
  // toast já importado do sonner
  const courseId = Number(params?.id);

  const { data: course } = trpc.courses.getById.useQuery({ id: courseId });
  const { data: modules = [] } = trpc.modules.listByCourse.useQuery({ courseId });
  
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

  const createModule = trpc.modules.create.useMutation({
    onSuccess: () => {
      toast.success("Módulo criado com sucesso!");
      setModuleDialogOpen(false);
      setEditingModule(null);
    },
  });

  const updateModule = trpc.modules.update.useMutation({
    onSuccess: () => {
      toast.success("Módulo atualizado com sucesso!");
      setModuleDialogOpen(false);
      setEditingModule(null);
    },
  });

  const deleteModule = trpc.modules.delete.useMutation({
    onSuccess: () => {
      toast.success("Módulo excluído com sucesso!");
    },
  });

  const createLesson = trpc.lessons.create.useMutation({
    onSuccess: () => {
      toast.success("Aula criada com sucesso!");
      setLessonDialogOpen(false);
      setEditingLesson(null);
    },
  });

  const updateLesson = trpc.lessons.update.useMutation({
    onSuccess: () => {
      toast.success("Aula atualizada com sucesso!");
      setLessonDialogOpen(false);
      setEditingLesson(null);
    },
  });

  const deleteLesson = trpc.lessons.delete.useMutation({
    onSuccess: () => {
      toast.success("Aula excluída com sucesso!");
    },
  });

  const handleModuleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      courseId,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      order: Number(formData.get("order")),
    };

    if (editingModule) {
      updateModule.mutate({ id: editingModule.id, ...data });
    } else {
      createModule.mutate(data);
    }
  };

  const handleLessonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      moduleId: selectedModuleId!,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      videoUrl: (formData.get("videoUrl") as string) || undefined,
      duration: Number(formData.get("duration")),
      order: Number(formData.get("order")),
    };

    if (editingLesson) {
      updateLesson.mutate({ id: editingLesson.id, ...data });
    } else {
      createLesson.mutate(data);
    }
  };

  if (!course) {
    return <div className="container py-8">Carregando...</div>;
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => setLocation("/admin/courses")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
      </div>

      <div className="mb-6">
        <Button onClick={() => { setEditingModule(null); setModuleDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Módulo
        </Button>
      </div>

      <div className="space-y-6">
        {modules.map((module: any) => (
          <ModuleCard
            key={module.id}
            module={module}
            onEdit={() => { setEditingModule(module); setModuleDialogOpen(true); }}
            onDelete={() => deleteModule.mutate({ id: module.id })}
            onAddLesson={() => { setSelectedModuleId(module.id); setEditingLesson(null); setLessonDialogOpen(true); }}
            onEditLesson={(lesson: any) => { setSelectedModuleId(module.id); setEditingLesson(lesson); setLessonDialogOpen(true); }}
            onDeleteLesson={(lessonId: number) => deleteLesson.mutate({ id: lessonId })}
          />
        ))}
      </div>

      {/* Module Dialog */}
      <Dialog open={moduleDialogOpen} onOpenChange={setModuleDialogOpen}>
        <DialogContent>
          <form onSubmit={handleModuleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingModule ? "Editar Módulo" : "Novo Módulo"}</DialogTitle>
              <DialogDescription>Preencha as informações do módulo</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" name="title" defaultValue={editingModule?.title} required />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" name="description" defaultValue={editingModule?.description} />
              </div>
              <div>
                <Label htmlFor="order">Ordem</Label>
                <Input id="order" name="order" type="number" defaultValue={editingModule?.order || 1} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingModule ? "Salvar" : "Criar"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Lesson Dialog */}
      <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={handleLessonSubmit}>
            <DialogHeader>
              <DialogTitle>{editingLesson ? "Editar Aula" : "Nova Aula"}</DialogTitle>
              <DialogDescription>Preencha as informações da aula</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" name="title" defaultValue={editingLesson?.title} required />
              </div>
              <div>
                <Label htmlFor="content">Conteúdo (Markdown)</Label>
                <Textarea id="content" name="content" rows={8} defaultValue={editingLesson?.content} />
              </div>
              <div>
                <Label htmlFor="videoUrl">URL do Vídeo (opcional)</Label>
                <Input id="videoUrl" name="videoUrl" defaultValue={editingLesson?.videoUrl || ""} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duração (minutos)</Label>
                  <Input id="duration" name="duration" type="number" defaultValue={editingLesson?.duration || 30} required />
                </div>
                <div>
                  <Label htmlFor="order">Ordem</Label>
                  <Input id="order" name="order" type="number" defaultValue={editingLesson?.order || 1} required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingLesson ? "Salvar" : "Criar"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ModuleCard({ module, onEdit, onDelete, onAddLesson, onEditLesson, onDeleteLesson }: any) {
  const { data: lessons = [] } = trpc.lessons.listByModule.useQuery({ moduleId: module.id });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {module.title}
            </CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button variant="outline" size="sm" onClick={onAddLesson}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Aula
          </Button>
        </div>
        <div className="space-y-2">
          {lessons.map((lesson: any) => (
            <div key={lesson.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Video className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground">{lesson.duration} min</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEditLesson(lesson)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDeleteLesson(lesson.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {lessons.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">Nenhuma aula criada ainda</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

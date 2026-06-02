import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast as showToast } from "sonner";
import { LogOut, Edit2, Save, X, User, Mail, Shield } from "lucide-react";

export function UserProfile() {
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.auth.me.useQuery();
  const { data: stats } = trpc.progress.getUserStats.useQuery();
  const { data: userBadges = [] } = trpc.badges.getUserBadges.useQuery();
  
  // Redirecionar para login se não houver usuário autenticado
  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/login";
    }
  }, [isLoading, user]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      showToast.success("Logout realizado", {
        description: "Você foi desconectado com sucesso.",
      });
      // Aguardar um pouco antes de redirecionar para garantir que o cookie foi limpo
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    },
    onError: (error) => {
      showToast.error("Erro ao fazer logout", {
        description: error.message,
      });
    },
  });

  const updateProfileMutation = trpc.auth.updateProfile.useMutation({
    onSuccess: () => {
      showToast.success("Perfil atualizado", {
        description: "Suas informações foram atualizadas com sucesso.",
      });
      setIsEditing(false);
      utils.auth.me.invalidate();
    },
    onError: (error) => {
      showToast.error("Erro ao atualizar perfil", {
        description: error.message,
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleSave = () => {
    updateProfileMutation.mutate({
      name: formData.name,
      email: formData.email,
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const initials = (user.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Meu Perfil
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas informações pessoais e configurações
        </p>
      </div>

      <div className="grid gap-6">
        {/* Card Principal do Perfil */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </CardDescription>
                  <div className="mt-2">
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                      className={
                        user.role === "admin"
                          ? "bg-purple-500 hover:bg-purple-600"
                          : ""
                      }
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {user.role === "admin" ? "Administrador" : "Usuário"}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={updateProfileMutation.isPending}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={updateProfileMutation.isPending}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          {isEditing && (
            <>
              <Separator />
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      <User className="h-4 w-4 inline mr-2" />
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {/* Card de Estatísticas */}
        <Card>
          <CardHeader>
            <CardTitle>Suas Estatísticas</CardTitle>
            <CardDescription>
              Acompanhe seu progresso na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-muted-foreground">Nível Atual</p>
                <p className="text-2xl font-bold text-blue-600">{stats ? Math.floor(stats.totalXp / 250) + 1 : 1}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.totalXp || 0}/{stats ? (Math.floor(stats.totalXp / 250) + 1) * 250 : 250} XP
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <p className="text-sm text-muted-foreground">
                  Aulas Concluídas
                </p>
                <p className="text-2xl font-bold text-green-600">{stats?.lessonsCompleted || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  de 27 total
                </p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-muted-foreground">Streak Atual</p>
                <p className="text-2xl font-bold text-orange-600">🔥 {stats?.currentStreak || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recorde: {stats?.longestStreak || 0} dias
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-muted-foreground">Conquistas</p>
                <p className="text-2xl font-bold text-purple-600">{userBadges.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  badges desbloqueados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de Informações da Conta */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>
              Detalhes sobre sua conta na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">ID do Usuário</span>
                <span className="text-sm font-mono">{user.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">
                  Tipo de Conta
                </span>
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                >
                  {user.role === "admin" ? "Administrador" : "Usuário"}
                </Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">
                  Membro desde
                </span>
                <span className="text-sm">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

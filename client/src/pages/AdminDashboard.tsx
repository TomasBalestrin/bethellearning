import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Users,
  TrendingUp,
  Award,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  // Mock data - Em produção, buscar do backend
  const teamStats = {
    totalUsers: 30,
    activeUsers: 28,
    avgProgress: 52,
    totalExercises: 150,
    completedExercises: 1456,
    avgLevel: 8.5
  };

  const userProgress = [
    { id: 1, name: "João Silva", avatar: "👨‍💻", level: 12, progress: 85, exercises: 87, lastActive: "Hoje" },
    { id: 2, name: "Maria Santos", avatar: "👩‍💻", level: 11, progress: 78, exercises: 82, lastActive: "Hoje" },
    { id: 3, name: "Pedro Costa", avatar: "👨‍🔧", level: 11, progress: 75, exercises: 79, lastActive: "Ontem" },
    { id: 4, name: "Ana Oliveira", avatar: "👩‍🎓", level: 10, progress: 68, exercises: 71, lastActive: "Hoje" },
    { id: 5, name: "Carlos Mendes", avatar: "👨‍🚀", level: 9, progress: 62, exercises: 65, lastActive: "2 dias atrás" },
    { id: 6, name: "Julia Ferreira", avatar: "👩‍🔬", level: 9, progress: 58, exercises: 61, lastActive: "Hoje" },
    { id: 7, name: "Rafael Lima", avatar: "👨‍🎨", level: 8, progress: 54, exercises: 57, lastActive: "Hoje" },
    { id: 8, name: "Beatriz Alves", avatar: "👩‍💼", level: 8, progress: 51, exercises: 54, lastActive: "Ontem" },
    { id: 9, name: "Lucas Rocha", avatar: "👨‍🏫", level: 7, progress: 45, exercises: 48, lastActive: "3 dias atrás" },
    { id: 10, name: "Fernanda Dias", avatar: "👩‍⚕️", level: 7, progress: 42, exercises: 45, lastActive: "Hoje" }
  ];

  const pathStats = [
    { id: "iniciante", name: "Trilha Iniciante", enrolled: 30, avgProgress: 65, completed: 12 },
    { id: "intermediario", name: "Trilha Intermediária", enrolled: 25, avgProgress: 42, completed: 5 },
    { id: "avancado", name: "Trilha Avançada", enrolled: 18, avgProgress: 18, completed: 1 }
  ];

  const recentActivity = [
    { user: "João Silva", action: "Completou módulo 'Git Avançado'", time: "5 min atrás", type: "success" },
    { user: "Maria Santos", action: "Conquistou badge 'Docker Ninja'", time: "12 min atrás", type: "badge" },
    { user: "Pedro Costa", action: "Iniciou Trilha Avançada", time: "1 hora atrás", type: "info" },
    { user: "Ana Oliveira", action: "Completou 50 exercícios", time: "2 horas atrás", type: "success" },
    { user: "Carlos Mendes", action: "Inativo há 3 dias", time: "3 dias atrás", type: "warning" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h1>
              <p className="text-gray-600">Acompanhe o progresso e engajamento da equipe</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Usuários Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-gray-900">{teamStats.activeUsers}</p>
                  <p className="text-sm text-gray-600 mt-1">de {teamStats.totalUsers} total</p>
                </div>
                <Users className="w-12 h-12 text-blue-500" />
              </div>
              <Progress value={(teamStats.activeUsers / teamStats.totalUsers) * 100} className="mt-4" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Progresso Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{teamStats.avgProgress}%</p>
                  <p className="text-sm opacity-75 mt-1">da equipe</p>
                </div>
                <TrendingUp className="w-12 h-12 opacity-75" />
              </div>
              <Progress value={teamStats.avgProgress} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Nível Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{teamStats.avgLevel}</p>
                  <p className="text-sm opacity-75 mt-1">da equipe</p>
                </div>
                <Award className="w-12 h-12 opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="usuarios" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="usuarios" className="gap-2">
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="trilhas" className="gap-2">
              <Target className="w-4 h-4" />
              Trilhas
            </TabsTrigger>
            <TabsTrigger value="atividade" className="gap-2">
              <Clock className="w-4 h-4" />
              Atividade Recente
            </TabsTrigger>
          </TabsList>

          {/* Usuários Tab */}
          <TabsContent value="usuarios">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Progresso Individual</CardTitle>
                <CardDescription>Acompanhe o desempenho de cada membro da equipe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProgress.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="text-4xl">{user.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{user.name}</h4>
                          <Badge variant="secondary">Nível {user.level}</Badge>
                          <span className="text-xs text-gray-500">• {user.lastActive}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progresso</span>
                              <span className="font-semibold">{user.progress}%</span>
                            </div>
                            <Progress value={user.progress} className="h-2" />
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{user.exercises}</p>
                            <p className="text-xs text-gray-600">exercícios</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trilhas Tab */}
          <TabsContent value="trilhas">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pathStats.map((path) => (
                <Card key={path.id} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>{path.name}</CardTitle>
                    <CardDescription>{path.enrolled} usuários inscritos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progresso Médio</span>
                        <span className="font-semibold">{path.avgProgress}%</span>
                      </div>
                      <Progress value={path.avgProgress} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-3xl font-bold text-green-600">{path.completed}</p>
                        <p className="text-xs text-gray-600">Concluídos</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-blue-600">{path.enrolled - path.completed}</p>
                        <p className="text-xs text-gray-600">Em andamento</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Atividade Tab */}
          <TabsContent value="atividade">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Últimas ações e eventos da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'success' ? 'bg-green-100 text-green-600' :
                        activity.type === 'badge' ? 'bg-yellow-100 text-yellow-600' :
                        activity.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                        {activity.type === 'badge' && <Award className="w-5 h-5" />}
                        {activity.type === 'warning' && <AlertCircle className="w-5 h-5" />}
                        {activity.type === 'info' && <Target className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

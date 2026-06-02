import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  Trophy, 
  Target, 
  BookOpen, 
  Code, 
  Database,
  Award,
  TrendingUp,
  CheckCircle2,
  Star,
  Flame
} from "lucide-react";

export default function DemoHome() {
  const [, setLocation] = useLocation();
  const { data: user } = trpc.auth.me.useQuery();
  const { data: courses = [] } = trpc.courses.listWithStats.useQuery();
  const { data: stats } = trpc.progress.getUserStats.useQuery();
  const { data: userRank } = trpc.progress.getUserRank.useQuery();
  const { data: userBadges = [] } = trpc.badges.getUserBadges.useQuery();
  const { data: leaderboardData = [] } = trpc.leaderboard.getTop.useQuery({ limit: 5 });
  
  // Mapear cursos reais para o formato da interface
  const learningPaths = courses.map((course: any, idx: number) => {
    const colors = [
      "from-green-500 to-emerald-600",
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600"
    ];
    const icons = [BookOpen, Code, Database];
    
    return {
      id: course.id.toString(),
      title: course.title,
      description: course.description,
      progress: 0, // TODO: Calcular progresso real
      modules: course.moduleCount || 0,
      completedModules: 0,
      totalSteps: course.lessonCount || 0,
      completedSteps: 0,
      color: colors[idx % colors.length],
      icon: icons[idx % icons.length]
    };
  });
  
  // Usar cursos reais ou fallback vazio
  const displayPaths = learningPaths.length > 0 ? learningPaths : [];

  // Calcular estatísticas reais do usuário
  const currentLevel = stats ? Math.floor(stats.totalXp / 250) + 1 : 1;
  const xpForNextLevel = currentLevel * 250;
  const xpProgress = stats ? (stats.totalXp % 250) : 0;
  
  const userStats = {
    name: user?.name || "Usuário",
    level: currentLevel,
    points: stats?.totalXp || 0,
    nextLevelPoints: xpForNextLevel,
    completedExercises: stats?.lessonsCompleted || 0,
    totalExercises: 150, // TODO: calcular total de aulas disponíveis
    streak: stats?.currentStreak || 0,
    longestStreak: stats?.longestStreak || 0,
    rank: userRank || 0
  };

  // Leaderboard real
  const leaderboard = leaderboardData.map((entry: any, idx: number) => ({
    rank: idx + 1,
    name: entry.name,
    points: entry.total_xp || 0,
    level: Math.floor((entry.total_xp || 0) / 250) + 1,
    avatar: entry.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || "U"
  }));

  // Badges reais do usuário
  const badges = userBadges.map((badge: any) => ({
    id: badge.id,
    name: badge.name,
    description: badge.description,
    icon: "🏆",
    earned: true
  }));

  // Estatísticas antigas removidas - agora usamos userStats acima

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Learning Platform</h1>
                <p className="text-sm text-gray-600">Capacitação Técnica Corporativa</p>
              </div>
            </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLocation("/admin")}
                >
                  Dashboard Admin
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLocation("/users")}
                >
                  Gerenciar Usuários
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLocation("/admin/courses")}
                >
                  Gerenciar Cursos
                </Button>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userStats.name}</p>
                  <p className="text-xs text-gray-600">Nível {userStats.level} • {userStats.points} XP</p>
                </div>
                <button
                  onClick={() => setLocation("/profile")}
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl hover:scale-105 transition-transform cursor-pointer"
                >
                  👨‍💻
                </button>
              </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Nível Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{userStats.level}</p>
                  <p className="text-sm opacity-75 mt-1">{userStats.points}/{userStats.nextLevelPoints} XP</p>
                </div>
                <Trophy className="w-12 h-12 opacity-75" />
              </div>
              <Progress value={(userStats.points / userStats.nextLevelPoints) * 100} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Exercícios Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-gray-900">{userStats.completedExercises}</p>
                  <p className="text-sm text-gray-600 mt-1">de {userStats.totalExercises} total</p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <Progress value={(userStats.completedExercises / userStats.totalExercises) * 100} className="mt-4" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Sequência Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{userStats.streak}</p>
                  <p className="text-sm opacity-75 mt-1">dias consecutivos</p>
                </div>
                <Flame className="w-12 h-12 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">#{userStats.rank}</p>
                  <p className="text-sm opacity-75 mt-1">na empresa</p>
                </div>
                <Star className="w-12 h-12 opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trilhas" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="trilhas" className="gap-2">
              <Target className="w-4 h-4" />
              Trilhas de Aprendizado
            </TabsTrigger>
            <TabsTrigger value="badges" className="gap-2">
              <Award className="w-4 h-4" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* Trilhas Tab */}
          <TabsContent value="trilhas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayPaths.map((path) => {
                const Icon = path.icon;
                return (
                  <Card key={path.id} className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                    <CardHeader>
                      <div className={`w-14 h-14 bg-gradient-to-br ${path.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-xl">{path.title}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progresso Geral</span>
                          <span className="font-semibold text-gray-900">{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-3" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{path.completedModules}/{path.modules}</p>
                          <p className="text-xs text-gray-600">Módulos</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{path.completedSteps}/{path.totalSteps}</p>
                          <p className="text-xs text-gray-600">Etapas</p>
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-4" 
                        variant="default"
                        onClick={() => setLocation(`/courses/${path.id}`)}
                      >
                        Continuar Aprendizado
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Suas Conquistas</CardTitle>
                <CardDescription>Badges conquistados durante sua jornada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <Card key={badge.id} className={`border-2 ${badge.earned ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 opacity-50'}`}>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-6xl mb-3">{badge.icon}</div>
                          <h3 className="font-bold text-lg mb-1">{badge.name}</h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                          {badge.earned && (
                            <Badge className="mt-3 bg-yellow-500">Conquistado!</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Ranking da Empresa</CardTitle>
                <CardDescription>Top performers da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className={`flex items-center gap-4 p-4 rounded-lg ${user.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400' : 'bg-gray-50'}`}>
                      <div className={`text-2xl font-bold ${user.rank === 1 ? 'text-yellow-600' : user.rank === 2 ? 'text-gray-400' : user.rank === 3 ? 'text-orange-600' : 'text-gray-600'} w-12 text-center`}>
                        #{user.rank}
                      </div>
                      <div className="text-4xl">{user.avatar}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">Nível {user.level}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{user.points}</p>
                        <p className="text-xs text-gray-600">pontos</p>
                      </div>
                      {user.rank === 1 && <Trophy className="w-8 h-8 text-yellow-500" />}
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

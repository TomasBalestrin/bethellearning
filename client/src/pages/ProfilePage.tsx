// Auth via tRPC
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Star, Target, Zap, BookOpen, Crown, Flame } from "lucide-react";
import { useLocation } from "wouter";

const badgeIcons: Record<string, any> = {
  "Primeira Aula": BookOpen,
  "Iniciante": Star,
  "Estudante Dedicado": Target,
  "Mestre": Crown,
  "100 XP": Zap,
  "500 XP": Trophy,
  "1000 XP": Award,
  "Sequência de 7 Dias": Flame,
};

const badgeColors: Record<string, string> = {
  "Primeira Aula": "bg-blue-500",
  "Iniciante": "bg-green-500",
  "Estudante Dedicado": "bg-purple-500",
  "Mestre": "bg-yellow-500",
  "100 XP": "bg-orange-500",
  "500 XP": "bg-red-500",
  "1000 XP": "bg-pink-500",
  "Sequência de 7 Dias": "bg-indigo-500",
};

export default function ProfilePage() {
  const { data: user } = trpc.auth.me.useQuery();
  const [, setLocation] = useLocation();
  const { data: stats } = trpc.progress.getUserStats.useQuery();
  const { data: allBadges } = trpc.badges.getAll.useQuery();
  const { data: userBadges } = trpc.badges.getUserBadges.useQuery();

  if (!user) {
    setLocation("/login");
    return null;
  }

  const userBadgeIds = new Set(userBadges?.map((b) => b.badgeId) || []);
  const currentLevel = stats ? Math.floor(stats.totalXp / 250) + 1 : 1;
  const xpForNextLevel = currentLevel * 250;
  const xpProgress = stats ? (stats.totalXp % 250) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setLocation("/")}>
            ← Voltar ao Dashboard
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Nível</p>
                  <p className="text-2xl font-bold text-blue-600">{currentLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">XP Total</p>
                  <p className="text-2xl font-bold text-purple-600">{stats?.totalXp || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aulas Concluídas</p>
                  <p className="text-2xl font-bold text-green-600">{stats?.lessonsCompleted || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Badges</p>
                  <p className="text-2xl font-bold text-yellow-600">{userBadges?.length || 0}/{allBadges?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progresso para o Nível {currentLevel + 1}</span>
              <span className="font-medium">{xpProgress}/{xpForNextLevel - (currentLevel - 1) * 250} XP</span>
            </div>
            <Progress value={(xpProgress / (xpForNextLevel - (currentLevel - 1) * 250)) * 100} className="h-3" />
          </div>
        </Card>

        {/* Badges Section */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Conquistas</h2>
          <p className="text-muted-foreground">Desbloqueie badges completando aulas e ganhando XP</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allBadges?.map((badge) => {
            const isUnlocked = userBadgeIds.has(badge.id);
            const Icon = badgeIcons[badge.name] || Award;
            const colorClass = badgeColors[badge.name] || "bg-gray-500";
            
            // Calculate progress
            let progress = 0;
            let progressText = "";
            
            if (badge.requirement.includes("aula")) {
              const required = parseInt(badge.requirement.match(/\d+/)?.[0] || "0");
              const current = stats?.lessonsCompleted || 0;
              progress = Math.min((current / required) * 100, 100);
              progressText = `${current}/${required} aulas`;
            } else if (badge.requirement.includes("XP")) {
              const required = parseInt(badge.requirement.match(/\d+/)?.[0] || "0");
              const current = stats?.totalXp || 0;
              progress = Math.min((current / required) * 100, 100);
              progressText = `${current}/${required} XP`;
            }

            return (
              <Card
                key={badge.id}
                className={`p-6 transition-all ${
                  isUnlocked
                    ? "border-2 border-yellow-500 shadow-lg"
                    : "opacity-60 grayscale"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-20 h-20 rounded-full ${
                      isUnlocked ? colorClass : "bg-gray-300"
                    } flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {badge.description}
                  </p>
                  
                  {!isUnlocked && (
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{progressText}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                  
                  {isUnlocked && (
                    <div className="flex items-center gap-1 text-yellow-600 font-medium">
                      <Trophy className="w-4 h-4" />
                      <span>Desbloqueado!</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

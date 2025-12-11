import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Settings,
  Clock,
  Bell,
  Target,
  User,
  Shield,
  Palette,
  Save,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StudyPreferences {
  studyDays: string[];
  studyStartTime: string;
  studyEndTime: string;
  dailyGoal: number; // minutes
  listIntensity: string;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  weeklyReports: boolean;
  theme: string;
  autoGenerateLists: boolean;
  preferredDifficulty: string;
  breakReminders: boolean;
}

const defaultPreferences: StudyPreferences = {
  studyDays: ["seg", "ter", "qua", "qui", "sex"],
  studyStartTime: "19:00",
  studyEndTime: "22:00",
  dailyGoal: 90,
  listIntensity: "moderada",
  notificationsEnabled: true,
  emailNotifications: true,
  weeklyReports: true,
  theme: "light",
  autoGenerateLists: true,
  preferredDifficulty: "intermediario",
  breakReminders: true,
};

const daysOfWeek = [
  { id: "seg", label: "Segunda" },
  { id: "ter", label: "Terça" },
  { id: "qua", label: "Quarta" },
  { id: "qui", label: "Quinta" },
  { id: "sex", label: "Sexta" },
  { id: "sab", label: "Sábado" },
  { id: "dom", label: "Domingo" },
];

export default function Configuracoes() {
  const [preferences, setPreferences] = useState<StudyPreferences>(() => {
    const saved = localStorage.getItem("studyPreferences");
    return saved ? JSON.parse(saved) : defaultPreferences;
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  const updatePreference = (key: keyof StudyPreferences, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
    setSavedSuccessfully(false);
  };

  const toggleStudyDay = (dayId: string) => {
    const newDays = preferences.studyDays.includes(dayId)
      ? preferences.studyDays.filter((d) => d !== dayId)
      : [...preferences.studyDays, dayId];
    updatePreference("studyDays", newDays);
  };

  const savePreferences = () => {
    // Validate preferences
    if (preferences.studyDays.length === 0) {
      alert("Selecione pelo menos um dia de estudo");
      return;
    }

    if (preferences.studyStartTime >= preferences.studyEndTime) {
      alert("O horário de início deve ser anterior ao horário de término");
      return;
    }

    // Save to localStorage (in a real app, this would be an API call)
    localStorage.setItem("studyPreferences", JSON.stringify(preferences));
    setHasChanges(false);
    setSavedSuccessfully(true);

    // Hide success message after 3 seconds
    setTimeout(() => setSavedSuccessfully(false), 3000);
  };

  const resetToDefaults = () => {
    setPreferences(defaultPreferences);
    setHasChanges(true);
    setSavedSuccessfully(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Configurações de Estudo
            </h1>
            <p className="text-gray-600">
              Personalize sua experiência para otimizar seu aprendizado
            </p>
          </div>

          {/* Success Alert */}
          {savedSuccessfully && (
            <Alert className="mb-6 border-success-200 bg-success-50">
              <CheckCircle className="h-4 w-4 text-success-600" />
              <AlertDescription className="text-success-800">
                Configurações salvas com sucesso! As mudanças entrarão em vigor
                na próxima sessão.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Study Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Horários de Estudo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Dias de Estudo
                    </Label>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                      {daysOfWeek.map((day) => (
                        <Button
                          key={day.id}
                          variant={
                            preferences.studyDays.includes(day.id)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => toggleStudyDay(day.id)}
                          className={
                            preferences.studyDays.includes(day.id)
                              ? "bg-brand-500 hover:bg-brand-600"
                              : ""
                          }
                        >
                          {day.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time">Horário de Início</Label>
                      <Input
                        id="start-time"
                        type="time"
                        value={preferences.studyStartTime}
                        onChange={(e) =>
                          updatePreference("studyStartTime", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time">Horário de Término</Label>
                      <Input
                        id="end-time"
                        type="time"
                        value={preferences.studyEndTime}
                        onChange={(e) =>
                          updatePreference("studyEndTime", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Meta Diária: {preferences.dailyGoal} minutos
                    </Label>
                    <Slider
                      value={[preferences.dailyGoal]}
                      onValueChange={(value) =>
                        updatePreference("dailyGoal", value[0])
                      }
                      max={240}
                      min={15}
                      step={15}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>15 min</span>
                      <span>4 horas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Study Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Preferências de Estudo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="intensity">Intensidade das Listas</Label>
                    <Select
                      value={preferences.listIntensity}
                      onValueChange={(value) =>
                        updatePreference("listIntensity", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leve">
                          Leve (8-12 questões)
                        </SelectItem>
                        <SelectItem value="moderada">
                          Moderada (12-18 questões)
                        </SelectItem>
                        <SelectItem value="intensa">
                          Intensa (18-25 questões)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Dificuldade Preferida</Label>
                    <Select
                      value={preferences.preferredDifficulty}
                      onValueChange={(value) =>
                        updatePreference("preferredDifficulty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basico">Básico</SelectItem>
                        <SelectItem value="intermediario">
                          Intermediário
                        </SelectItem>
                        <SelectItem value="avancado">Avançado</SelectItem>
                        <SelectItem value="misto">
                          Misto (Recomendado)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-generate">
                        Gerar Listas Automaticamente
                      </Label>
                      <p className="text-sm text-gray-600">
                        A IA criará suas listas diárias baseada no seu
                        desempenho
                      </p>
                    </div>
                    <Switch
                      id="auto-generate"
                      checked={preferences.autoGenerateLists}
                      onCheckedChange={(checked) =>
                        updatePreference("autoGenerateLists", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-gray-600">
                        Receba lembretes para estudar e atualizações de
                        progresso
                      </p>
                    </div>
                    <Switch
                      checked={preferences.notificationsEnabled}
                      onCheckedChange={(checked) =>
                        updatePreference("notificationsEnabled", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-gray-600">
                        Receba relatórios semanais e atualizações importantes
                      </p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) =>
                        updatePreference("emailNotifications", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Relatórios Semanais</Label>
                      <p className="text-sm text-gray-600">
                        Receba análises detalhadas do seu progresso semanal
                      </p>
                    </div>
                    <Switch
                      checked={preferences.weeklyReports}
                      onCheckedChange={(checked) =>
                        updatePreference("weeklyReports", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lembretes de Pausa</Label>
                      <p className="text-sm text-gray-600">
                        Receba lembretes para fazer pausas durante estudos
                        longos
                      </p>
                    </div>
                    <Switch
                      checked={preferences.breakReminders}
                      onCheckedChange={(checked) =>
                        updatePreference("breakReminders", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Appearance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Palette className="w-4 h-4 mr-2" />
                    Aparência
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="theme">Tema</Label>
                    <Select
                      value={preferences.theme}
                      onValueChange={(value) =>
                        updatePreference("theme", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Privacidade
                  </Button>
                </CardContent>
              </Card>

              {/* Save Actions */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button
                    onClick={savePreferences}
                    disabled={!hasChanges}
                    className="w-full bg-brand-500 hover:bg-brand-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetToDefaults}
                    className="w-full"
                  >
                    Restaurar Padrões
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

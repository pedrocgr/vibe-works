import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { User, Mail, Target, Award, Upload } from "lucide-react";

interface UserProfile {
  fullName: string;
  email: string;
  dailyGoal: number;
  photo?: string;
  teacherCode?: string;
}

export default function Perfil() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(auth);
    const userProfile: UserProfile = {
      fullName: userData.fullName || "",
      email: userData.email || "",
      dailyGoal: userData.dailyGoal || 10,
      photo: userData.photo,
      teacherCode: userData.teacherCode,
    };
    setProfile(userProfile);
    setFormData(userProfile);
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === "dailyGoal" ? parseInt(value) : value,
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      const auth = localStorage.getItem("auth");
      if (auth) {
        const userData = JSON.parse(auth);
        const updatedData = {
          ...userData,
          fullName: formData.fullName,
          email: formData.email,
          dailyGoal: formData.dailyGoal,
        };
        localStorage.setItem("auth", JSON.stringify(updatedData));
        setProfile(formData);
        setIsEditing(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
            <p className="text-gray-600">
              Gerencie suas informações de conta e preferências
            </p>
          </div>

          {/* Profile Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isEditing ? (
                <div className="space-y-6">
                  {/* Photo */}
                  {profile.photo && (
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-brand-100 rounded-lg flex items-center justify-center">
                        <User className="w-8 h-8 text-brand-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Foto do Perfil</p>
                        <p className="font-medium text-gray-900">
                          {profile.photo}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Profile Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Nome Completo</p>
                      <p className="font-medium text-gray-900">
                        {profile.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="font-medium text-gray-900">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Meta Diária</p>
                      <p className="font-medium text-gray-900">
                        {profile.dailyGoal} questões
                      </p>
                    </div>
                    {profile.teacherCode && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          Código do Professor
                        </p>
                        <p className="font-medium text-gray-900">
                          {profile.teacherCode}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-brand-500 hover:bg-brand-600"
                  >
                    Editar Perfil
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nome Completo
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData?.fullName || ""}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData?.email || ""}
                      onChange={handleInputChange}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Meta Diária (questões)
                    </label>
                    <Input
                      type="number"
                      name="dailyGoal"
                      value={formData?.dailyGoal || 10}
                      onChange={handleInputChange}
                      min="1"
                      max="100"
                      className="h-10"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData(profile);
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-brand-500 hover:bg-brand-600"
                    >
                      Salvar Alterações
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-brand-50 rounded-lg">
                  <div className="text-3xl font-bold text-brand-600 mb-1">
                    78%
                  </div>
                  <p className="text-sm text-gray-600">Taxa de Acertos</p>
                </div>
                <div className="text-center p-4 bg-success-50 rounded-lg">
                  <div className="text-3xl font-bold text-success-600 mb-1">
                    142
                  </div>
                  <p className="text-sm text-gray-600">Questões Resolvidas</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    18h 30m
                  </div>
                  <p className="text-sm text-gray-600">Tempo Total Estudado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="flex-1"
            >
              Voltar ao Dashboard
            </Button>
            <Button
              onClick={handleLogout}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Sair da Conta
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

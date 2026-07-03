import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { listBankActivities } from "@/lib/data/activities"
import { BancoTable } from "@/components/banco-table"

export default async function BancoActividadesPage() {
  const activities = await listBankActivities()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Banco de Actividades
          </h1>
          <p className="text-muted-foreground">
            Gestiona y crea actividades para tus cursos
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow">
          <Plus className="w-4 h-4 mr-2" />
          Nueva actividad
        </Button>
      </div>

      <BancoTable activities={activities} />
    </div>
  )
}
